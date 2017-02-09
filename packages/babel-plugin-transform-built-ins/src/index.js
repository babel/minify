"use strict";

const { methods, properties } = require("./builtins");

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
          const { node } = path.get("object");
          const { node: propertyNode } = path.get("property");
          const expName = `${node.name}.${propertyNode.name}`;

          if (isBuiltin(expName)) {
            if (!context.pathsToUpdate.has(expName)) {
              context.pathsToUpdate.set(expName, []);
            }
            context.pathsToUpdate.get(expName).push(path);
          }
        }
      };
      this.program.traverse(collectVisitor);
    }

    replace() {
      for (const paths of this.pathsToUpdate.values()) {
        // Should only transform if there is more than 1 occurence
        if (paths.length > 1) {
          const uniqueIdentifier = this.program.scope.generateUidIdentifier();
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
};
