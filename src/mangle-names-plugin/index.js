const Base54 = require('./Base54');

module.exports = ({ Plugin, types: t }) => {
  const mangleNamesVisitors = {
    Scope({ scope }) {
      const bindings = scope.bindings;
      scope.bindings = {};

      const names = Object.keys(bindings);

      let i = 0;
      for (let name of names) {
        let binding = bindings[name];
        let bindingRefs = this.refs.get(binding);
        if (!bindingRefs) {
          continue;
        }

        let newName;

        do {
          newName = this.base54.name(i);
          i += 1;
        } while (!(t.isValidIdentifier(newName)
            && canUse(newName, scope, bindingRefs, this.refs)));

        scope.bindings[newName] = binding;
        for (let ref of bindingRefs) {
          ref.node.name = newName;
        }
      }
    },
  };

  return {
    pre() {
      this.base54 = new Base54();
      this.refs = new Map();
    },

    visitor: {
      Program: {
        exit(path) {
          this.base54.sort();
          path.traverse(mangleNamesVisitors, {
            base54: this.base54,
            refs: this.refs,
          });
        },
      },

      'ReferencedIdentifier|BindingIdentifier'(path) {
        const { scope, node } = path;
        recordRef(this.refs, scope.getBinding(node.name), path);
      },

      'FunctionExpression|FunctionDeclaration'(path) {
        this.base54.consider('function');
      },

      'ClassExpression|ClassDeclaration'(path) {
        this.base54.consider('class');
      },

      Identifier({ scope, node }) {
        // Don't consider lexical bindings as they will be renamed.
        if (!scope.getBinding(node.name)) {
          this.base54.consider(node.name);
        }
      },

      ReturnStatement(path) {
        this.base54.consider('return');
      },

      ThrowStatement(path) {
        this.base54.consider('throw');
      },

      ContinueStatement(path) {
        this.base54.consider('continue');
      },

      BreakStatement(path) {
        this.base54.consider('break');
      },

      DebuggerStatement(path) {
        this.base54.consider('debugger');
      },

      WhileStatement(path) {
        this.base54.consider('while');
      },

      DoWhileStatement(path) {
        this.base54.consider('do while');
      },

      For(path) {
        this.base54.consider('for');
      },

      ForInStatement(path) {
        this.base54.consider('in');
      },

      ForOfStatement(path) {
        this.base54.consider('of');
      },

      IfStatement({ node }) {
        this.base54.consider('if');
        if (node.alternate) {
          this.base54.consider('else');
        }
      },

      VariableDeclaration({ node }) {
        this.base54.consider(node.kind);
      },

      NewExpression(path) {
        this.base54.consider('new');
      },

      ThisExpression(path) {
        this.base54.consider('this');
      },

      TryStatement({ node }) {
        this.base54.consider('try');
        if (node.finalizer) {
          this.base54.consider('finally');
        }
      },

      CatchClause(path) {
        this.base54.consider('catch');
      },

      Literal({ node }) {
        this.base54.consider(String(node.value));
      },

      'UnaryExpression|BinaryExpression'({ node }) {
        this.base54.consider(node.operator);
      },
    },
  };

  function canUse(name, scope, refs, refsMap) {
    // Competing binding in the definition scope.
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

    // If any of the references is in a scope with a competing
    // binding then we need to pick a different name.
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
