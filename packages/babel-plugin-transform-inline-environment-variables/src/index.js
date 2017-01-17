"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-inline-environment-variables",
    visitor: {
      MemberExpression(path) {
        if (path.get("object").matchesPattern("process.env")) {
          const key = path.toComputedKey();
          if (t.isStringLiteral(key)) {
            path.replaceWith(t.valueToNode(process.env[key.value]));
          }
        }
      },
    },
  };
};
