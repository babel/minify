module.exports = ({ types: t }) => {
  const hop = Object.prototype.hasOwnProperty;

  class Mangler {
    constructor(charset, program, {
      blacklist = {},
      keepFnName = false,
      keepClassName = false,
      eval: _eval = false
    } = {}) {
      this.charset = charset;
      this.program = program;
      this.blacklist = blacklist;
      this.keepFnName = keepFnName;
      this.keepClassName = keepClassName;
      this.eval = _eval;

      this.unsafeScopes = new Set;
      this.visitedScopes = new Set;

      this.referencesToUpdate = new Map;
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
          // TODO:
          // Re-enable after enabling this feature
          // This doesn't work right now as we are concentrating
          // on performance improvements
          // function resetNext() {
          //   i = 0;
          // }

          const bindings = scope.getAllBindings();
          const names = Object.keys(bindings);

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
              // class names
              || (mangler.keepClassName ? isClass(binding.path) : false)
            ) {
              continue;
            }

            let next;
            do {
              next = getNext();
            } while (
              !t.isValidIdentifier(next)
              || hop.call(bindings, next)
              || scope.hasGlobal(next)
              || scope.hasReference(next)
            );

            // TODO:
            // re-enable this - check above
            // resetNext();
            mangler.rename(scope, oldName, next);
            // mark the binding as renamed
            binding.renamed = true;
          }
        }
      });

      // TODO:
      // re-enable
      // check above
      // this.updateReferences();
    }

    rename(scope, oldName, newName) {
      const binding = scope.getBinding(oldName);

      // rename at the declaration level
      binding.identifier.name = newName;

      const {bindings} = scope;
      bindings[newName] = binding;
      delete bindings[oldName];

      // update all constant violations & redeclarations
      const violations = binding.constantViolations;
      for (let i = 0; i < violations.length; i++) {
        if (violations[i].isLabeledStatement()) continue;

        const bindings = violations[i].getBindingIdentifiers();
        Object
          .keys(bindings)
          .map((b) => {
            bindings[b].name = newName;
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
              }
            }
          });
        } else if (!isLabelIdentifier(path)) {
          node.name = newName;
        }
      }
    }
  }

  return {
    name: "minify-mangle-names",
    visitor: {
      Program(path) {
        // If the source code is small then we're going to assume that the user
        // is running on this on single files before bundling. Therefore we
        // need to achieve as much determinisim and we will not do any frequency
        // sorting on the character set. Currently the number is pretty arbitrary.
        const shouldConsiderSource = path.getSource().length > 70000;

        const charset = new Charset(shouldConsiderSource);

        const mangler = new Mangler(charset, path, this.opts);
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

// for keepFnName
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration();
}

// for keepClassName
function isClass(path) {
  return path.isClassExpression()
    || path.isClassDeclaration();
}

function isLabelIdentifier(path) {
  const {node} = path;
  return path.parentPath.isLabeledStatement({ label: node })
    || path.parentPath.isBreakStatement({ label: node })
    || path.parentPath.isContinueStatement({ label: node });
}
