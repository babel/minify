'use strict';

module.exports = ({ Plugin, types: t }) => {

  const removeReferenceVisitor = {
    'ReferencedIdentifier|BindingIdentifier'(node, parent, scope, state) {
      const init = state.bindingsToReplace[node.name];
      if (!init) {
        return;
      }

      this.replaceWith(init);
    },
  };

  return new Plugin('dce', {
    metadata: {
      group: 'builtin-pre',
    },

    pre(state) {
      state.set('bindingsToReplace', new Map());
    },

    visitor: {
      // remove side effectless statement
      ExpressionStatement: function () {
        if (this.get('expression').isPure() && !this.isCompletionRecord()) {
          this.dangerouslyRemove();
        }
      },

      Scope: {
        enter(node, parent, scope, state) {
          const bindingsToReplace = Object.create(null);
          for (let name in scope.bindings) {
            let binding = scope.bindings[name];

            if (binding.references > 1 || !binding.constant ||
                !binding.path.isVariableDeclarator()) {
              continue;
            }

            let init = binding.path.get('init');
            if (!init.isPure() || t.isFunction(init.node)) {
              continue;
            }

            binding.path.dangerouslyRemove();
            bindingsToReplace[name] = init.node;
            delete scope.bindings[name];
          }

          state.get('bindingsToReplace').set(scope, bindingsToReplace);
        },

        exit(node, parent, scope, state) {
          this.traverse(removeReferenceVisitor, {
            bindingsToReplace: state.get('bindingsToReplace').get(scope),
          });
        },
      },
    },
  });
};
