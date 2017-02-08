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
  const builtinsMap = new Map();

  const collectVisitor = {
    MemberExpression(path) {
      const { node } = path.get("object");
      const { node: propertyNode } = path.get("property");
      const expName = `${node.name}.${propertyNode.name}`;

      if (isBuiltin(expName)) {
        if (!builtinsMap.has(expName)) {
          builtinsMap.set(expName, []);
        }
        builtinsMap.get(expName).push(path);
      }
    }
  };

  const replaceBuiltins = (programPath) => {
    for (const paths of builtinsMap.values()) {
      // Should only transform if there is more than 1 occurance
      if (paths.length > 1) {
        const uniqueIdentifier = programPath.scope.generateUidIdentifier();
        const newNode = t.variableDeclaration("var", [
          t.variableDeclarator(uniqueIdentifier, paths[0].node)
        ]);

        for (const path of paths) {
          path.replaceWith(uniqueIdentifier);
        }
        // hoist the created var to top of the program
        programPath.unshiftContainer("body", newNode);
      }
    }
  };

  return {
    name: "transform-builtins",
    visitor: {
      Program(path) {
        path.traverse(collectVisitor);
        replaceBuiltins(path);
      }
    },
  };
};
