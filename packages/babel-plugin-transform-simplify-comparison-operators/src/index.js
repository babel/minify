"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-simplify-comparison-operators",
    visitor: {
      // simplify comparison operations if we're 100% certain
      // that each value will always be of the same type
      BinaryExpression(path) {
        const { node } = path;
        const op = node.operator;

        if (["!=", "=="].indexOf(node.operator) !== -1) {
          if (
            t.isIdentifier(node.right, { name: "undefined" }) ||
            t.isUnaryExpression(node.right, { operator: "void" })
          ) {
            path.get("right").replaceWith(t.nullLiteral());
          }
        }

        if (op !== "===" && op !== "!==") {
          return;
        }

        const left = path.get("left");
        const right = path.get("right");
        const strictMatch = left.baseTypeStrictlyMatches(right);
        if (strictMatch) {
          node.operator = node.operator.slice(0, -1);
        }
      }
    }
  };
};
