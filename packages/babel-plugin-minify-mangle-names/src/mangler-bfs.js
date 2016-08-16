module.exports = class ManglerBfs {
  // TEMPORARY `t`
  constructor(charset, program, {
    blacklist = {},
    keepFnames = false,
    eval: _eval = false
  } = {}, t) {
    this.charset = charset;
    this.program = program;
    this.blacklist = blacklist;
    this.keepFnames = keepFnames;
    this.eval = _eval;
    // TODO:
    // babel-types
    this.t = t;

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
    const t = this.t;

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
        function resetNext() {
          i = 0;
        }

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
            } while (!t.isValidIdentifier(next) || scope.hasBinding(next) || scope.hasGlobal(next));
            // TODO: hasReference in the above check
            resetNext();
            mangler.rename(scope, b, next);
            scope.getBinding(next).renamed = true;
          });
      }
    });
  }

  idPaths(binding) {
    const idPaths = new Set;

    binding
      .constantViolations
      .map((path) => {
        const {node} = path;
        if (path.isVariableDeclarator()) {
          idPaths.add(path.get("id"));
        }
      })

    binding
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
      })
      .map((path) => {
        idPaths.add(path);
      })
    return [...idPaths];
  }

  rename(scope, oldName, newName) {
    const binding = scope.getBinding(oldName);
    const idPaths = this.idPaths(binding);

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
