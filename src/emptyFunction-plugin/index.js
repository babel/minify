'use strict';

module.exports = ({ Plugin, types: t }) => {
  const removeOrVoid = require('../utils/removeOrVoid')(t);

  const visitor = {
    // Remove the call if it stands on it's own.
    ExpressionStatement(path) {
      const { node } = path;
      if (isEmptyFunction(node.expression)) {
        removeOrVoid(path);
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
  };

  return {
    visitor: {
      // Unfortunately we have to do it in a seperate pass to ensure that
      // the expression statements are removed otherwise the calls may
      // end in conditionals or sequence expressions.
      Program(path) {
        path.traverse(visitor, {});
      },
    },
  };

  function isEmptyFunction(node) {
    return t.isCallExpression(node) &&
           t.isIdentifier(node.callee, { name: 'emptyFunction' });
  }
};
