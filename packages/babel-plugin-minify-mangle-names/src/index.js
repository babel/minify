const _getBindingIdentifiers = require("./get-binding-identifiers");

module.exports = ({ types: t }) => {
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
        this.references.set(scope, new Set);
        this.bindings.set(scope, new Map);
      }
    }

    updateScope(scope) {
      const mangler = this;
      scope.path.traverse({
        ReferencedIdentifier(path) {
          if (path.scope === scope) {
            const binding = scope.getBinding(path.node.name);
            mangler.addReference(scope, binding, path.node.name);
          }
        }
      });
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
      if (!this.references.has(scope)) {
        this.addScope(scope);
        this.updateScope(scope);
      }
      return this.references.get(scope).has(name);
    }

    canUseInReferencedScopes(binding, next) {
      const mangler = this;
      let canUse = true;

      binding.constantViolations.forEach((violation) => {
        if (mangler.hasReference(violation.scope, next)) {
          canUse = false;
        }
      });

      binding.referencePaths.forEach((ref) => {
        if (!ref.isIdentifier()) {
          ref.traverse({
            ReferencedIdentifier(path) {
              if (path.node.name !== next) {
                return;
              }
              const actualBinding = path.scope.getBinding(path.node.name);
              if (actualBinding !== binding) {
                return;
              }
              if (mangler.hasReference(path.scope, next)) {
                canUse = false;
              }
            }
          });
        } else {
          if (mangler.hasReference(ref.scope, next)) {
            canUse = false;
          }
        }
      });

      return canUse;
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

    addBinding(scope, binding) {
      if (!binding) {
        return ;
      }
      const bindings = this.bindings.get(scope);
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
      this.program.traverse({
        // this is to fix a bug where block scoping plugin
        // doesn't register new defintions
        Scopable(path) {
          path.scope.crawl();
        },
        // this fixes a bug where let to var doesnt change binding scope
        VariableDeclaration: {
          enter(path) {
            if (path.node.kind !== "var") {
              return;
            }
            const ids = path.getOuterBindingIdentifiers();
            Object.keys(ids).forEach((id) => {
              const binding = path.scope.getBinding(id);
              if (binding.scope !== path.scope.getFunctionParent()) {
                path.scope.moveBindingTo(id, path.scope.getFunctionParent());
              }
            });
          }
        }
      });
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
            mangler.addBinding(scope, scope.bindings[name]);
          });
        },
        ReferencedIdentifier(path) {
          const {scope, node: {name}} = path;
          const binding = scope.getBinding(name);
          mangler.addReference(scope, binding, name);
        },
        BindingIdentifier(path) {
          const {scope, node: {name}} = path;
          let binding = scope.bindings[name];
          if (!binding) {
            return;
          }
          mangler.addBinding(scope, binding);
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
          // const bindings = scope.bindings;
          // const names = Object.keys(bindings);

          for (let i = 0; i < names.length; i++) {
            const oldName = names[i];
            const binding = bindings.get(oldName);
            // const binding = bindings[oldName]

            if (
              // already renamed bindings
              binding.renamed
              // arguments
              || oldName === "arguments"
              // globals
              || mangler.program.scope.bindings[oldName] === binding
              // other scope bindings
              // || !scope.hasOwnBinding(oldName)
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
              // || hop.call(bindings, next)
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

    rename(scope, binding, oldName, newName) {
      const mangler = this;

      // rename at the declaration level
      // binding.identifier.name = newName;
      const bindingIds = getBindingIdentifiers(binding.path);

      Object.keys(bindingIds).forEach((id) => {
        if (id !== oldName) return;
        const path = bindingIds[id];
        path.replaceWith(t.identifier(newName));
      });

      this.renamedNodes.add(binding.identifier);

      const {bindings} = scope;
      bindings[newName] = binding;
      delete bindings[oldName];

      this.renameBinding(scope, oldName, newName);

      // update all constant violations & redeclarations
      const violations = binding.constantViolations;
      for (let i = 0; i < violations.length; i++) {
        if (violations[i].isLabeledStatement()) continue;

        // const bindings = violations[i].getOuterBindingIdentifiers();
        const ids = getBindingIdentifiers(violations[i]);

        Object.keys(ids).forEach((name) => {
          const path = ids[name];
          mangler.renamedNodes.add(path.node);
          path.replaceWith(t.identifier(newName));
          mangler.renamedNodes.add(path.node);

          mangler.updateReference(violations[i].scope, binding, oldName, newName);
        });

        // Object
        //   .keys(bindings)
        //   .map((b) => {
        //     if (bindings[b].name === oldName) {
        //       bindings[b] = t.identifier(newName);
        //       console.log(bindings[b].path);
        //       mangler.renamedNodes.add(bindings[b]);
        //       console.log("violation", oldName, newName, violations[i].node.type);
        //       mangler.updateReference(violations[i].scope, binding, oldName, newName, bindings[b]);
        //     }
        //   });
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
          if (node.name === oldName) {
            path.replaceWith(t.identifier(newName));
            mangler.renamedNodes.add(node);
            mangler.renamedNodes.add(path.node);

            mangler.updateReference(path.scope, binding, oldName, newName);
          } else if (mangler.renamedNodes.has(node)) {
            mangler.updateReference(path.scope, binding, oldName, newName);
          } else {
            throw new Error("but why?");
          }
        }
        // else label
      }
    }
  }

  let mangler;
  return {
    name: "minify-mangle-names",
    visitor: {
      Program: {
        enter() {
        },
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
