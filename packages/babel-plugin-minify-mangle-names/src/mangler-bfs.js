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

  markUnsafeScopes(scope) {
    let evalScope = scope;
    do {
      this.unsafeScopes.add(evalScope);
    } while (evalScope = evalScope.parent);
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
          && !callee.scope.getBinding("eval")
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
        // TODO:
        // Not effective as references are not yet removed when a binding
        // is removed. Find a work around

        // This is useful when we have vars of single character
        // => var a, ...z, A, ...Z, $, _;
        // to
        // => var aa, a, b ,c;
        // instead of
        // => var aa, ab, ...;
        function resetNext() {
          i = 0;
        }

        Object
          .keys(scope.getAllBindings())
          .filter((b) => scope.hasOwnBinding(b))
          .filter((b) => !scope.getBinding(b).path.isLabeledStatement())
          .filter((b) => !scope.getBinding(b).renamed)
          .filter((b) => !mangler.isBlacklist(b, mangler.blacklist))
          .filter((b) => {
            // function names
            if (!mangler.keepFnames) return true;
            return !isFunction(scope.getBinding(b).path);
          })
          .map((b) => {
            let next;
            do {
              next = getNext();
            } while (scope.hasBinding(next) || scope.hasGlobal(next));
            // TODO: enable reset (DONE)
            resetNext();
            mangler.rename(scope, b, next);
            scope.getBinding(next).renamed = true;
          });
      }
    });
  }

  idPaths(scope, name) {
    const binding = scope.getBinding(name);
    return binding
      .referencePaths
      .filter((path) => {
        const {node} = path;
        if (!path.isIdentifier()) {
          throw new Error("Unhandled Case - Reference will not be mangled");
        }
        return !(
          path.parentPath.isLabeledStatement({ label: node }) ||
          path.parentPath.isBreakStatement({ label: node }) ||
          path.parentPath.isContinueStatement({ label: node })
        );
      });
  }

  rename(scope, oldName, newName) {
    const idPaths = this.idPaths(scope, oldName);
    const binding = scope.getBinding(oldName);

    // rename the binding at declaration place
    binding.identifier.name = newName;

    // update scope tracking
    const {bindings} = scope;
    delete bindings[oldName];
    bindings[newName] = binding;

    // rename all its references
    for (let i = 0; i < idPaths.length; i++) {
      idPaths[i].node.name = newName;
    }
  }
};

// for keepFnames
function isFunction(path) {
  return path.isFunctionExpression()
    || path.isFunctionDeclaration()
    || path.isClassExpression()
    || path.isClassDeclaration();
}

