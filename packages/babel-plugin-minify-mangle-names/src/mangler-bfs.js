module.exports = class ManglerBfs {
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
  }

  run() {
    this.collect();
    this.charset.sort();
    this.mangle();
  }

  isBlacklist(name) {
    return Object.prototype.hasOwnProperty.call(this.blacklist, name);
  }

  collect() {
    const mangler = this;
    const evalPaths = new Set;

    this.program.traverse({
      // capture direct evals
      CallExpression(path) {
        const callee = path.get("callee");
        if (callee.isIdentifier()
          && callee.node.name === "eval"
          && !callee.scope.hasBinding("eval")
          && !callee.scope.hasGlobal("eval")
        ) {
          // Direct eval
          evalPaths.add(path);
          mangler.markUnsafeScopes(path.scope);
        }
      },

      // capture indirect evals - (1, eval)("foo")
      // charset considerations
      Identifier(path) {
        if (path.node.name === "eval"
          && !path.scope.hasBinding("eval")
          && !path.scope.hasGlobal("eval")
          && !evalPaths.has(path)
        ) {
          // indirect eval
          mangler.markUnsafeScopes(mangler.program);
        }

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
      },

      // capture new Function
      // similar to indirect eval - access to global scope
      NewExpression(path) {
        const callee = path.get("callee");
        if (callee.isIdentifier() && callee.node.name === "Function") {
          // new Function() - global scope accessible
          mangler.markUnsafeScopes(mangler.program);
        }
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

        Object
          .keys(scope.getAllBindings())
          .filter((b) => scope.hasOwnBinding(b))
          .filter((b) => !scope.getBinding(b).path.isLabeledStatement())
          .filter((b) => !mangler.isBlacklist(b, mangler.blacklist))
          .filter((b) => {
            // function names
            if (!mangler.keepFnames) return true;
            const binding = scope.getBinding(b);
            if (!binding) {
              throw new Error("Unexpected Error. Binding not found - " + b);
            }
            return !isFunction(binding.path);
          })
          .filter((b) => !scope.getBinding(b).renamed)
          .map((b) => {
            let next;
            do {
              next = getNext();
            } while (scope.hasBinding(next) || scope.hasGlobal(next) || scope.hasReference(next));
            scope.rename(b, next);
            scope.getBinding(next).renamed = true;
          });
      }
    });
  }
};

// for keepFnames
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration()
    || path.isClassExpression()
    || path.isClassDeclaration();
}

