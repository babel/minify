const chars = 'abcdefghijklmnopqrstuvwxyz' +
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ$'.split('');

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
          newName = getIdentifier(i);
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
      this.refs = new Map();
    },

    visitor: {
      Program: {
        exit(path) {
          path.traverse(mangleNamesVisitors, {
            refs: this.refs,
          });
        },
      },

      'ReferencedIdentifier|BindingIdentifier'(path) {
        const { scope, node } = path;
        recordRef(this.refs, scope.getBinding(node.name), path);
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
    return true;
  }

  function recordRef(refs, binding, refPath) {
    if (!refs.has(binding)) {
      refs.set(binding, []);
    }
    refs.get(binding).push(refPath);
  }

  function getIdentifier(num) {
    let ret = '';
    num++;
    do {
      num--;
      ret += chars[num % chars.length];
      num = Math.floor(num / chars.length);
    } while (num > 0);
    return ret;
  }
};
