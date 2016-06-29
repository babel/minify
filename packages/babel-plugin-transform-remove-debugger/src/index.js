"use strict";

module.exports = function() {
  return {
    visitor: {
      DebuggerStatement(path) {
        path.remove();
      },
    },
  };
};
