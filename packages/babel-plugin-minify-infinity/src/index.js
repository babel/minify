"use strict";

module.exports = function({ types: t }) {
  const INFINITY = t.binaryExpression("/", t.numericLiteral(1), t.numericLiteral(0));
  return {
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

        path.replaceWith(INFINITY);
      },
    },
  };
};
