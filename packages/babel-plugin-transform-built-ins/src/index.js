"use strict";

const { methods, properties } = require("./builtins");
const evaluate = require("babel-helper-evaluate-path");

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

          const expName = getExpressionName(path);
          if (!isComputed(path) && isBuiltin(expName)) {
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

            const expName = getExpressionName(callee);
            // computed property should be not optimized
            // Math[max]() -> Math.max()
            if (!isComputed(callee) && isBuiltin(expName)) {
              const result = evaluate(path);
              // deopt when we have side effecty evaluate-able arguments
              // Math.max(foo(), 1) --> untouched
              // Math.floor(1) --> 1
              if (result.confident && hasPureArgs(path)
                && typeof result.value === "number") {
                path.replaceWith(t.numericLiteral(result.value));
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
      for (const paths of this.pathsToUpdate.values()) {
        // Should only transform if there is more than 1 occurence
        if (paths.length > 1) {
          const uniqueIdentifier = this.program.scope.generateUidIdentifier(
            memberToString(paths[0])
          );
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
    name: "transform-builtins",
    visitor: {
      Program(path) {
        const builtInReplacer = new BuiltInReplacer(path);
        builtInReplacer.run();
      }
    },
  };

  function memberToString(memberExpr) {
    const {object, property} = memberExpr.node;
    let result = "";

    if (t.isIdentifier(object)) result += object.name;
    if (t.isMemberExpression(object)) result += memberToString(object);
    if (t.isIdentifier(property)) result += property.name;

    return result;
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

function isBuiltin(expName) {
  // Look for properties Eg - Number.PI
  for (const property of properties) {
    if (property === expName) {
      return true;
    }
  }
  // Look for Methods eg - Number.isNaN()
  for (const method of methods) {
    if (method === expName) {
      return true;
    }
  }
  return false;
}

function getExpressionName(path) {
  const { node } = path.get("object");
  const { node: propertyNode } = path.get("property");
  return `${node.name}.${propertyNode.name}`;
}
