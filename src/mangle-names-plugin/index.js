module.exports = ({ Plugin, types: t }) => {
  const hop = Object.prototype.hasOwnProperty;

  class Mangler {
    constructor(charset, program, blacklist) {
      this.charset = charset;
      this.program = program;
      this.blacklist = blacklist;

      // scope => {name => true}
      this.scopeToRefNames = new Map();
      // binding => [path, path ...]
      this.bindingToRefPaths = new Map();
      // scope => set(scopes)
      this.scopeToChildren = new Map();
    }

    recordRefName(scope, name) {
      const { scopeToRefNames } = this;

      const refNames = scopeToRefNames.get(scope) || Object.create(null);
      scope = scope.getFunctionParent();
      if (!scopeToRefNames.has(scope)) {
        scopeToRefNames.set(scope, refNames);
      }
      refNames[name] = true;
    }

    recordBindingPath(binding, path) {
      const { bindingToRefPaths, scopeToChildren } = this;
      const paths = bindingToRefPaths.get(binding) || [];
      if (!bindingToRefPaths.has(binding)) {
        bindingToRefPaths.set(binding, paths);
      }
      paths.push(path);

      const scope = binding.scope.getFunctionParent();

      this.recordRefName(scope, binding.identifier.name);
      this.recordRefName(path.scope, binding.identifier.name);

      // Program scope.
      if (!scope.parent) {
        return;
      }

      const parentScope = scope.parent.getFunctionParent();
      const scopes = scopeToChildren.get(parentScope) || new Set();
      if (!scopeToChildren.has(parentScope)) {
        scopeToChildren.set(parentScope, scopes);
      }
      scopes.add(scope);
    }

    run() {
      this.program.traverse(collectVisitor, {
        recordBindingPath: (binding, path) => this.recordBindingPath(binding, path),
        charset: this.charset,
      });

      this.charset.sort();
      this.mangle();
    }

    canUse(newName, binding) {
      const { scopeToRefNames, scopeToChildren } = this;

      // Visit all scopes from the binding (definition) scope and all
      // children scope downwards ignoring scopes with their own definition.
      // And check if any of them references a `newName` variable.
      const visited = new Set();
      const toVisit = [binding.scope.getFunctionParent()];

      while (toVisit.length) {
        const scope = toVisit.pop();

        if (scope.hasGlobal(newName)) {
          return false;
        }

        const scopeReferences = scopeToRefNames.get(scope);
        if (scopeReferences && scopeReferences[newName]) {
          return false;
        }

        visited.add(scope);

        const children = scopeToChildren.get(scope);
        if (children) {
          for (let scopeToVisit of children) {
            if (!visited.has(scopeToVisit) &&
                !scopeToVisit.hasOwnBinding(newName)) {
              toVisit.push(scopeToVisit);
            }
          }
        }
      }

      // Visit all binding reference paths and make sure there is no name
      // collisions in their respective scopes and their parent scopes (to
      // protect against shadowing)
      const paths = this.bindingToRefPaths.get(binding);
      const defScope = binding.scope.getFunctionParent();
      for (let path of paths) {
        let scope = path.scope.getFunctionParent();
        while (scope && scope !== defScope) {
          const scopeReferences = scopeToRefNames.get(scope);
          if (scopeReferences && scopeReferences[newName]) {
            return false;
          }
          scope = scope.parent;
        }
      }

      return true;
    }

    updateScopeInfo(binding, newName) {
      const scope = binding.scope.getFunctionParent();
      const scopeReferences = this.scopeToRefNames.get(scope);
      if (!scopeReferences) {
        throw new Error('Encountered a scope with no information about');
      }

      const oldName = binding.identifier.name;
      delete scopeReferences[oldName];
      scopeReferences[newName] = true;

      const paths = this.bindingToRefPaths.get(binding);
      for (let path of paths) {
        const refNames = this.scopeToRefNames.get(path.scope.getFunctionParent());
        delete refNames[oldName];
        refNames[newName] = true;
        path.node.name = newName;
      }

      delete binding.scope.bindings[oldName];
      binding.identifier.name = newName;
      scope.bindings[newName] = binding;
    }

    mangle() {
      const { bindingToRefPaths, charset } = this;
      const entries = Array.from(bindingToRefPaths.entries());
      entries.forEach(([binding, paths]) => {
        if (hop.call(this.blacklist, binding.identifier.name)) {
          return;
        }

        if (binding.scope.getFunctionParent().path.isProgram()) {
          return;
        }
        if (binding.path.isLabeledStatement()) {
          return;
        }

        let newName;
        let i = 0;

        do {
          newName = charset.getIdentifier(i);
          i += 1;
        } while (!t.isValidIdentifier(newName) || !this.canUse(newName, binding));

        this.updateScopeInfo(binding, newName);
      });
    }
  }

  const collectVisitor = {
    'ReferencedIdentifier|BindingIdentifier'(path) {
      const { scope, node } = path;

      if (path.parentPath.isLabeledStatement()) {
        return;
      }

      // Ignore break and continue statements.
      if (path.parentPath.isContinueStatement() || path.parentPath.isBreakStatement()) {
        if (path.parent.label === node) {
          return;
        }
      }

      // A function declaration name maybe shadowed by a variable
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

      this.recordBindingPath(binding, path);
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
        const mangler = new Mangler(charset, path, this.opts.mangleBlacklist || {});
        mangler.run();
      },
    },
  };
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
