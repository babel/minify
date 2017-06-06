"use strict";

const CountedSet = require("./counted-set");
const isLabelIdentifier = require("./is-label-identifier");

const newIssueUrl = "https://github.com/babel/babili/issues/new";

/**
 * ScopeTracker
 *   references: Map<Scope, CountedSet<String> >
 *   bindings: Map<Scope, Map<String, Binding> >
 */
module.exports = class ScopeTracker {
  constructor() {
    this.references = new Map();
    this.bindings = new Map();
  }

  /**
   * Register a new Scope and initiliaze it with empty sets
   * @param {Scope} scope
   */
  addScope(scope) {
    if (!this.references.has(scope)) {
      this.references.set(scope, new CountedSet());
    }
    if (!this.bindings.has(scope)) {
      this.bindings.set(scope, new Map());
    }
  }

  /**
   * Add reference to all Scopes between and including the ReferencedScope
   * and Binding's Scope
   * @param {Scope} scope
   * @param {Binding} binding
   * @param {String} name
   */
  addReference(scope, binding, name) {
    let parent = scope;
    do {
      this.references.get(parent).add(name);
      if (!binding) {
        throw new Error(
          `Binding Not Found for ${name} during scopeTracker.addRefernce. ` +
            `Please report at ${newIssueUrl}`
        );
      }
      if (binding.scope === parent) break;
    } while ((parent = parent.parent));
  }

  /**
   * has a Reference in the given {Scope} or a child Scope
   *
   * Refer {addReference} to know why the following call will be valid
   * for detecting references in child Scopes
   *
   * @param {Scope} scope
   * @param {String} name
   */
  hasReference(scope, name) {
    return this.references.get(scope).has(name);
  }

  /**
   * Update reference count in all scopes between and including the
   * Referenced Scope and the Binding's Scope
   *
   * @param {Scope} scope
   * @param {Binding} binding
   * @param {String} oldName
   * @param {String} newName
   */
  updateReference(scope, binding, oldName, newName) {
    let parent = scope;
    do {
      const ref = this.references.get(parent);

      ref.delete(oldName);
      ref.add(newName);

      if (!binding) {
        // Something went wrong - panic
        throw new Error(
          "Binding Not Found during scopeTracker.updateRefernce " +
            `while updating "${oldName}" to "${newName}". ` +
            `Please report at ${newIssueUrl}`
        );
      }

      if (binding.scope === parent) break;
    } while ((parent = parent.parent));
  }

  /**
   * has either a Binding or a Reference
   * @param {Scope} scope
   * @param {Binding} binding
   * @param {String} name
   */
  hasBindingOrReference(scope, binding, name) {
    return this.hasReference(scope, name) || this.hasBinding(scope, name);
  }

  /**
   * For a Binding visit all places where the Binding is used and detect
   * if the newName {next} can be used in all these places
   *
   * 1. binding's own scope
   * 2. constant violations' scopes
   * 3. referencePaths' scopes
   *
   * @param {Binding} binding
   * @param {String} next
   */
  canUseInReferencedScopes(binding, next) {
    const tracker = this;

    if (tracker.hasBindingOrReference(binding.scope, binding, next)) {
      return false;
    }

    // Safari raises a syntax error for a `let` or `const` declaration in a
    // `for` loop initialization that shadows a parent function's parameter.
    // https://github.com/babel/babili/issues/559
    // https://bugs.webkit.org/show_bug.cgi?id=171041
    // https://trac.webkit.org/changeset/217200/webkit/trunk/Source
    const isBlockScoped = binding.kind === "let" || binding.kind === "const";
    const isForLoopDeclaration =
      (binding.path.parentPath.parent.type === "ForStatement" &&
        binding.path.parentPath.key === "init") ||
      (binding.path.parentPath.parent.type === "ForInStatement" &&
        binding.path.parentPath.key === "left") ||
      (binding.path.parentPath.parent.type === "ForOfStatement" &&
        binding.path.parentPath.key === "left");
    if (isBlockScoped && isForLoopDeclaration) {
      const functionParentScope = binding.scope.getFunctionParent();
      const isIncorrectlyTopLevelInSafari =
        binding.scope.parent === functionParentScope;
      if (isIncorrectlyTopLevelInSafari) {
        const parentFunctionBinding = this.bindings
          .get(functionParentScope)
          .get(next);
        if (parentFunctionBinding) {
          const parentFunctionHasParamBinding =
            parentFunctionBinding.kind === "param";
          if (parentFunctionHasParamBinding) {
            return false;
          }
        }
      }
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

  /**
   * Add a binding to Tracker in binding's own Scope
   * @param {Binding} binding
   */
  addBinding(binding) {
    if (!binding) {
      return;
    }

    const bindings = this.bindings.get(binding.scope);
    const existingBinding = bindings.get(binding.identifier.name);

    if (existingBinding && existingBinding !== binding) {
      throw new Error(
        `scopeTracker.addBinding: ` +
          `Binding "${existingBinding.identifier.name}" already exists. ` +
          `Trying to add "${binding.identifier.name}" again.`
      );
    }

    bindings.set(binding.identifier.name, binding);
  }

  /**
   * Moves Binding from it's own Scope to {toScope}
   *
   * required for fixup-var-scope
   *
   * @param {Binding} binding
   * @param {Scope} toScope
   */
  moveBinding(binding, toScope) {
    this.bindings.get(binding.scope).delete(binding.identifier.name);
    this.bindings.get(toScope).set(binding.identifier.name, binding);
  }

  /**
   * has a Binding in the current {Scope}
   * @param {Scope} scope
   * @param {String} name
   */
  hasBinding(scope, name) {
    return this.bindings.get(scope).has(name);
  }

  /**
   * Update the ScopeTracker on rename
   * @param {Scope} scope
   * @param {String} oldName
   * @param {String} newName
   */
  renameBinding(scope, oldName, newName) {
    const bindings = this.bindings.get(scope);
    bindings.set(newName, bindings.get(oldName));
    bindings.delete(oldName);
  }
};
