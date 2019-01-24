"use strict";

// Assuming all the static methods from below array are side effect free evaluation
// except Math.random
const VALID_CALLEES = ["String", "Number", "Math"];
const INVALID_METHODS = ["random"];

const newIssueUrl = "https://github.com/babel/minify/issues/new";

module.exports = function({ types: t }) {
  class BuiltInReplacer {
    constructor() {
      // map<expr_name, path[]>;
      this.pathsToUpdate = new Map();
    }

    getCollectVisitor() {
      const context = this;

      const collectVisitor = {
        AssignmentExpression(path) {
          const { left } = path.node;

          // Should bail and not run the plugin
          // when builtin is polyfilled
          if (t.isMemberExpression(left)) {
            let parent = path;
            do {
              parent.stop();
            } while ((parent = parent.parentPath));
          }
        },

        MemberExpression(path) {
          if (path.parentPath.isCallExpression()) {
            return;
          }

          const { node } = path;

          if (
            !isComputed(node) &&
            isBuiltin(node) &&
            !getFunctionParent(path).isProgram()
          ) {
            const expName = memberToString(node);
            addToMap(context.pathsToUpdate, expName, path);
          }
        },

        CallExpression: {
          exit(path) {
            const callee = path.get("callee");
            if (!callee.isMemberExpression()) {
              return;
            }

            const { node } = callee;

            // computed property should not be optimized
            // Math[max]() -> Math.max()
            if (
              !isComputed(node) &&
              isBuiltin(node) &&
              !getFunctionParent(callee).isProgram()
            ) {
              const expName = memberToString(node);
              addToMap(context.pathsToUpdate, expName, callee);
            }
          }
        }
      };

      return collectVisitor;
    }

    replace() {
      for (const [expName, paths] of this.pathsToUpdate) {
        // transform only if there is more than 1 occurence
        if (paths.length <= 1) {
          continue;
        }

        const segmentsMap = getSegmentedSubPaths(paths);
        for (const [parent, subpaths] of segmentsMap) {
          if (subpaths.length <= 1) {
            continue;
          }
          const uniqueIdentifier = parent.scope.generateUidIdentifier(expName);
          const newNode = t.variableDeclaration("var", [
            t.variableDeclarator(uniqueIdentifier, subpaths[0].node)
          ]);

          for (const path of subpaths) {
            path.replaceWith(t.clone(uniqueIdentifier));
          }

          // hoist the created var to the top of the function scope
          const target = parent.get("body");

          /**
           * Here, we validate a case where there is a local binding of
           * one of Math, String or Number. Here we have to get the
           * global Math instead of using the local one - so we do the
           * following transformation
           *
           * var _Mathmax = Math.max;
           *
           * to
           *
           * var _Mathmax = (0, eval)("this").Math.max;
           */
          for (const builtin of VALID_CALLEES) {
            if (target.scope.getBinding(builtin)) {
              const prev = newNode.declarations[0].init;

              if (!t.isMemberExpression(prev)) {
                throw new Error(
                  `minify-builtins expected a MemberExpression. ` +
                    `Found ${prev.type}. ` +
                    `Please report this at ${newIssueUrl}`
                );
              }

              if (!t.isMemberExpression(prev.object)) {
                newNode.declarations[0].init = t.memberExpression(
                  t.memberExpression(getGlobalThis(), prev.object),
                  prev.property
                );
              }
            }
          }

          target.unshiftContainer("body", newNode);
        }
      }
    }
  }

  const builtInReplacer = new BuiltInReplacer();

  return {
    name: "minify-builtins",
    visitor: Object.assign({}, builtInReplacer.getCollectVisitor(), {
      Program: {
        exit() {
          builtInReplacer.replace();
        }
      }
    })
  };

  function memberToString(memberExprNode) {
    const { object, property } = memberExprNode;
    let result = "";

    if (t.isIdentifier(object)) result += object.name;
    if (t.isMemberExpression(object)) result += memberToString(object);
    if (t.isIdentifier(property)) result += property.name;

    return result;
  }

  function isBuiltin(memberExprNode) {
    const { object, property } = memberExprNode;

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

  // Creates a segmented map that contains the earliest common Ancestor
  // as the key and array of subpaths that are descendats of the LCA as value
  function getSegmentedSubPaths(paths) {
    let segments = new Map();

    // Get earliest Path in tree where paths intersect
    paths[0].getDeepestCommonAncestorFrom(
      paths,
      (lastCommon, index, ancestries) => {
        // found the LCA
        if (!lastCommon.isProgram()) {
          let fnParent;
          if (
            lastCommon.isFunction() &&
            t.isBlockStatement(lastCommon.node.body)
          ) {
            segments.set(lastCommon, paths);
            return;
          } else if (
            !(fnParent = getFunctionParent(lastCommon)).isProgram() &&
            t.isBlockStatement(fnParent.node.body)
          ) {
            segments.set(fnParent, paths);
            return;
          }
        }
        // Deopt and construct segments otherwise
        for (const ancestor of ancestries) {
          const fnPath = getChildFuncion(ancestor);
          if (fnPath === void 0) {
            continue;
          }
          const validDescendants = paths.filter(p => {
            return p.isDescendant(fnPath);
          });
          segments.set(fnPath, validDescendants);
        }
      }
    );
    return segments;
  }

  function getChildFuncion(ancestors = []) {
    for (const path of ancestors) {
      if (path.isFunction() && t.isBlockStatement(path.node.body)) {
        return path;
      }
    }
  }

  /**
   * returns
   *
   * (0, eval)("this")
   */
  function getGlobalThis() {
    return t.callExpression(
      t.sequenceExpression([t.valueToNode(0), t.identifier("eval")]),
      [t.valueToNode("this")]
    );
  }
};

function addToMap(map, key, value) {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key).push(value);
}

function isComputed(node) {
  return node.computed;
}

/**
 * Babel-7 returns null if there is no function parent
 * and uses getProgramParent to get Program
 */
function getFunctionParent(path) {
  return (path.scope.getFunctionParent() || path.scope.getProgramParent()).path;
}
