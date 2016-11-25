"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-merge-sibling-variables",
    visitor: {
      ForStatement(path) {
        // Lift declarations to the loop initializer
        let body = path.get("body");
        body = body.isBlockStatement() ? body.get("body") : [ body ];

        liftDeclaration(body, "var");
        liftDeclaration(body, "let");

        function liftDeclaration(body, kind) {
          if (body[0] && body[0].isVariableDeclaration({ kind: kind })) {

            if (body[0].node.declarations.length > 1) {
              return;
            }

            if (body[1] && body[1].isVariableDeclaration({ kind: kind })) {
              return;
            }

            let firstNode = body[0].node.declarations[0];

            if (!t.isIdentifier(firstNode.id)) {
              return;
            }

            let init = path.get("init");
            if (!init.isVariableDeclaration({ kind: kind })) {
              return;
            }

            init.node.declarations = init.node.declarations.concat(
              firstNode.id
            );

            body[0].replaceWith(t.assignmentExpression(
              "=",
              t.clone(firstNode.id),
              t.clone(firstNode.init)
            ));
          }
        }
      },
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

          // concat `var` declarations next to for loops with it's initialisers.
          // block-scoped `let` and `const` are not moved because the for loop
          // is a different block scope.
          function (path) {
            if (!path.inList) {
              return;
            }

            const { node } = path;
            if (node.kind !== "var") {
              return;
            }

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
