'use strict';

module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
       if (path.get('callee').matchesPattern('console', true)) {
         path.remove();
       }
     },
    },
  };
};
