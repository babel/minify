"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-inline-environment-variables",
    visitor: {
      MemberExpression(path, { opts: { include, exclude } = {} }) {
        if (path.get("object").matchesPattern("process.env")) {
          const key = path.toComputedKey();
          if (
            t.isStringLiteral(key) &&
            (!include || include.includes(key.value)) &&
            (!exclude || !exclude.includes(key.value))
          ) {
            path.replaceWith(t.valueToNode(process.env[key.value]));
          }
        }
      }
    }
  };
};
