'use strict';

module.exports = function({ types: t }) {
  const flipExpressions = require('babel-helper-flip-expressions')(t);

  return {
    visitor: {
      // Convert guarded expressions
      // !a && b() --> a || b();
      // This could change the return result of the expression so we only do it
      // on things where the result is ignored.
      LogicalExpression: {
        enter: [
          function(path) {
            const { node } = path;

            if (path.evaluateTruthy(node) === false) {
              path.replaceWith(node.left);
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
