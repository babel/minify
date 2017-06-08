"use strict";

module.exports = function({ types: t }) {
  const TRUE = t.unaryExpression("!", t.numericLiteral(0), true);
  const FALSE = t.unaryExpression("!", t.numericLiteral(1), true);

  return {
    name: "transform-simplify-comparison-operators",
    visitor: {
      // simplify comparison operations if we're 100% certain
      // that each value will always be of the same type
      BinaryExpression(path) {
        const { node } = path;
        const op = node.operator;
        const negated = node.operator.startsWith("!");
 
        if (["!=", "=="].includes(node.operator)) {
          if (t.isIdentifier(node.right, { name: "undefined" })) {
            path.get("right").replaceWith(t.nullLiteral());
          }
          if (t.isIdentifier(node.left, { name: "undefined" }) || t.isNullLiteral(node.left)) {
            if (t.isIdentifer(node.right, { name: "undefined" }) || t.isNullLiteral(node.right)) {
              path.replaceWith(negated ? FALSE : TRUE);
            }
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
