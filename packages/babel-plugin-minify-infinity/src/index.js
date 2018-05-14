"use strict";

module.exports = function({ types: t }) {
  const INFINITY = t.binaryExpression(
    "/",
    t.numericLiteral(1),
    t.numericLiteral(0)
  );
  return {
    name: "minify-infinity",
    visitor: {
      // Infinity -> 1 / 0
      Identifier(path) {
        if (path.node.name !== "Infinity") {
          return;
        }

        // It's a referenced identifier
        if (path.scope.getBinding("Infinity")) {
          return;
        }

        if (path.parentPath.isObjectProperty({ key: path.node })) {
          return;
        }

        if (path.parentPath.isMemberExpression()) {
          return;
        }

        const bindingIds = path.parentPath.getBindingIdentifierPaths();

        for (const id of Object.keys(bindingIds)) {
          if (id === "Infinity" && bindingIds[id] === path) {
            return;
          }
        }

        path.replaceWith(INFINITY);
      }
    }
  };
};
