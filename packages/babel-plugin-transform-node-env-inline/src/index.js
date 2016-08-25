"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-node-env-inline",
    visitor: {
      MemberExpression(path) {
        if (path.matchesPattern("process.env.NODE_ENV")) {
          path.replaceWith(t.valueToNode(process.env.NODE_ENV));

          if (path.parentPath.isBinaryExpression()) {
            let evaluated = path.parentPath.evaluate();
            if (evaluated.confident) {
              path.parentPath.replaceWith(t.valueToNode(evaluated.value));
            }
          }
        }
      },
    },
  };
};
