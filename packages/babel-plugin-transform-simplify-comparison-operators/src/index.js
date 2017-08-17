"use strict";

module.exports = function({ types: t }) {
  function isPureVoid(path) {
    return path.isUnaryExpression({ operator: "void" }) && path.isPure();
  }

  function isRealUndefined(path) {
    return (
      path.isIdentifier({ name: "undefined" }) &&
      !path.scope.getBinding("undefined")
    );
  }

  function undefinedToNull(path) {
    if (isRealUndefined(path) || isPureVoid(path)) {
      path.replaceWith(t.nullLiteral());
      return true;
    }
    return false;
  }

  return {
    name: "transform-simplify-comparison-operators",
    visitor: {
      // simplify comparison operations if we're 100% certain
      // that each value will always be of the same type
      BinaryExpression(path) {
        const { node } = path;
        const op = node.operator;

        if (["!=", "=="].indexOf(node.operator) !== -1) {
          undefinedToNull(path.get("left"));
          undefinedToNull(path.get("right"));
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
