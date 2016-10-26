"use strict";

module.exports = function({ types: t }) {
  return {
    name: "minify-numeric-literals",
    visitor: {
      NumericLiteral(path) {
        if (!path.node.extra) return;

        const exponential = path.node.value.toExponential()
          .replace(/\+/g, "")
          .replace(/e0/, "");

        if (path.node.extra.raw.length > exponential.length) {
          const literal = t.numericLiteral(path.node.value);
          literal.extra = {
            raw: exponential,
            rawValue: path.node.value
          };
          path.replaceWith(literal);
        }
      }
    },
  };
};
