'use strict';

module.exports = ({ Plugin, types: t }) => {
  return {
    visitor: {
      Identifier(path) {
        const { node } = path;
        if (node.name !== 'emptyFunction') {
          return;
        }

        if (!path.parentPath.isCallExpression()) {
          if (path.parentPath.isExpressionStatement()) {
            path.parentPath.remove();
          } else {
            path.replaceWith(t.booleanLiteral(false));
          }
          return;
        }

        const call = path.parentPath;
        if (call.parentPath.isExpressionStatement()) {
          call.parentPath.remove();
          return;
        }

        call.replaceWith(t.booleanLiteral(false));
      },
    },
  };
};
