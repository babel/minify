const Base54 = require('./Base54');

module.exports = ({ Plugin, types: t }) => {
  const mangleNamesVisitors = {
    Scope: {
      exit(node, parent, scope, state) {
        const bindings = scope.bindings;
        scope.bindings = {};

        const names = Object.keys(bindings).sort(
          (a, b) => bindings[a].references < bindings[b].references
        );

        for (let name of names) {
          let binding = bindings[name];
          let bindingRefs = state.refs.get(binding);
          if (!bindingRefs) {
            continue;
          }

          let newName;
          let i = 0;
          do {
            newName = state.base54.name(i);
            i += 1;
          } while (!(t.isValidIdentifier(newName)
              && canUse(newName, scope, state.refs)));

          scope.bindings[newName] = binding;
          for (let ref of bindingRefs) {
            ref.node.name = newName;
          }
        }
      },
    },
  };

  return new Plugin('base54', {
    pre(state) {
      state.set('base54', new Base54());
      state.set('refs', new Map());
    },

    visitor: {
      Program: {
        exit(node, parent, scope, state) {
          state.get('base54').sort();
          this.traverse(mangleNamesVisitors, {
            base54: state.get('base54'),
            refs: state.get('refs'),
          });
        },
      },

      'ReferencedIdentifier|BindingIdentifier'(node, parent, scope, state) {
        const refs = state.get('refs');
        const binding = scope.getBinding(node.name);
        if (!refs.has(binding)) {
          refs.set(binding, []);
        }
        refs.get(binding).push(this);
      },

      'FunctionExpression|FunctionDeclaration'(node, path, scope, state) {
        state.get('base54').consider('function');
      },

      'ClassExpression|ClassDeclaration'(node, path, scope, state) {
        state.get('base54').consider('class');
      },

      Identifier(node, path, scope, state) {
        state.get('base54').consider(node.name);
      },

      ReturnStatement(node, path, scope, state) {
        state.get('base54').consider('return');
      },

      ThrowStatement(node, path, scope, state) {
        state.get('base54').consider('throw');
      },

      ContinueStatement(node, path, scope, state) {
        state.get('base54').consider('continue');
      },

      BreakStatement(node, path, scope, state) {
        state.get('base54').consider('break');
      },

      DebuggerStatement(node, path, scope, state) {
        state.get('base54').consider('debugger');
      },

      WhileStatement(node, path, scope, state) {
        state.get('base54').consider('while');
      },

      DoWhileStatement(node, path, scope, state) {
        state.get('base54').consider('do while');
      },

      For(node, path, scope, state) {
        state.get('base54').consider('for');
      },

      ForInStatement(node, path, scope, state) {
        state.get('base54').consider('in');
      },

      ForOfStatement(node, path, scope, state) {
        state.get('base54').consider('of');
      },

      IfStatement(node, path, scope, state) {
        state.get('base54').consider('if');
        if (node.alternate) {
          state.get('base54').consider('else');
        }
      },

      VariableDeclaration(node, path, scope, state) {
        state.get('base54').consider(node.kind);
      },

      NewExpression(node, path, scope, state) {
        state.get('base54').consider('new');
      },

      ThisExpression(node, path, scope, state) {
        state.get('base54').consider('this');
      },

      TryStatement(node, path, scope, state) {
        state.get('base54').consider('try');
      },
    },
  });

  function canUse(name, scope, refs) {
    const binding = scope.getBinding(name);
    if (!binding || !refs.has(binding)) {
      return true;
    }

    const bindingRefs = refs.get(binding);

    /**
     * Go through all references then crawl their scopes upwards,
     * looking to see if one of these references is in this scope.
     */
    for (let ref of bindingRefs) {
      let myScope = ref.scope;
      do {
        if (myScope === scope) {
          return false;
        }
        myScope = myScope.parent;
      } while (myScope);
    }
    return true;
  }
};
