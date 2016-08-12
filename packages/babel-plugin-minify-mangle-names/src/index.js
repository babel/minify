const ManglerBfs = require("./mangler-bfs");

module.exports = ({ types: t }) => {
  const hop = Object.prototype.hasOwnProperty;

  class ManglerDfs {
    constructor(charset, program, {
      blacklist = {},
      keepFnames = false,
      eval: _eval = false
    } = {}) {
      this.charset = charset;
      this.program = program;
      this.blacklist = blacklist;
      this.keepFnames = keepFnames;
      this.eval = _eval;

      // unsafe scopes that contain an `eval`
      this.unsafeScopes = new Set;

      // <Binding, NodePath[]>
      this.bindings = new Map;

      // <Scope, Set<string>>
      this.usedFunctionBindings = new Map;
    }

    run() {
      this.collect();
      this.charset.sort();
      this.mangle();
    }

    collect() {
      this.program.traverse(collectVisitor, this);
    }

    mangle() {
      for (const [binding, identifierPaths] of this.bindings.entries()) {

        // Check if the scope is safe.
        if (this.unsafeScopes.has(binding.scope)) {
          continue;
        }

        // Don't mangle top level bindings. We can potentially do it just for block scoped though.
        if (binding.scope.path.isProgram()) {
          continue;
        }

        // Don't magnle if this exists in the blacklist
        const oldName = binding.identifier.name;
        if (hop.call(this.blacklist, oldName)) {
          continue;
        }

        // Find a new name that doesn't collide with any.
        let newName;
        let i = 0;
        do {
          newName = this.charset.getIdentifier(i);
          i++;
        } while (!t.isValidIdentifier(newName) || !this.canUse(newName, binding, identifierPaths));

        // Register binding names as used to prevent them new bindings from being mangled inside
        // that could shadow.
        for (let path of identifierPaths) {
          const funcScope = path.scope.getFunctionParent();
          let used = this.usedFunctionBindings.get(funcScope);
          if (!used) {
            used = new Set;
            this.usedFunctionBindings.set(funcScope, used);
          }
          used.add(newName);
        }

        this.rename(newName, binding, identifierPaths);
      }
    }

    rename(newName, binding, identifierPaths) {
      const oldName = binding.identifier.name;

      // Update scope tracking.
      const scope = binding.scope;
      const bindings = scope.bindings;
      delete bindings[oldName];
      bindings[newName] = binding;

      // Update identifiers to reference the new name.
      for (const path of identifierPaths) {
        path.node.name = newName;
      }
    }

    canUseInFunction(name, scope) {
      const used = this.usedFunctionBindings.get(scope);
      return !used || !used.has(name);
    }

    canUse(name, binding, identifierPaths) {
      let scope = binding.scope;
      if (scope.hasGlobal(name)) {
        return false;
      }

      // Check name against names of references that appear in this function
      const funcScope = scope.getFunctionParent();
      if (!this.canUseInFunction(name, funcScope)) return false;

      // Check that references to this variable aren't inside a function that has it used.
      for (let path of identifierPaths) {
        let funcParent = path.scope.getFunctionParent();
        if (!this.canUseInFunction(name, funcParent)) return false;
      }

      // Collect scopes that we'll check for collisions in.
      const scopes = [scope];
      for (let path of identifierPaths) {
        scopes.push(path.scope);
      }

      // Build a list of scope ancestors.
      const parentScopes = [];
      do {
        parentScopes.push(scope);
      } while ((scope = scope.parent) && scope !== funcScope);

      for (const scope of scopes) {
        const existing = scope.getBinding(name);

        if (!existing || existing === binding) continue;

        // Don't shadow any bindings in this scope.
        if (existing.scope === binding.scope) {
          return false;
        }

        // Don't collide params with id.
        // TODO only do this if the param is in the same function head
        if (existing.kind === "hoisted" && binding.kind === "param") {
          return false;
        }

        let existingBinding = this.bindings.get(existing);
        if (existingBinding) {
          // Check if the scope of any of the references is above us.
          for (const path of existingBinding) {
            let scope = path.scope;
            if (scope.path.isFunction()) scope = scope.parent;
            scope = scope.getFunctionParent();

            // Check if the function for this reference is a parent scope.
            if (parentScopes.indexOf(scope) >= 0) {
              return false;
            }
          }
        }
      }

      for (const referencePath of binding.referencePaths) {
        let scope = referencePath.scope;

        do {
          if (scope.getBinding(name)) {
            return false;
          }
        } while ((scope = scope.parent) && scope !== binding.scope);
      }

      return true;
    }
  }

  const collectVisitor = {
    "ReferencedIdentifier|BindingIdentifier"(path) {
      const { scope, node } = path;

      // Node is a label.
      if (path.parentPath.isLabeledStatement({ label: node })) {
        return;
      }

      // Ignore break and continue statements.
      if (path.parentPath.isContinueStatement({ label: node }) || path.parentPath.isBreakStatement({ label: node })) {
        return;
      }

      // Doesn't take care of local eval bindings yet
      if (!this.eval && node.name === "eval" && path.parent.type === "CallExpression" && !path.scope.getBinding("eval")) {
        // Mark all scopes from this one up as unsafe.
        let evalScope = scope;
        do {
          this.unsafeScopes.add(evalScope);
        } while (evalScope = evalScope.parent);
      }

      // Retrieve the binding.
      let binding;
      if (t.isFunctionDeclaration(path.parent, { id: node })) {
        // A function declaration name maybe shadowed by a variable
        // in the scope. So we get it from the upper scope.
        binding = scope.parent.getBinding(node.name);
      } else {
        binding = scope.getBinding(node.name);
      }
      if (!binding) return;

      if (this.keepFnames && isFunction(binding.path)) {
        return;
      }

      // Add the node path to our bindings map.
      let paths = this.bindings.get(binding);
      if (!paths) {
        paths = [];
        this.bindings.set(binding, paths);
      }
      paths.push(path);
    },

    Literal({ node }) {
      this.charset.consider(String(node.value));
    },

    Identifier(path) {
      const { node } = path;

      if ((path.parentPath.isMemberExpression({ property: node })) ||
          (path.parentPath.isObjectProperty({ key: node }))
      ) {
        this.charset.consider(node.name);
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
        // TODO:
        // REMOVE
        // temporary flag
        this.opts.bfs = true;

        const Mangler = this.opts.bfs ? ManglerBfs : ManglerDfs;
        const mangler = new Mangler(charset, path, this.opts, t);
        mangler.run();
      },
    },
  };
};

const CHARSET = ("abcdefghijklmnopqrstuvwxyz" +
                 "ABCDEFGHIJKLMNOPQRSTUVWXYZ$_").split("");

class Charset {
  constructor(shouldConsider) {
    this.shouldConsider = shouldConsider;
    this.chars = CHARSET.slice();
    this.frequency = {};
    this.chars.forEach((c) => { this.frequency[c] = 0; });
    this.finalized = false;
  }

  consider(str) {
    if (!this.shouldConsider) {
      return;
    }

    str.split("").forEach((c) => {
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
      throw new Error("Should sort first");
    }

    let ret = "";
    num++;
    do {
      num--;
      ret += this.chars[num % this.chars.length];
      num = Math.floor(num / this.chars.length);
    } while (num > 0);
    return ret;
  }
}

// for keepFnames
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration()
    || path.isClassExpression()
    || path.isClassDeclaration();
}
