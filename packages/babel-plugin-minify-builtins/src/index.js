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
      this.pathsToUpdate = new Map;
    }

    run() {
      this.collect();
      this.replace();
    }

    collect() {
      const context = this;

      const collectVisitor =  {
        MemberExpression(path) {
          if (path.parentPath.isCallExpression()) {
            return;
          }

          const expName = memberToString(path);
          if (!isComputed(path) && isBuiltin(path)) {
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

            const expName = memberToString(callee);
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
      for (const [ expName, paths ] of this.pathsToUpdate) {
        // Should only transform if there is more than 1 occurence
        if (paths.length > 1) {
          const uniqueIdentifier = this.program.scope.generateUidIdentifier(expName);
          const newNode = t.variableDeclaration("var", [
            t.variableDeclarator(uniqueIdentifier, paths[0].node)
          ]);

          for (const path of paths) {
            path.replaceWith(uniqueIdentifier);
          }
          // hoist the created var to top of the program
          this.program.unshiftContainer("body", newNode);
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
    },
  };

  function memberToString(memberExpr) {
    const { object, property } = memberExpr.node;
    let result = "";

    if (t.isIdentifier(object)) result += object.name;
    if (t.isMemberExpression(object)) result += memberToString(object);
    if (t.isIdentifier(property)) result += property.name;

    return result;
  }

  function isBuiltin(memberExpr) {
    const { object, property } = memberExpr.node;

    if (t.isIdentifier(object) && t.isIdentifier(property)
      && VALID_CALLEES.indexOf(object.name) >= 0
      && INVALID_METHODS.indexOf(property.name) < 0) {
      return true;
    }
    return false;
  }

};

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
