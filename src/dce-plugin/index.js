'use strict';

module.exports = ({ Plugin, types: t }) => {

  return {
    visitor: {
      // remove side effectless statement
      ExpressionStatement(path) {
        if (path.get('expression').isPure() && !path.isCompletionRecord()) {
          path.remove();
        }
      },

      ReferencedIdentifier(path) {
        const { scope, node } = path;
        const binding = scope.getBinding(node.name);
        if (!binding || binding.references > 1 || !binding.constant ||
            binding.param === 'param' || binding.kind === 'module') {
              return;
        }

        const bindingPath = binding.path;

        let replacement = bindingPath.node;
        if (t.isVariableDeclarator(replacement)) {
          replacement = replacement.init;
        }
        if (!replacement) {
          return;
        }

        // ensure it's a "pure" type
        if (!scope.isPure(replacement, true)) {
          return;
        }

        // don't change path if it's in a different scope, path can be bad
        // for performance since it may be inside a loop or deeply nested in
        // hot code
        if ((t.isClass(replacement) || t.isFunction(replacement))
            && bindingPath.scope.parent && bindingPath.scope.parent !== scope) {
              return;
        }

        if (path.findParent(({ node: n }) => n === replacement)) {
          return;
        }

        t.toExpression(replacement);
        scope.removeBinding(node.name);
        bindingPath.remove();
        path.replaceWith(replacement);
      },

      // Remove bindings with no references.
      Scope({ node, parent, scope }) {
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (!binding.referenced && binding.kind !== 'param' && binding.kind !== 'module') {
            let path = binding.path;
            if (path.isVariableDeclarator()) {
              if (!scope.isPure(path.node.init)) {
                continue;
              }
            } else if (!scope.isPure(path.node)) {
              continue;
            } else if (path.isFunctionExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              continue;
            }
            scope.removeBinding(name);
            path.remove();
          }
        }
      },

      // Remove unreachable code.
      BlockStatement(path) {
        const paths = path.get('body');

        let purge = false;

        for (let i = 0; i < paths.length; i++) {
          const p = paths[i];

          if (!purge && p.isCompletionStatement()) {
            purge = true;
            continue;
          }

          if (purge && !p.isFunctionDeclaration()) {
            p.remove();
          }
        }
      },

      // Remove return statements that have no semantic meaning
      ReturnStatement(path) {
        const { node } = path;
        if (node.argument || !path.inList) {
          return;
        }

        // Not last in it's block? (See BlockStatement visitor)
        if (path.container.length - 1 !== path.key) {
          throw new Error('Unexpected dead code');
        }

        let noNext = true;
        let parentPath = path.parentPath;
        while (parentPath && !parentPath.isFunction() && noNext) {
          const nextPath = parentPath.getSibling(parentPath.key + 1);
          if (nextPath.node) {
            if (nextPath.isReturnStatement()) {
              nextPath.pushContext(path.context);
              nextPath.visit();
              nextPath.popContext();
              if (parentPath.getSibling(parentPath.key + 1).node) {
                noNext = false;
                break;
              }
            } else {
              noNext = false;
              break;
            }
          }

          parentPath = parentPath.parentPath;
        }

        if (noNext) {
          path.remove();
        }
      },
    },
  };
};
