"use strict";

module.exports = function() {
  return {
    name: "transform-remove-console",
    visitor: {
      CallExpression(path) {
        if (path.get("callee").matchesPattern("console", true)) {
          path.remove();
        }
      },
    },
  };
};
