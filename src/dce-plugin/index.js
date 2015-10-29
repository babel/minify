'use strict';

module.exports = ({ Plugin, types: t }) => {

  return new Plugin('dce', {
    metadata: {
      group: 'builtin-pre',
    },

    visitor: {

      // remove side effectless statement
      ExpressionStatement: function () {
        if (this.get('expression').isPure() && !this.isCompletionRecord()) {
          this.dangerouslyRemove();
        }
      },

      ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope) {
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

        // don't change this if it's in a different scope, this can be bad
        // for performance since it may be inside a loop or deeply nested in
        // hot code
        if ((t.isClass(replacement) || t.isFunction(replacement))
            && bindingPath.scope.parent && bindingPath.scope.parent !== scope) {
              return;
        }

        if (this.findParent(path => path.node === replacement)) {
          return;
        }

        t.toExpression(replacement);
        scope.removeBinding(node.name);
        bindingPath.dangerouslyRemove();
        return replacement;
      },

      // Remove bindings with no references.
      Scope(node, parent, scope) {
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
            path.dangerouslyRemove();
          }
        }
      },

      // Remove unreachable code.
      BlockStatement() {
        const paths = this.get('body');

        let purge = false;

        for (let i = 0; i < paths.length; i++) {
          let path = paths[i];

          if (!purge && path.isCompletionStatement()) {
            purge = true;
            continue;
          }

          if (purge && !path.isFunctionDeclaration()) {
            path.dangerouslyRemove();
          }
        }
      },

      // Remove return statements that have no semantic meaning
      ReturnStatement(node, parent, scope) {
        if (node.argument || !this.inList) {
          return;
        }

        // Not last in it's block? (See BlockStatement visitor)
        if (this.container.length - 1 !== this.key) {
          throw new Error('Unexpected dead code');
        }

        let noNext = true;
        let parentPath = this.parentPath;
        while (parentPath && !parentPath.isFunction() && noNext) {
          const nextPath = parentPath.getSibling(parentPath.key + 1);
          if (nextPath.node) {
            if (nextPath.isReturnStatement()) {
              nextPath.unshiftContext(this.context);
              nextPath.visit();
              nextPath.shiftContext();
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
          this.dangerouslyRemove();
        }
      },
    },
  });
};
