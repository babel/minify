"use strict";

module.exports = function({ types: t }) {
  const INFINITY = t.binaryExpression(
    "/",
    t.numericLiteral(1),
    t.numericLiteral(0)
  );
  const badTransforms = {
    ArrayPattern: () => true,
    AssignmentExpression: path => path.container.left === path.node,
    ObjectProperty: path => path.container.shorthand,
    RestElement: () => true
  };
  return {
    name: "minify-infinity",
    visitor: {
      // Infinity -> 1 / 0
      Identifier(path) {
        path.isLVal();
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

        if (
          path.isLVal() &&
          (badTransforms[path.parentPath.type] || (() => false))(path)
        ) {
          return;
        }

        path.replaceWith(INFINITY);
      }
    }
  };
};
