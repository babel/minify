const CountedSet = require("./counted-set");
const isLabelIdentifier = require("./is-label-identifier");

/**
 * Scope - References, Bindings
 */
module.exports = class ScopeTracker {
  constructor({ reuse }) {
    this.references = new Map;
    this.bindings = new Map;

    this.reuse = reuse;
  }

  // Register a new Scope and initiliaze it with empty sets
  addScope(scope) {
    if (!this.references.has(scope)) {
      this.references.set(scope, new CountedSet);
    }
    if (!this.bindings.has(scope)) {
      this.bindings.set(scope, new Map);
    }
  }

  addReference(scope, binding, name) {
    let parent = scope;
    do {
      if (!this.references.has(parent)) {
        this.addScope(parent);
        this.updateScope(parent);
      }
      this.references.get(parent).add(name);

      // here binding is undefined for globals,
      // so we just add to all scopes up
      if (binding && binding.scope === parent) {
        break;
      }
    } while (parent = parent.parent);
  }

  hasReference(scope, name) {
    if (!this.reuse) {
      return scope.hasReference(name);
    }
    if (!this.references.has(scope)) {
      this.addScope(scope);
      this.updateScope(scope);
    }
    return this.references.get(scope).has(name);
  }

  canUseInReferencedScopes(binding, next) {
    const tracker = this;

    if (tracker.hasReference(binding.scope, next)) {
      return false;
    }

    for (let i = 0; i < binding.constantViolations.length; i++) {
      const violation = binding.constantViolations[i];
      if (tracker.hasReference(violation.scope, next)) {
        return false;
      }
    }

    for (let i = 0; i < binding.referencePaths; i++) {
      const ref = binding.referencePaths[i];
      if (!ref.isIdentifier()) {
        let canUse = true;
        ref.traverse({
          ReferencedIdentifier(path) {
            if (path.node.name !== next) return;
            if (tracker.hasReference(path.scope, next)) {
              canUse = false;
            }
          }
        });
        if (!canUse) {
          return canUse;
        }
      } else if (!isLabelIdentifier(ref)) {
        if (tracker.hasReference(ref.scope, next)) {
          return false;
        }
      }
    }

    return true;
  }

  updateReference(scope, binding, oldName, newName) {
    let parent = scope;
    do {
      if (!this.references.has(parent)) {
        this.addScope(parent);
        this.updateScope(parent);
      }

      // update
      const ref = this.references.get(parent);
      if (ref.has(oldName)) {
        ref.delete(oldName);
        ref.add(newName);
      }
      // else already renamed

      if (binding.scope === parent) {
        break;
      }
    } while (parent = parent.parent);
  }

  addBinding(binding) {
    if (!binding) {
      return;
    }
    const bindings = this.bindings.get(binding.scope);
    if (!bindings.has(binding.identifier.name)) {
      bindings.set(binding.identifier.name, binding);
    }
  }

  hasBinding(scope, name) {
    if (!this.reuse) {
      return scope.hasBinding(name);
    }
    return this.bindings.get(scope).has(name);
  }

  renameBinding(scope, oldName, newName) {
    const bindings = this.bindings.get(scope);
    bindings.set(newName, bindings.get(oldName));
    bindings.delete(oldName);
  }

  // This is a fallback option and is used when something happens -
  // during traversal and checks we find that a scope doesn't
  // exist in the tracker
  //
  // This should NOT happen ultimately. Just used as a fallback
  // with a throw statement. This helps in understanding where it
  // happens to debug it.
  updateScope(scope) {
    throw new Error("Tracker received a scope it doesn't know about yet. Please report this - https://github.com/babel/babili/issues/new");

    const tracker = this;
    scope.path.traverse({
      ReferencedIdentifier(path) {
        if (path.scope === scope) {
          const binding = scope.getBinding(path.node.name);
          tracker.addReference(scope, binding, path.node.name);
        }
      }
    });
  }
};
