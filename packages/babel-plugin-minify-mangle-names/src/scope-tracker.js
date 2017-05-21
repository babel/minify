const CountedSet = require("./counted-set");
const isLabelIdentifier = require("./is-label-identifier");

/**
 * Scope Tracker
 *   references: Map<Scope, CountedSet<String> >
 *   bindings: Map<Scope, Map<String, Binding> >
 */

module.exports = class ScopeTracker {
  constructor() {
    this.references = new Map();
    this.bindings = new Map();
  }

  // Register a new Scope and initiliaze it with empty sets
  addScope(scope) {
    if (!this.references.has(scope)) {
      this.references.set(scope, new CountedSet());
    }
    if (!this.bindings.has(scope)) {
      this.bindings.set(scope, new Map());
    }
  }

  addReference(scope, binding, name) {
    let parent = scope;
    do {
      this.references.get(parent).add(name);
      if (!binding) throw new Error("How did global come here");
      if (binding.scope === parent) break;
    } while ((parent = parent.parent));
  }

  hasReference(scope, name) {
    return this.references.get(scope).has(name);
  }

  updateReference(scope, binding, oldName, newName) {
    let parent = scope;
    do {
      const ref = this.references.get(parent);
      // if (!ref.has(oldName)) {
      //   throw new Error("ref " + oldName + " not found");
      // }
      ref.delete(oldName);
      ref.add(newName);
      // console.log("adding", newName, "to", parent.path.type);
      if (!binding) throw new Error("How did global get here");
      if (binding.scope === parent) break;
    } while ((parent = parent.parent));
  }

  hasBindingOrReference(scope, binding, name) {
    return this.hasReference(scope, name) || this.hasBinding(scope, name);
  }

  canUseInReferencedScopes(binding, next) {
    const tracker = this;

    if (tracker.hasBindingOrReference(binding.scope, binding, next)) {
      return false;
    }

    for (let i = 0; i < binding.constantViolations.length; i++) {
      const violation = binding.constantViolations[i];
      if (tracker.hasBindingOrReference(violation.scope, binding, next)) {
        return false;
      }
    }

    for (let i = 0; i < binding.referencePaths.length; i++) {
      const ref = binding.referencePaths[i];
      if (!ref.isIdentifier()) {
        let canUse = true;
        ref.traverse({
          ReferencedIdentifier(path) {
            if (path.node.name !== next) return;
            if (tracker.hasBindingOrReference(path.scope, binding, next)) {
              canUse = false;
            }
          }
        });
        if (!canUse) {
          return canUse;
        }
      } else if (!isLabelIdentifier(ref)) {
        if (tracker.hasBindingOrReference(ref.scope, binding, next)) {
          return false;
        }
      }
    }

    return true;
  }

  addBinding(binding) {
    if (!binding) {
      return;
    }

    const bindings = this.bindings.get(binding.scope);
    const existingBinding = bindings.get(binding.identifier.name);

    if (existingBinding && existingBinding !== binding) {
      throw new Error(
        "Binding " +
          existingBinding.identifier.name +
          "already exists. " +
          "Trying to add " +
          binding.identifier.name
      );
    }

    bindings.set(binding.identifier.name, binding);
  }

  // required for fixup-var-scope
  moveBinding(binding, toScope) {
    // console.log(
    //   "moving binding",
    //   binding.identifier.name,
    //   "to",
    //   toScope.path.type,
    //   "from",
    //   binding.scope.path.type
    // );
    this.bindings.get(binding.scope).delete(binding.identifier.name);
    this.bindings.get(toScope).set(binding.identifier.name, binding);
  }

  hasBinding(scope, name) {
    return this.bindings.get(scope).has(name);
  }

  renameBinding(scope, oldName, newName) {
    const bindings = this.bindings.get(scope);
    bindings.set(newName, bindings.get(oldName));
    bindings.delete(oldName);
  }
};
