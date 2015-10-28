const Base54 = require('./Base54');

module.exports = ({ Plugin, types: t }) => {
  const mangleNamesVisitors = {
    Scope: {
      exit(node, parent, scope, state) {
        const bindings = scope.bindings;
        scope.bindings = {};

        const names = Object.keys(bindings);

        let i = 0;
        for (let name of names) {
          let binding = bindings[name];
          let bindingRefs = state.refs.get(binding);
          if (!bindingRefs) {
            continue;
          }

          let newName;

          do {
            newName = state.base54.name(i);
            i += 1;
          } while (!(t.isValidIdentifier(newName)
              && canUse(newName, scope, bindingRefs, state.refs)));

          scope.bindings[newName] = binding;
          for (let ref of bindingRefs) {
            ref.node.name = newName;
          }
        }
      },
    },
  };

  return new Plugin('mangle-names', {
    metadata: {
      group: 'builtin-pre',
    },

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
        recordRef(refs, scope.getBinding(node.name), this);
      },

      'FunctionExpression|FunctionDeclaration'(node, parent, scope, state) {
        state.get('base54').consider('function');
      },

      'ClassExpression|ClassDeclaration'(node, parent, scope, state) {
        state.get('base54').consider('class');
      },

      Identifier(node, parent, scope, state) {
        // Don't consider lexical bindings as they will be renamed.
        if (!scope.getBinding(node.name)) {
          state.get('base54').consider(node.name);
        }
      },

      ReturnStatement(node, parent, scope, state) {
        state.get('base54').consider('return');
      },

      ThrowStatement(node, parent, scope, state) {
        state.get('base54').consider('throw');
      },

      ContinueStatement(node, parent, scope, state) {
        state.get('base54').consider('continue');
      },

      BreakStatement(node, parent, scope, state) {
        state.get('base54').consider('break');
      },

      DebuggerStatement(node, parent, scope, state) {
        state.get('base54').consider('debugger');
      },

      WhileStatement(node, parent, scope, state) {
        state.get('base54').consider('while');
      },

      DoWhileStatement(node, parent, scope, state) {
        state.get('base54').consider('do while');
      },

      For(node, parent, scope, state) {
        state.get('base54').consider('for');
      },

      ForInStatement(node, parent, scope, state) {
        state.get('base54').consider('in');
      },

      ForOfStatement(node, parent, scope, state) {
        state.get('base54').consider('of');
      },

      IfStatement(node, parent, scope, state) {
        state.get('base54').consider('if');
        if (node.alternate) {
          state.get('base54').consider('else');
        }
      },

      VariableDeclaration(node, parent, scope, state) {
        state.get('base54').consider(node.kind);
      },

      NewExpression(node, parent, scope, state) {
        state.get('base54').consider('new');
      },

      ThisExpression(node, parent, scope, state) {
        state.get('base54').consider('this');
      },

      TryStatement(node, parent, scope, state) {
        state.get('base54').consider('try');
        if (node.finalizer) {
          state.get('base54').consider('finally');
        }
      },

      CatchClause(node, parent, scope, state) {
        state.get('base54').consider('catch');
      },

      Literal(node, parent, scope, state) {
        state.get('base54').consider(String(node.value));
      },

      'UnaryExpression|BinaryExpression'(node, parent, scope, state) {
        state.get('base54').consider(node.operator);
      },
    },
  });

  function canUse(name, scope, refs, refsMap) {
    const competingBinding = scope.getBinding(name);
    if (competingBinding) {
      /**
       * Go through all references then crawl their scopes upwards,
       * looking to see if one of these references is in this scope.
       */
      const bindingRefs = refsMap.get(competingBinding);
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

    for (let ref of refs) {
      if (ref.scope.getBinding(name)) {
        return false;
      }
    }
    return true;
  }

  function recordRef(refs, binding, refPath) {
    if (!refs.has(binding)) {
      refs.set(binding, []);
    }
    refs.get(binding).push(refPath);
  }
};
