"use strict";

module.exports = function() {
  return {
    name: "transform-merge-sibling-variables",
    visitor: {
      VariableDeclaration: {
        enter: [
          // concat variables of the same kind with their siblings
          function (path) {
            if (!path.inList) {
              return;
            }

            let { node } = path;

            while (true) {
              let sibling = path.getSibling(path.key + 1);
              if (!sibling.isVariableDeclaration({ kind: node.kind })) {
                break;
              }

              node.declarations = node.declarations.concat(sibling.node.declarations);
              sibling.remove();
            }
          },

          // concat variable declarations next to for loops with it's
          // initialisers if they're of the same variable kind
          function (path) {
            if (!path.inList) {
              return;
            }

            const { node } = path;
            let next = path.getSibling(path.key + 1);
            if (!next.isForStatement()) {
              return;
            }

            let init = next.get("init");
            if (!init.isVariableDeclaration({ kind: node.kind })) {
              return;
            }

            init.node.declarations = node.declarations.concat(
              init.node.declarations
            );
            path.remove();
          },
        ],
      },
    },
  };
};
