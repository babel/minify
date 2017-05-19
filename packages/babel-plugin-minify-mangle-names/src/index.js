const Charset = require("./charset");
const ScopeTracker = require("./scope-tracker");
const isLabelIdentifier = require("./is-label-identifier");
const bfsTraverseCreator = require("./bfs-traverse");
const fixupVarScoping = require("./fixup-var-scoping");

const {
  markEvalScopes,
  isMarked: isEvalScopesMarked,
  hasEval
} = require("babel-helper-mark-eval-scopes");

module.exports = babel => {
  const { types: t, traverse } = babel;
  const bfsTraverse = bfsTraverseCreator(babel);
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
        topLevel = false
      } = {}
    ) {
      this.charset = charset;
      this.program = program;
      this.blacklist = toObject(blacklist);
      this.keepFnName = keepFnName;
      this.keepClassName = keepClassName;
      this.topLevel = topLevel;
      this.eval = _eval;

      this.visitedScopes = new Set();
      this.scopeTracker = new ScopeTracker();
      this.renamedNodes = new Set();
    }

    run() {
      this.crawlScope();
      this.collect();
      this.fixup();
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

    fixup() {
      fixupVarScoping(this);
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
          if (!binding) {
            if (scope.hasGlobal(name)) return;
            throw new Error("Something went wrong");
          } else {
            scopeTracker.addReference(scope, binding, name);
          }
        },

        BindingIdentifier(path) {
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
            throw new Error("binding not found " + name);
          }
          if (binding.identifier === path.node) {
            scopeTracker.addBinding(binding);
          } else {
            //constant violation
            // console.log("adding constant violation for ", name);
            scopeTracker.addReference(scope, binding, name);
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

      bfsTraverse(mangler.program, collectVisitor);
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
          // console.log(
          //   next,
          //   !t.isValidIdentifier(next),
          //   scopeTracker.hasBinding(scope, next),
          //   scope.hasGlobal(next),
          //   scopeTracker.hasReference(scope, next),
          //   !scopeTracker.canUseInReferencedScopes(binding, next)
          // );
        } while (
          !t.isValidIdentifier(next) ||
          scopeTracker.hasBinding(scope, next) ||
          scope.hasGlobal(next) ||
          scopeTracker.hasReference(scope, next) ||
          !scopeTracker.canUseInReferencedScopes(binding, next)
        );

        resetNext();

        // console.log("-----------------");
        // console.log("mangling", oldName, next);
        mangler.rename(scope, binding, oldName, next);
      }
    }

    mangle() {
      const mangler = this;

      bfsTraverse(this.program, {
        Scopable(path) {
          if (!path.isProgram() || mangler.topLevel)
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

        this.renameBindingIds(violations[i], oldName, newName);
        scopeTracker.updateReference(
          violations[i].scope,
          binding,
          oldName,
          newName
        );
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
            // console.log(
            //   "renaming ref in ",
            //   path.scope.path.type,
            //   oldName,
            //   newName
            // );

            scopeTracker.updateReference(path.scope, binding, oldName, newName);
          } else if (mangler.renamedNodes.has(path.node)) {
            // already renamed,
            // just update the references
            // throw new Error("Who is replacing again");
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
