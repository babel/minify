const generate = require("babel-generator").default;

module.exports = ({ types: t }) => {
  const hop = Object.prototype.hasOwnProperty;

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
      this.updatedReferences = new Map;
    }

    addScope(scope) {
      if (!this.references.has(scope)) {
        this.references.set(scope, new Set);
        this.updatedReferences.set(scope, new Set);
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
      })
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
        // console.log("updating");
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
          })
        } else {
          if (mangler.hasReference(ref.scope, next)) {
            canUse = false;
          }
        }
      });

      return canUse;
    }

    updateRenamed(scope, binding, node) {
      let parent = scope;
      do {
        const updatedRefs = this.updatedReferences.get(parent);

        updatedRefs.add(node);

        // if (binding.scope === scope) {
        //   break;
        // }
      } while (parent = parent.parent);
    }

    updateReference(scope, binding, oldName, newName, node, path) {
      let parent = scope;
      do {
        if (!this.references.has(parent)) {
          this.addScope(parent);
          this.updateScope(parent);
        }

        // update
        const ref = this.references.get(parent);
        if (ref.has(oldName)) {
          // console.log("Rename", oldName, newName);
          ref.delete(oldName);
          ref.add(newName);
          // this.updateRenamed(scope, binding, node);
        } else {
          if (node.name === newName) {
            // console.log("already renamed");
            ref.add(newName);
            continue;
          }
          throw new Error("why - " + oldName);
        }

        if (binding.scope === parent) {
          break;
        }
      } while (parent = parent.parent);
    }

    run() {
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
        },
        ReferencedIdentifier(path) {
          const {scope, node: {name}} = path;
          const binding = scope.getBinding(name);
          mangler.addReference(scope, binding, name);
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

          const bindings = scope.bindings;
          const names = Object.keys(bindings);
          // console.log(names);
          // console.log(mangler.references.get(scope));

          for (let i = 0; i < names.length; i++) {
            const oldName = names[i];
            const binding = bindings[oldName];

            if (
              // already renamed bindings
              binding.renamed
              // arguments
              || oldName === "arguments"
              // globals
              || mangler.program.scope.bindings[oldName] === binding
              // other scope bindings
              || !scope.hasOwnBinding(oldName)
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
              if (mangler.hasReference(scope, next)) {
                // process.stdout.write(next + ",");
              }
            } while (
              !t.isValidIdentifier(next)
              || hop.call(bindings, next)
              || scope.hasGlobal(next)
              || mangler.hasReference(scope, next)
              || !mangler.canUseInReferencedScopes(binding, next)
            );
            // console.log("");

            resetNext();
            mangler.rename(scope, binding, oldName, next);
            // mark the binding as renamed
            binding.renamed = true;
            // console.log(mangler.references.get(scope));
          }
        }
      });
    }

    rename(scope, binding, oldName, newName) {
      // console.log("Renaming", oldName, newName);
      const mangler = this;

      // rename at the declaration level
      binding.identifier.name = newName;

      const {bindings} = scope;
      bindings[newName] = binding;
      delete bindings[oldName];

      // update all constant violations & redeclarations
      const violations = binding.constantViolations;
      for (let i = 0; i < violations.length; i++) {
        if (violations[i].isLabeledStatement()) continue;

        // console.log("Violation", violations[i].parentPath.type);

        const bindings = violations[i].getBindingIdentifiers();
        Object
          .keys(bindings)
          .map((b) => {
            if (bindings[b].name === oldName) {
              bindings[b].name = newName;
              // console.log("updating violation", oldName, newName);
              mangler.updateReference(violations[i].scope, binding, oldName, newName, bindings[b]);
            }
          });
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
              if (refPath.node.name === oldName && refPath.scope === scope) {
                refPath.node.name = newName;
                // console.log("updating deep traverse", oldName, newName);
                mangler.updateReference(refPath.scope, binding, oldName, newName, refPath.node);
              }
            }
          });
        } else if (!isLabelIdentifier(path) && node.name === oldName) {
          node.name = newName;
          // console.log("updating ideal case", oldName, newName);
          mangler.updateReference(path.scope, binding, oldName, newName, node, path);
        }
      }
    }
  }

  let mangler;
  return {
    name: "minify-mangle-names",
    visitor: {
      Program: {
        enter(path) {
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
