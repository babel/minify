const Renamer = require("./renamer");

module.exports = ({ types: t }) => {
  const hop = Object.prototype.hasOwnProperty;

  class Mangler {
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

      this.unsafeScopes = new Set;

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

      this.program.traverse({
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

        // charset considerations
        Identifier(path) {
          const { node } = path;

          if ((path.parentPath.isMemberExpression({ property: node })) ||
              (path.parentPath.isObjectProperty({ key: node }))
          ) {
            mangler.charset.consider(node.name);
          }
        },

        // charset considerations
        Literal({ node }) {
          mangler.charset.consider(String(node.value));
        }
      });
    }

    mangle() {
      const mangler = this;

      this.program.traverse({
        Scopable(path) {
          if (path.isProgram()) return;

          const {scope} = path;

          if (!mangler.eval && mangler.unsafeScopes.has(scope)) return;

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

          Object
            .keys(scope.getAllBindings())
            .filter((b) => {
              const binding = scope.getBinding(b);

              return scope.hasOwnBinding(b)
                && !binding.path.isLabeledStatement()
                && !binding.renamed
                && !mangler.isBlacklist(b, mangler.blacklist)
                && (mangler.keepFnames ? !isFunction(binding.path) : true);
            })
            .map((b) => {
              let next;
              do {
                next = getNext();
              } while (!t.isValidIdentifier(next) || scope.hasBinding(next) || scope.hasGlobal(next) || scope.hasReference(next));
              // TODO:
              // re-enable this
              // resetNext();
              mangler.rename(scope, b, next);
              scope.getBinding(next).renamed = true;
            });
        }
      });

      // TODO:
      // re-enable
      // check above
      // this.updateReferences();
    }

    rename(scope, oldName, newName) {
      const binding = scope.getBinding(oldName);
      if (!binding) {
        throw new Error("Binding not found - " + oldName);
      }
      new Renamer(binding, oldName, newName).rename();

      this.referencesToUpdate.set(oldName, {
        scope,
        referenced: false
      });
    }

    updateReferences() {
      var mangler = this;

      this.program.traverse({
        Identifier(path) {
          const { node } = path;
          if (
            path.parentPath.isMemberExpression({ property: node }) ||
            path.parentPath.isObjectProperty({key: node})
          ) return;

          mangler.referencesToUpdate.forEach((ref, oldName) => {
            if (node.name === oldName) {
              mangler.referencesToUpdate.get(oldName).referenced = true;
            }
          });
        }
      });

      this.referencesToUpdate.forEach((ref, oldName) => {
        if (ref.referenced) return;

        let current = ref.scope;
        do {
          current.references[oldName] = false;
        }
        while (current = current.parent);
      });
    }
  };

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

// for keepFnames
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration()
    || path.isClassExpression()
    || path.isClassDeclaration();
}
