const _getBindingIdentifiers = require("./get-binding-identifiers");
const CountedSet = require("./counted-set");

module.exports = ({ types: t, traverse }) => {
  const hop = Object.prototype.hasOwnProperty;
  const getBindingIdentifiers = _getBindingIdentifiers(t);

  class Mangler {
    constructor(charset, program, {
      blacklist = {},
      keepFnName = false,
      eval: _eval = false
    } = {}) {
      this.charset = charset;
      this.program = program;
      this.blacklist = blacklist;
      this.keepFnName = keepFnName;
      this.eval = _eval;

      this.unsafeScopes = new Set;
      this.visitedScopes = new Set;

      this.references = new Map;
      this.bindings = new Map;

      this.renamedNodes = new Set;
    }

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
        this.references.get(parent).add(name);

        // here binding is undefined for globals,
        // so we just add to all scopes up
        if (binding && binding.scope === parent) {
          break;
        }
      } while (parent = parent.parent);
    }

    hasReference(scope, name) {
      return this.references.get(scope).has(name);
    }

    canUseInReferencedScopes(binding, next) {
      const mangler = this;

      if (mangler.hasReference(binding.scope, next)) {
        return false;
      }

      for (let i = 0; i < binding.constantViolations.length; i++) {
        const violation = binding.constantViolations[i];
        if (mangler.hasReference(violation.scope, next)) {
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
              if (mangler.hasReference(path.scope, next)) {
                canUse = false;
              }
            }
          });
          if (!canUse) {
            return canUse;
          }
        } else if (!isLabelIdentifier(ref)) {
          if (mangler.hasReference(ref.scope, next)) {
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
      return this.bindings.get(scope).has(name);
    }

    renameBinding(scope, oldName, newName) {
      const bindings = this.bindings.get(scope);
      bindings.set(newName, bindings.get(oldName));
      bindings.delete(oldName);
    }

    run() {
      this.crawlScope();
      this.collect();
      this.charset.sort();
      this.mangle();
    }

    isBlacklist(name) {
      return hop.call(this.blacklist, name);
    }

    markUnsafeScopes(scope) {
      let evalScope = scope;
      do {
        this.unsafeScopes.add(evalScope);
      } while (evalScope = evalScope.parent);
    }

    crawlScope() {
      traverse.clearCache();
      this.program.scope.crawl();
    }

    collect() {
      const mangler = this;

      mangler.addScope(this.program.scope);

      const collectVisitor = {
        // capture direct evals
        CallExpression(path) {
          const callee = path.get("callee");

          if (callee.isIdentifier()
            && callee.node.name === "eval"
            && !callee.scope.getBinding("eval")
          ) {
            mangler.markUnsafeScopes(path.scope);
          }
        },
        Scopable({scope}) {
          mangler.addScope(scope);
          Object.keys(scope.bindings).forEach((name) => {
            mangler.addBinding(scope.bindings[name]);
          });
        },
        ReferencedIdentifier(path) {
          if (isLabelIdentifier(path)) return;
          const {scope, node: {name}} = path;
          const binding = scope.getBinding(name);
          mangler.addReference(scope, binding, name);
        },
        // this fixes a bug where converting let to var
        // doesn't change the binding's scope to function scope
        VariableDeclaration: {
          enter(path) {
            if (path.node.kind !== "var") {
              return;
            }
            const ids = path.getOuterBindingIdentifiers();
            const fnScope = path.scope.getFunctionParent();
            Object.keys(ids).forEach((id) => {
              let binding = path.scope.getBinding(id);

              if (binding.scope !== fnScope) {
                const existingBinding = fnScope.bindings[id];
                if (!existingBinding) {
                  // move binding to the function scope
                  fnScope.bindings[id] = binding;
                  binding.scope = fnScope;
                  delete binding.scope.bindings[id];
                } else {
                  // we need a new binding that's valid in both the scopes
                  // binding.scope and fnScope
                  const newName = fnScope.generateUid(binding.scope.generateUid(id));

                  // rename binding in the original scope
                  mangler.rename(binding.scope, binding, id, newName);

                  // move binding to fnScope as newName
                  fnScope.bindings[newName] = binding;
                  binding.scope = fnScope;
                  delete binding.scope.bindings[newName];
                }
              }
            });
          }
        },
        BindingIdentifier: {
          exit(path) {
            if (isLabelIdentifier(path)) return;
            const {scope, node: {name}} = path;
            let binding = scope.getBinding(name);
            if (!binding) {
              if (scope.hasGlobal(name)) return;
              throw new Error("binding not found " + name);
            }
            mangler.addBinding(binding);
          }
        }
      };

      if (this.charset.shouldConsider) {
        // charset considerations
        collectVisitor.Identifier = function Identifier(path) {
          const { node } = path;

          if ((path.parentPath.isMemberExpression({ property: node })) ||
              (path.parentPath.isObjectProperty({ key: node }))
          ) {
            mangler.charset.consider(node.name);
          }
        };

        // charset considerations
        collectVisitor.Literal = function Literal({ node }) {
          mangler.charset.consider(String(node.value));
        };
      }

      this.program.traverse(collectVisitor);
    }

    mangle() {
      const mangler = this;

      this.program.traverse({
        Scopable(path) {
          const {scope} = path;

          if (!mangler.eval && mangler.unsafeScopes.has(scope)) return;

          if (mangler.visitedScopes.has(scope)) return;
          mangler.visitedScopes.add(scope);

          let i = 0;
          function getNext() {
            return mangler.charset.getIdentifier(i++);
          }

          // This is useful when we have vars of single character
          // => var a, ...z, A, ...Z, $, _;
          // to
          // => var aa, a, b ,c;
          // instead of
          // => var aa, ab, ...;
          function resetNext() {
            i = 0;
          }

          const bindings = mangler.bindings.get(scope);
          const names = [...bindings.keys()];

          for (let i = 0; i < names.length; i++) {
            const oldName = names[i];
            const binding = bindings.get(oldName);

            if (
              // already renamed bindings
              binding.renamed
              // arguments
              || oldName === "arguments"
              // globals
              || mangler.program.scope.bindings[oldName] === binding
              // labels
              || binding.path.isLabeledStatement()
              // blacklisted
              || mangler.isBlacklist(oldName)
              // function names
              || (mangler.keepFnName ? isFunction(binding.path) : false)
            ) {
              continue;
            }

            let next;
            do {
              next = getNext();
            } while (
              !t.isValidIdentifier(next)
              || mangler.hasBinding(scope, next)
              || scope.hasGlobal(next)
              || mangler.hasReference(scope, next)
              || !mangler.canUseInReferencedScopes(binding, next)
            );

            resetNext();
            mangler.rename(scope, binding, oldName, next);
            // mark the binding as renamed
            binding.renamed = true;
          }
        }
      });
    }

    renameBindingIds(path, oldName, newName) {
      const bindingIds = getBindingIdentifiers(path, true, false);
      const names = Object.keys(bindingIds);
      let replace = [];

      for (let i = 0; i < names.length; i++) {
        if (names[i] !== oldName) continue;
        const idPath = bindingIds[names[i]];
        if (Array.isArray(idPath)) {
          replace = replace.concat(idPath);
        } else {
          replace.push(idPath);
        }
      }

      for (let i = 0; i < replace.length; i++) {
        const idPath = replace[i];
        this.renamedNodes.add(idPath.node);
        idPath.replaceWith(t.identifier(newName));
        this.renamedNodes.add(idPath.node);
      }
    }

    rename(scope, binding, oldName, newName) {
      const mangler = this;

      // rename at the declaration level
      // binding.identifier.name = newName;
      this.renameBindingIds(binding.path, oldName, newName);
      // update bindings map
      this.renameBinding(scope, oldName, newName);

      // update all constant violations & redeclarations
      const violations = binding.constantViolations;
      for (let i = 0; i < violations.length; i++) {
        if (!violations[i].isLabeledStatement()) {
          this.renameBindingIds(violations[i], oldName, newName);
        }
      }

      // update all referenced places
      const refs = binding.referencePaths;
      for (let i = 0; i < refs.length; i++) {
        const path = refs[i];
        const {node} = path;

        if (!path.isIdentifier()) {
          // Ideally, this should not happen
          // it happens in these places now -
          // case 1: Export Statements
          // This is a bug in babel
          // https://github.com/babel/babel/pull/3629
          // case 2: Replacements in other plugins
          // eg: https://github.com/babel/babili/issues/122
          // replacement in dce from `x` to `!x` gives referencePath as `!x`
          path.traverse({
            ReferencedIdentifier(refPath) {
              if (refPath.node.name !== oldName) {
                return;
              }
              const actualBinding = refPath.scope.getBinding(oldName);
              if (actualBinding !== binding) {
                return;
              }
              mangler.renamedNodes.add(refPath.node);
              refPath.replaceWith(t.identifier(newName));
              mangler.renamedNodes.add(refPath.node);

              mangler.updateReference(refPath.scope, binding, oldName, newName);
            }
          });
        } else if (!isLabelIdentifier(path)) {
          if (path.node.name === oldName) {
            mangler.renamedNodes.add(path.node);
            path.replaceWith(t.identifier(newName));
            mangler.renamedNodes.add(path.node);

            mangler.updateReference(path.scope, binding, oldName, newName);
          } else if (mangler.renamedNodes.has(path.node)) {
            // already renamed,
            // just update the references
            mangler.updateReference(path.scope, binding, oldName, newName);
          } else {
            throw new Error(
              `Unexpected Error - Trying to replace ${node.name}: from ${oldName} to ${newName}`
            );
          }
        }
        // else label
      }

      // update scope tracking
      const {bindings} = scope;
      bindings[newName] = binding;
      delete bindings[oldName];
    }
  }

  let mangler;
  return {
    name: "minify-mangle-names",
    visitor: {
      Program: {
        exit(path) {
          // If the source code is small then we're going to assume that the user
          // is running on this on single files before bundling. Therefore we
          // need to achieve as much determinisim and we will not do any frequency
          // sorting on the character set. Currently the number is pretty arbitrary.
          const shouldConsiderSource = path.getSource().length > 70000;

          const charset = new Charset(shouldConsiderSource);

          mangler = new Mangler(charset, path, this.opts);
          mangler.run();
        }
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

// for keepFnName
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration()
    || path.isClassExpression()
    || path.isClassDeclaration();
}

function isLabelIdentifier(path) {
  const {node} = path;
  return path.parentPath.isLabeledStatement({ label: node })
    || path.parentPath.isBreakStatement({ label: node })
    || path.parentPath.isContinueStatement({ label: node });
}
