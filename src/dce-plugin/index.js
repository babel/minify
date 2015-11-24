'use strict';

module.exports = ({ Plugin, types: t }) => {

  const removeReferenceVisitor = {
    ReferencedIdentifier(path) {
      if (!this.bindingsToReplace[path.node.name]) {
        return;
      }

      const { replacement, markReplaced, scope } = this.bindingsToReplace[path.node.name];

      if ((t.isClass(replacement) || t.isFunction(replacement))
          && scope !== path.scope) {
        return;
      }

      t.toExpression(replacement);
      path.replaceWith(replacement);
      markReplaced();
    },
  };

  return {
    visitor: {
      // remove side effectless statement
      ExpressionStatement(path) {
        if (path.get('expression').isPure() && !path.isCompletionRecord()) {
          path.remove();
        }
      },

      // Remove bindings with no references.
      Scope(path) {
        const { scope } = path;
        const bindingsToReplace = Object.create(null);

        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (!binding.referenced && binding.kind !== 'param' && binding.kind !== 'module') {
            if (binding.path.isVariableDeclarator()) {
              if (!scope.isPure(binding.path.node.init)) {
                continue;
              }
            } else if (!scope.isPure(binding.path.node)) {
              continue;
            } else if (binding.path.isFunctionExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              continue;
            }
            scope.removeBinding(name);
            binding.path.remove();
          } else if (binding.references === 1 && binding.kind !== 'param' &&
                     binding.kind !== 'module' && binding.constant) {
            let replacement = binding.path.node;
            if (t.isVariableDeclarator(replacement)) {
              replacement = replacement.init;
            }
            if (!replacement) {
              continue;
            }

            if (!scope.isPure(replacement, true)) {
              continue;
            }

            bindingsToReplace[name] = {
              scope,
              replacement,
              markReplaced() {
                scope.removeBinding(name);
                binding.path.remove();
              },
            };
          }
        }
        if (Object.keys(bindingsToReplace).length) {
          path.traverse(removeReferenceVisitor, {bindingsToReplace});
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
