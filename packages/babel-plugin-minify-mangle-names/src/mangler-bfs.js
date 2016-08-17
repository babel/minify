const Renamer = require("./renamer");
const t = require("babel-types");

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
    // this.renamedScopes = new Set;

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

        // if (mangler.renamedScopes.has(scope)) {
        //   return;
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
            resetNext();
            mangler.rename(scope, b, next);
            scope.getBinding(next).renamed = true;
          });

        // set the current scope as renamed own bindings
        // mangler.renamedScopes.add(scope);

        // Recalculate scope tracking
        // Solves the issues when used with block scoping plugin
        // scope.crawl();
      }
    });
  }

  rename(scope, oldName, newName) {
    const binding = scope.getBinding(oldName);
    if (!binding) {
      throw new Error("Binding not found - " + oldName);
    }
    new Renamer(binding, oldName, newName).rename();
    this.updateReferences(scope, oldName, newName);
  }

  updateReferences(scope, oldName, newName) {
    let referenced = false;

    // probably really slow
    this.program.traverse({
      Identifier(path) {
        const {node} = path;
        if (!path.parentPath.isMemberExpression({ property: node })
          && !path.parentPath.isObjectProperty({key: node})
          && node.name === oldName
        ) {
          referenced = true;
        }
      }
    });

    if (!referenced) {
      let current = scope;
      do {
        current.references[oldName] = false;
      } while (current = current.parent);
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
