module.exports = ({ Plugin, types: t }) => {
  function mangleNames(refs, charset, depth) {
    const entries = Array.from(refs.entries());
    entries.forEach(([binding, paths]) => {
      if (binding.scope.getFunctionParent().path.isProgram()) {
        return;
      }
      if (binding.path.isLabeledStatement()) {
        return;
      }

      const scopes = new Set();
      scopes.add(binding.scope.getFunctionParent());
      for (let path of paths) {
        scopes.add(path.scope.getFunctionParent());
      }

      let newName;
      let i = 0;

      do {
        newName = charset.getIdentifier(i);
        i += 1;
      } while (!(t.isValidIdentifier(newName)
          && canUse(newName, binding.scope.getFunctionParent(), scopes, refs)));

      // WARNING: this is a destructive operation, use scope.rename for
      // a safer operation, however, it does full tree traversal for every
      // rename:
      delete binding.scope.bindings[paths[0].node.name];
      binding.scope.bindings[newName] = binding;
      for (let path of paths) {
        path.node.name = newName;
      }
    });
  }

  function canUse(name, originalBindingScope, scopes, refsMap) {
    for (let scope of scopes) {
      // Competing binding in the definition scope.
      const competingBinding = scope.getBinding(name);
      if (competingBinding) {
        // If the competing binding shadows the originalBinding then we can't use it.
        if (competingBinding.scope.path.find(({ node }) => node === originalBindingScope.path.node)) {
          return false;
        }

        /**
         * Go through all references then crawl their scopes upwards,
         * looking to see if one of these references is in this scope.
         */
        const bindingRefs = refsMap.get(competingBinding);
        for (let ref of bindingRefs) {
          let myScope = ref.scope;
          do {
            if (myScope.path.node === scope.path.node) {
              return false;
            }
            myScope = myScope.parent;
          } while (myScope);
        }
      }
    }
    return true;
  }


  const collectVisitor = {
    Scope({ scope }) {
      let i = 0;
      let parent = scope.parent;
      while (parent) {
        i++;
        parent = parent.parent;
      }

      this.depth.set(scope, i);
    },

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
        // If the source code is small then we're going to assume that the user
        // is running on this on single files before bundling. Therefore we
        // need to achieve as much determinisim and we will not do any frequency
        // sorting on the character set. Currently the number is pretty arbitrary.
        const shouldConsiderSource = path.getSource().length > 70000;

        const charset = new Charset(shouldConsiderSource);
        // We want to take control of the sequencing and make sure our visitors
        // run in isolation.
        const refs = new Map();
        const depth = new Map();
        path.traverse(collectVisitor, {
          refs,
          charset,
          depth,
        });

        charset.sort();

        mangleNames(refs, charset, depth);
      },
    },
  };

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
