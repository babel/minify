"use strict";

module.exports = function() {
  return {
    name: "transform-simplify-comparison-operators",
    visitor: {
      // simplify comparison operations if we're 100% certain
      // that each value will always be of the same type
      BinaryExpression(path) {
        const { node } = path;
        let op = node.operator;
        if (op !== "===" && op !== "!==") {
          return;
        }

        let left  = path.get("left");
        let right = path.get("right");
        const strictMatch = left.baseTypeStrictlyMatches(right);
        if (strictMatch) {
          node.operator = node.operator.slice(0, -1);
        }
      },
    },
  };
};
