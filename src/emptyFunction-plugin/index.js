'use strict';

module.exports = ({ Plugin, types: t }) => {
  return {
    visitor: {

      // Remove the call if it stands on it's own.
      ExpressionStatement(path) {
        const { node } = path;
        if (isEmptyFunction(node.expression)) {
          path.remove();
        }
      },

      // If we're not in an expression statement we can't remove
      // the call.
      CallExpression(path) {
        const { node } = path;
        if (isEmptyFunction(node)) {
          path.replaceWith(t.booleanLiteral(false));
        }
      },
    },
  };

  function isEmptyFunction(node) {
    return t.isCallExpression(node) &&
           t.isIdentifier(node.callee, { name: 'emptyFunction' });
  }
};
