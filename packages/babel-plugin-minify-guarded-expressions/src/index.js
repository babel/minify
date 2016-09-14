"use strict";

module.exports = function({ types: t }) {
  const flipExpressions = require("babel-helper-flip-expressions")(t);

  return {
    name: "minify-guarded-expressions",
    visitor: {
      // Convert guarded expressions
      // !a && b() --> a || b();
      // This could change the return result of the expression so we only do it
      // on things where the result is ignored.
      LogicalExpression: {
        enter: [
          function(path) {
            const { node } = path;

            const left = path.get("left");
            const right = path.get("right");
            if (node.operator === "&&") {
              const leftTruthy = left.evaluateTruthy();
              if (leftTruthy === false) {
                path.replaceWith(node.left);
              } else if (leftTruthy === true && left.isPure()) {
                path.replaceWith(node.right);
              } else if (right.evaluateTruthy() === false && right.isPure()) {
                path.replaceWith(node.left);
              }
            } else if (node.operator === "||") {
              if (left.evaluateTruthy() === false && left.isPure()) {
                path.replaceWith(node.right);
              } else if (left.evaluateTruthy() === true) {
                path.replaceWith(node.left);
              }
            }
          },

          function (path) {
            const { node } = path;

            if (flipExpressions.hasSeen(node)) {
              return;
            }

            if (!path.parentPath.isExpressionStatement() &&
                !(path.parentPath.isSequenceExpression() && path.parentPath.parentPath.isExpressionStatement())
            ) {
              return;
            }

            // Start counting savings from one since we can ignore the last
            // expression.
            if (flipExpressions.shouldFlip(node, 1)) {
              const newNode = flipExpressions.flip(node, true);
              path.replaceWith(newNode);
            }
          },
        ],
      },
    },
  };
};
