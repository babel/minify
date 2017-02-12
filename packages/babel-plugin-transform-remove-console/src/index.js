"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-remove-console",
    visitor: {
      CallExpression(path) {
        if (!path.get("callee").matchesPattern("console", true)) return;

        if (path.parentPath.isExpressionStatement()) {
          path.remove();
        } else {
          path.replaceWith(t.unaryExpression("void", t.numericLiteral(0)));
        }
      },
      MemberExpression: {
        exit(path) {
          if (!path.matchesPattern("console", true)) return;
          if (!path.parentPath.isMemberExpression()) {
            path.replaceWith(t.arrowFunctionExpression([], t.blockStatement([])));
          }
        }
      }
    },
  };
};
