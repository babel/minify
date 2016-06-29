"use strict";

module.exports = function({ types: t }) {
  const VOID_0 = t.unaryExpression("void", t.numericLiteral(0), true);

  return {
    visitor: {
      ReferencedIdentifier(path) {
        if (path.node.name === "undefined") {
          path.replaceWith(VOID_0);
        }
      },
    },
  };
};
