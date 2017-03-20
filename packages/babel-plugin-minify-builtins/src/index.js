"use strict";

const evaluate = require("babel-helper-evaluate-path");
// Assuming all the static methods from below array are side effect free evaluation
// except Math.random
const VALID_CALLEES = ["String", "Number", "Math"];
const INVALID_METHODS = ["random"];

module.exports = function({ types: t }) {
  class BuiltInReplacer {
    constructor(program) {
      this.program = program;
      this.pathsToUpdate = new Map();
    }

    run() {
      this.collect();
      this.replace();
    }

    collect() {
      const context = this;

      const collectVisitor = {
        MemberExpression(path) {
          if (path.parentPath.isCallExpression()) {
            return;
          }

          if (!isComputed(path) && isBuiltin(path)) {
            const expName = memberToString(path.node);
            addToMap(context.pathsToUpdate, expName, path);
          }
        },

        CallExpression: {
          exit(path) {
            const callee = path.get("callee");
            if (!callee.isMemberExpression()) {
              return;
            }

            // computed property should be not optimized
            // Math[max]() -> Math.max()
            if (!isComputed(callee) && isBuiltin(callee)) {
              const result = evaluate(path);
              // deopt when we have side effecty evaluate-able arguments
              // Math.max(foo(), 1) --> untouched
              // Math.floor(1) --> 1
              if (result.confident && hasPureArgs(path)) {
                path.replaceWith(t.valueToNode(result.value));
              } else {
                const expName = memberToString(callee.node);
                addToMap(context.pathsToUpdate, expName, callee);
              }
            }
          }
        }
      };

      this.program.traverse(collectVisitor);
    }

    replace() {
      for (const [expName, paths] of this.pathsToUpdate) {
        // transform only if there is more than 1 occurence
        if (paths.length <= 1) {
          continue;
        }

        // occurences that has program scope are not minified
        // to avoid leaking identifiers
        const validPaths = paths.filter(p => {
          return !p.getFunctionParent().isProgram();
        });

        // Early exit here as well
        if (validPaths.length <= 1) {
          continue;
        }

        const segmentsMap = getSegmentedSubPaths(expName, validPaths);
        for (const [parent, subpaths] of segmentsMap) {
          if (subpaths.length <= 1) {
            continue;
          }
          const uniqueIdentifier = this.program.scope.generateUidIdentifier(
            expName
          );
          const newNode = t.variableDeclaration("var", [
            t.variableDeclarator(uniqueIdentifier, subpaths[0].node)
          ]);

          for (const path of subpaths) {
            path.replaceWith(uniqueIdentifier);
          }
          // hoist the created var to the top of the function scope
          parent.get("body").unshiftContainer("body", newNode);
        }
      }
    }
  }

  return {
    name: "minify-builtins",
    visitor: {
      Program(path) {
        const builtInReplacer = new BuiltInReplacer(path);
        builtInReplacer.run();
      }
    }
  };

  function memberToString(memberExpr) {
    const { object, property } = memberExpr;
    let result = "";

    if (t.isIdentifier(object)) result += object.name;
    if (t.isMemberExpression(object)) result += memberToString(object);
    if (t.isIdentifier(property)) result += property.name;

    return result;
  }

  function isBuiltin(memberExpr) {
    const { object, property } = memberExpr.node;

    if (
      t.isIdentifier(object) &&
      t.isIdentifier(property) &&
      VALID_CALLEES.indexOf(object.name) >= 0 &&
      INVALID_METHODS.indexOf(property.name) < 0
    ) {
      return true;
    }
    return false;
  }
};

function addToMap(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

// Creates a segmented map that contains the earliest common Ancestor
// as the key and array of subpaths that are descendats of the LCA as value
function getSegmentedSubPaths(expName, paths) {
  let segments = new Map();

  // Get earliest Path in tree where paths intersect
  paths[
    0
  ].getDeepestCommonAncestorFrom(paths, (lastCommon, index, ancestries) => {
    // we found the LCA
    if (!lastCommon.isProgram()) {
      lastCommon = !lastCommon.isFunction()
        ? lastCommon.getFunctionParent()
        : lastCommon;
      segments.set(lastCommon, paths);
      return;
    }
    // Deopt and construct segments otherwise
    for (const ancestor of ancestries) {
      const parentPath = ancestor[index + 1];
      const validDescendants = paths.filter(p => {
        return p.isDescendant(parentPath);
      });
      segments.set(parentPath, validDescendants);
    }
  });

  return segments;
}

function hasPureArgs(path) {
  const args = path.get("arguments");
  for (const arg of args) {
    if (!arg.isPure()) {
      return false;
    }
  }
  return true;
}

function isComputed(path) {
  const { node } = path;
  return node.computed;
}
