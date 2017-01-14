"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-remove-console",
    visitor: {
      CallExpression(path) {
        const isConsole = path.get("callee").matchesPattern("console", true);
        const { parentPath } = path;

        if ((parentPath.isExpressionStatement() || parentPath.isLogicalExpression()) && isConsole) {
          path.remove();
        } else if (isConsole) {
          path.replaceWith(t.arrowFunctionExpression([], t.blockStatement([])));
        }
      },
    },
  };
};
