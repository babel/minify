const Charset = require("./charset");
const ScopeTracker = require("./scope-tracker");
const isLabelIdentifier = require("./is-label-identifier");

const {
  markEvalScopes,
  isMarked: isEvalScopesMarked,
  hasEval
} = require("babel-helper-mark-eval-scopes");

module.exports = ({ types: t, traverse }) => {
  const hop = Object.prototype.hasOwnProperty;

  class Mangler {
    constructor(
      charset,
      program,
      {
        blacklist = {},
        keepFnName = false,
        keepClassName = false,
        eval: _eval = false,
        topLevel = false,
        reuse = true
      } = {}
    ) {
      this.charset = charset;
      this.program = program;
      this.blacklist = toObject(blacklist);
      this.keepFnName = keepFnName;
      this.keepClassName = keepClassName;
      this.topLevel = topLevel;
      this.eval = _eval;
      this.reuse = reuse;

      this.visitedScopes = new Set();
      this.scopeTracker = new ScopeTracker({ reuse });
      this.renamedNodes = new Set();
    }

    run() {
      this.crawlScope();
      this.collect();
      this.charset.sort();
      this.mangle();
    }

    isBlacklist(name) {
      return hop.call(this.blacklist, name) && this.blacklist[name];
    }

    crawlScope() {
      traverse.clearCache();
      this.program.scope.crawl();
    }

    collect() {
      const mangler = this;
      const { scopeTracker } = mangler;

      scopeTracker.addScope(this.program.scope);

      if (!isEvalScopesMarked(mangler.program.scope)) {
        markEvalScopes(mangler.program);
      }

      const collectVisitor = {
        Scopable({ scope }) {
          scopeTracker.addScope(scope);
          Object.keys(scope.bindings).forEach(name => {
            scopeTracker.addBinding(scope.bindings[name]);
          });
        },
        ReferencedIdentifier(path) {
          if (isLabelIdentifier(path)) return;
          const { scope, node: { name } } = path;
          const binding = scope.getBinding(name);
          scopeTracker.addReference(scope, binding, name);
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
            Object.keys(ids).forEach(id => {
              const binding = path.scope.getBinding(id);

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
                  const newName = fnScope.generateUid(
                    binding.scope.generateUid(id)
                  );

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
            const { scope, node: { name } } = path;
            const binding = scope.getBinding(name);
            if (!binding) {
              if (scope.hasGlobal(name)) return;
              if (
                path.parentPath.isExportSpecifier() &&
                path.parentKey === "exported"
              ) {
                return;
              }
              console.log(scope.globals);
              throw new Error("binding not found " + name);
            }
            scopeTracker.addBinding(binding);
          }
        }
      };

      if (this.charset.shouldConsider) {
        collectVisitor.Identifier = function Identifer(path) {
          const { node } = path;

          if (
            path.parentPath.isMemberExpression({ property: node }) ||
            path.parentPath.isObjectProperty({ key: node })
          ) {
            mangler.charset.consider(node.name);
          }
        };
        collectVisitor.Literal = function Literal({ node }) {
          mangler.charset.consider(String(node.value));
        };
      }

      mangler.program.traverse(collectVisitor);
    }

    isExportedWithName(binding) {
      // short circuit
      if (!this.topLevel) {
        return false;
      }

      const refs = binding.referencePaths;

      for (const ref of refs) {
        if (ref.isExportNamedDeclaration()) {
          return true;
        }
      }

      // default
      return false;
    }

    mangleScope(scope) {
      const mangler = this;
      const { scopeTracker } = mangler;

      if (!mangler.eval && hasEval(scope)) return;

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

      const bindings = scopeTracker.bindings.get(scope);
      const names = [...bindings.keys()];

      for (let i = 0; i < names.length; i++) {
        const oldName = names[i];
        const binding = bindings.get(oldName);

        if (
          // arguments
          oldName === "arguments" ||
          // labels
          binding.path.isLabeledStatement() ||
          // ClassDeclaration has binding in two scopes
          //   1. The scope in which it is declared
          //   2. The class's own scope
          // - https://github.com/babel/babel/issues/5156
          (binding.path.isClassDeclaration() && binding.path === scope.path) ||
          // blacklisted
          mangler.isBlacklist(oldName) ||
          // function names
          (mangler.keepFnName ? isFunction(binding.path) : false) ||
          // class names
          (mangler.keepClassName ? isClass(binding.path) : false) ||
          // named export
          mangler.isExportedWithName(binding)
        ) {
          continue;
        }

        let next;
        do {
          next = getNext();
        } while (
          !t.isValidIdentifier(next) ||
          scopeTracker.hasBinding(scope, next) ||
          scope.hasGlobal(next) ||
          scopeTracker.hasReference(scope, next) ||
          !scopeTracker.canUseInReferencedScopes(binding, next)
        );

        if (mangler.reuse) {
          resetNext();
        }
        mangler.rename(scope, binding, oldName, next);
      }
    }

    mangle() {
      const mangler = this;

      if (mangler.topLevel) {
        mangler.mangleScope(this.program.scope);
      }

      this.program.traverse({
        Scopable(path) {
          mangler.mangleScope(path.scope);
        }
      });
    }

    renameBindingIds(path, oldName, newName, predicate = () => true) {
      const bindingIds = path.getBindingIdentifierPaths(true, false);
      for (const name in bindingIds) {
        if (name !== oldName) continue;
        for (const idPath of bindingIds[name]) {
          if (predicate(idPath)) {
            this.renamedNodes.add(idPath.node);
            idPath.replaceWith(t.identifier(newName));
            this.renamedNodes.add(idPath.node);
          }
        }
      }
    }

    rename(scope, binding, oldName, newName) {
      const mangler = this;
      const { scopeTracker } = mangler;

      // rename at the declaration level
      this.renameBindingIds(
        binding.path,
        oldName,
        newName,
        idPath => idPath.node === binding.identifier
      );

      // update Tracking
      scopeTracker.renameBinding(scope, oldName, newName);

      // update all constant violations & redeclarations
      const violations = binding.constantViolations;
      for (let i = 0; i < violations.length; i++) {
        if (violations[i].isLabeledStatement()) continue;

        // const bindings = violations[i].getBindingIdentifierPaths();
        // Object.keys(bindings).map(b => {
        //   if (b === oldName && !bindings[b][PATH_RENAME_MARKER]) {
        //     bindings[b].replaceWith(t.identifier(newName));
        //     bindings[b][PATH_RENAME_MARKER] = true;
        //   }
        // });

        this.renameBindingIds(violations[i], oldName, newName);
      }

      // update all referenced places
      const refs = binding.referencePaths;
      for (let i = 0; i < refs.length; i++) {
        const path = refs[i];

        const { node } = path;

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

              scopeTracker.updateReference(
                refPath.scope,
                binding,
                oldName,
                newName
              );
            }
          });
        } else if (!isLabelIdentifier(path)) {
          if (path.node.name === oldName) {
            mangler.renamedNodes.add(path.node);
            path.replaceWith(t.identifier(newName));
            mangler.renamedNodes.add(path.node);

            scopeTracker.updateReference(path.scope, binding, oldName, newName);
          } else if (mangler.renamedNodes.has(path.node)) {
            // already renamed,
            // just update the references
            scopeTracker.updateReference(path.scope, binding, oldName, newName);
          } else {
            throw new Error(
              `Unexpected Error - Trying to replace ${node.name}: from ${oldName} to ${newName}`
            );
          }
        }
        // else label
      }

      // update babel's scope tracking
      const { bindings } = scope;
      bindings[newName] = binding;
      delete bindings[oldName];
    }
  }

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

          const mangler = new Mangler(charset, path, this.opts);
          mangler.run();
        }
      }
    }
  };
};

// convert value to object
function toObject(value) {
  if (!Array.isArray(value)) {
    return value;
  }

  const map = {};
  for (let i = 0; i < value.length; i++) {
    map[value[i]] = true;
  }
  return map;
}

// for keepFnName
function isFunction(path) {
  return path.isFunctionExpression() || path.isFunctionDeclaration();
}

// for keepClassName
function isClass(path) {
  return path.isClassExpression() || path.isClassDeclaration();
}
