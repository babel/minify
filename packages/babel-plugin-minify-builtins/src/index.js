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

            if (!context.pathsToUpdate.has(expName)) {
              context.pathsToUpdate.set(expName, []);
            }
            context.pathsToUpdate.get(expName).push(path);
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

                if (!context.pathsToUpdate.has(expName)) {
                  context.pathsToUpdate.set(expName, []);
                }
                context.pathsToUpdate.get(expName).push(callee);
              }
            }
          }
        }
      };

      this.program.traverse(collectVisitor);
    }

    replace() {
      for (const [expName, paths] of this.pathsToUpdate) {
        // Should only transform if there is more than 1 occurence
        if (paths.length > 1) {
          const uniqueIdentifier = this.program.scope.generateUidIdentifier(
            expName
          );
          const newNode = t.variableDeclaration("var", [
            t.variableDeclarator(uniqueIdentifier, paths[0].node)
          ]);

          for (const path of paths) {
            path.replaceWith(uniqueIdentifier);
          }
          // hoist the created var to the top of the block/program
          const path = getPath(paths[0], paths[paths.length - 1]);
          path.unshiftContainer("body", newNode);
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

// decides the best path to insert the newly created identifier
function getPath(firstPath, lastPath) {
  let resultPath;
  // check if occurence of member exp ex - Max.max() is outside of the
  // function declaration
  const firstParent = firstPath.getFunctionParent();
  const lastParent = lastPath.getFunctionParent();
  const { node: { start : firstStart } } = firstParent;
  const { node: { start : lastStart } } = lastParent;

  if (firstStart < lastStart) {
    resultPath = firstParent;
  } else {
    resultPath = lastParent;
  }

  if (resultPath.isProgram()) {
    return resultPath;
  }
  // return the block statment if its not program
  return resultPath.get("body");
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
