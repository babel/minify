module.exports = ({ Plugin, types: t }) => {
  const mangleNamesVisitors = {
    Scope({ scope }) {
      const bindings = scope.bindings;
      scope.bindings = {};

      const names = Object.keys(bindings);

      let i = 0;
      for (let name of names) {
        let binding = bindings[name];

        if (binding.path.isLabeledStatement()) {
          continue;
        }

        let bindingRefs = this.refs.get(binding);
        if (!bindingRefs) {
          continue;
        }

        let newName;

        do {
          newName = this.charset.getIdentifier(i);
          i += 1;
        } while (!(t.isValidIdentifier(newName)
            && canUse(newName, scope, bindingRefs, this.refs)));

        // WARNING: this is a destructive operation, use scope.rename for
        // a safer operation, however, it does full tree traversal for every
        // rename:
        scope.bindings[newName] = binding;
        for (let ref of bindingRefs) {
          ref.node.name = newName;
        }
      }
    },
  };

  const collectVisitor = {
    'ReferencedIdentifier|BindingIdentifier'(path) {
      if (path.parentPath.isLabeledStatement()) {
        return;
      }

      const { scope, node } = path;

      // A function decleration name maybe shadowed by a variable
      // in the scope. So we get it from the upper scope.
      let binding;
      if (t.isFunctionDeclaration(path.parent, { id: node })) {
        binding = scope.parent.getBinding(node.name);
      } else {
        binding = scope.getBinding(node.name);
      }

      if (!binding) {
        return;
      }

      recordRef(this.refs, binding, path);
    },

    Literal({ node }) {
      this.charset.consider(String(node.value));
    },

    Identifier(path) {
      if ((path.parentPath.isMemberExpression() && path.key === 'property') ||
          (path.parentPath.isObjectProperty() && path.key === 'key')
      ) {
        this.charset.consider(path.node.name);
      }
    },
  };

  return {
    visitor: {
      Program(path) {
        // If the source code is small then considering the source program
        // text is not good because it creates non-determinisim.
        // Found that in general the source : minified ratio is ~ 1 : 3
        const shouldConsiderSource = (path.getSource().length / 3) > 32000;

        const charset = new Charset(shouldConsiderSource);
        // We want to take control of the sequencing and make sure our visitors
        // run in isolation.
        const refs = new Map();
        path.traverse(collectVisitor, {
          refs,
          charset,
        });

        charset.sort();

        path.traverse(mangleNamesVisitors, {
          refs,
          charset,
        });
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
};

const CHARSET = ('abcdefghijklmnopqrstuvwxyz' +
                 'ABCDEFGHIJKLMNOPQRSTUVWXYZ$_').split('');

class Charset {
  constructor(shouldConsider) {
    this.shouldConsider = shouldConsider;
    this.chars = CHARSET.slice();
    this.frequency = {};
    this.chars.forEach(c => this.frequency[c] = 0);
    this.finalized = false;
  }

  consider(str) {
    if (!this.shouldConsider) {
      return;
    }

    str.split('').forEach(c => {
      if (this.frequency[c] != null) {
        this.frequency[c]++;
      }
    });
  }

  sort() {
    if (this.shouldConsider) {
      this.chars = this.chars.sort(
        (a, b) => this.frequency[b] - this.frequency[a]
      );
    }

    this.finalized = true;
  }

  getIdentifier(num) {
    if (!this.finalized) {
      throw new Error('Should sort first');
    }

    let ret = '';
    num++;
    do {
      num--;
      ret += this.chars[num % this.chars.length];
      num = Math.floor(num / this.chars.length);
    } while (num > 0);
    return ret;
  }
}
