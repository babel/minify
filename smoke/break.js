"use strict";

module.exports = function BreakMeTransform({ types: t }) {
  return {
    visitor: {
      AssignmentExpression(path) {
        path.get("left").replaceWith(t.identifier("a"));
      },
      FunctionExpression(path) {
        if (Math.random() * 100 > 50) {
          const newNode = t.clone(path.node);
          newNode.params = [];
          path.replaceWith(newNode);
        }
      }
    }
  };
};
