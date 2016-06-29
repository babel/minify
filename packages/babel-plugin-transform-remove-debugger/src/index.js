'use strict';

module.exports = function({ types: t }) {
  return {
    visitor: {
      DebuggerStatement(path) {
        path.remove();
      },
    },
  };
};
