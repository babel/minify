"use strict";

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

const newIssueUrl = "https://github.com/babel/minify/issues/new";

module.exports = babel => {
  const { types: t, traverse } = babel;
  const bfsTraverse = bfsTraverseCreator(babel);
  const hop = Object.prototype.hasOwnProperty;

  class Mangler {
    constructor(
      charset,
      program,
      {
        exclude = {},
        keepFnName = false,
        keepClassName = false,
        eval: _eval = false,
        topLevel = false
      } = {}
    ) {
      this.charset = charset;
      this.program = program;

      // user passed options
      this.exclude = toObject(exclude);
      this.keepFnName = keepFnName;
      this.keepClassName = keepClassName;
      this.topLevel = topLevel;
      this.eval = _eval;

      // tracking
      this.visitedScopes = new Set();
      this.scopeTracker = new ScopeTracker();
      this.renamedNodes = new Set();
    }

    /**
     * Run the mangler
     */
    run() {
      this.crawlScope();
      this.collect();
      this.fixup();
      this.charset.sort();
      this.mangle();
    }

    /**
     * Tells if a variable name is excluded
     * @param {String} name
     */
    isExcluded(name) {
      return hop.call(this.exclude, name) && this.exclude[name];
    }

    /**
     * Clears traverse cache and recrawls the AST
     *
     * to recompute the bindings, references, other scope information
     * and paths because the other transformations in the same pipeline
     * (other plugins and presets) changes the AST and does NOT update
     * the scope objects
     */
    crawlScope() {
      (traverse.clearCache || traverse.cache.clear)();
      this.program.scope.crawl();
    }

    /**
     * Re-crawling comes with a side-effect that let->var conversion
     * reverts the update of the binding information (block to fn scope).
     * This function takes care of it by updating it again.
     *
     * TODO: This is unnecessary work and needs to be fixed in babel.
     * https://github.com/babel/babel/issues/4818
     *
     * When this is removed, remember to remove fixup's dependency in
     * ScopeTracker
     */
    fixup() {
      fixupVarScoping(this);
    }

    /**
     * A single pass through the AST to collect info for
     *
     * 1. Scope Tracker
     * 2. Unsafe Scopes (direct eval scopes)
     * 3. Charset considerations for better gzip compression
     *
     * Traversed in the same fashion(BFS) the mangling is done
     */
    collect() {
      const mangler = this;
      const { scopeTracker } = mangler;

      scopeTracker.addScope(this.program.scope);

      /**
       * Same usage as in DCE, whichever runs first
       */
      if (!isEvalScopesMarked(mangler.program)) {
        markEvalScopes(mangler.program);
      }

      /**
       * The visitors to be used in traversal.
       *
       * Note: BFS traversal supports only the `enter` handlers, `exit`
       * handlers are simply dropped without Errors
       *
       * Collects items defined in the ScopeTracker
       */
      const collectVisitor = {
        Scopable({ scope }) {
          scopeTracker.addScope(scope);

          // Collect bindings defined in the scope
          Object.keys(scope.bindings).forEach(name => {
            scopeTracker.addBinding(scope.bindings[name]);

            // add all constant violations as references
            scope.bindings[name].constantViolations.forEach(() => {
              scopeTracker.addReference(scope, scope.bindings[name], name);
            });
          });
        },

        /**
         * This is required because after function name transformation
         * plugin (part of es2015), the function name is NOT added to the
         * scope's bindings. So to fix this issue, we simply add a hack to
         * handle that case - fix it to the scope tree.
         *
         * Related:
         * - https://github.com/babel/minify/issues/829
         */
        BindingIdentifier(path) {
          if (
            // the parent has this id as the name
            (path.parentPath.isFunctionExpression({ id: path.node }) ||
              path.parentPath.isClassExpression({ id: path.node })) &&
            // and the id isn't yet added to the scope
            !hop.call(path.parentPath.scope.bindings, path.node.name)
          ) {
            path.parentPath.scope.registerBinding("local", path.parentPath);
          }
        },

        /**
         * This is necessary because, in Babel, the scope.references
         * does NOT contain the references in that scope. Only the program
         * scope (top most level) contains all the references.
         *
         * We collect the references in a fashion where all the scopes between
         * and including the referenced scope and scope where it is declared
         * is considered as scope referencing that identifier
         */
        ReferencedIdentifier(path) {
          if (isLabelIdentifier(path)) {
            return;
          }
          const {
            scope,
            node: { name }
          } = path;
          const binding = scope.getBinding(name);
          if (!binding) {
            // Do not collect globals as they are already available via
            // babel's API
            if (scope.hasGlobal(name)) {
              return;
            }
            // This should NOT happen ultimately. Panic if this code block is
            // reached
            throw new Error(
              `Binding not found for ReferencedIdentifier "${name}" ` +
                `present in "${path.parentPath.type}". ` +
                `Please report this at ${newIssueUrl}`
            );
          } else {
            // Add it to our scope tracker if everything is fine
            scopeTracker.addReference(scope, binding, name);
          }
        }
      };

      /**
       * These visitors are for collecting the Characters used in the program
       * to measure the frequency and generate variable names for mangling so
       * as to improve the gzip compression - as gzip likes repetition
       */
      if (this.charset.shouldConsider) {
        collectVisitor.Identifier = function Identifer(path) {
          const { node } = path;

          // We don't mangle properties, so we collect them as they contribute
          // to the frequency of characters
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

      // Traverse the AST
      bfsTraverse(mangler.program, collectVisitor);
    }

    /**
     * Tells if a binding is exported as a NamedExport - so as to NOT mangle
     *
     * Babel treats NamedExports as a binding referenced by this NamedExport decl
     * @param {Binding} binding
     */
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

    /**
     * Mangle the scope
     * @param {Scope} scope
     */
    mangleScope(scope) {
      const mangler = this;
      const { scopeTracker } = mangler;

      // Unsafe Scope
      if (!mangler.eval && hasEval(scope)) {
        return;
      }

      // Already visited
      // This is because for a function, in Babel, the function and
      // the function body's BlockStatement has the same scope, and will
      // be visited twice by the Scopable handler, and we want to mangle
      // it only once
      if (mangler.visitedScopes.has(scope)) {
        return;
      }
      mangler.visitedScopes.add(scope);

      // Helpers to generate names
      let i = 0;
      function getNext() {
        return mangler.charset.getIdentifier(i++);
      }
      function resetNext() {
        i = 0;
      }

      const bindings = scopeTracker.bindings.get(scope);
      const names = [...bindings.keys()];

      /**
       * 1. Iterate through the list of BindingIdentifiers
       * 2. Rename each of them in-place
       * 3. Update the scope tree.
       */
      for (let i = 0; i < names.length; i++) {
        const oldName = names[i];
        const binding = bindings.get(oldName);

        // Names which should NOT be mangled
        if (
          // arguments - for non-strict mode
          oldName === "arguments" ||
          // labels
          binding.path.isLabeledStatement() ||
          // ClassDeclaration has binding in two scopes
          //   1. The scope in which it is declared
          //   2. The class's own scope
          (binding.path.isClassDeclaration() && binding.path === scope.path) ||
          // excluded
          mangler.isExcluded(oldName) ||
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

        // Reset so variables which are removed can be reused
        resetNext();

        // Once we detected a valid `next` Identifier which could be used,
        // call the renamer
        mangler.rename(scope, binding, oldName, next);
      }
    }

    /**
     * The mangle function that traverses through all the Scopes in a BFS
     * fashion - calls mangleScope
     */
    mangle() {
      const mangler = this;

      bfsTraverse(this.program, {
        Scopable(path) {
          if (!path.isProgram() || mangler.topLevel)
            mangler.mangleScope(path.scope);
        }
      });
    }

    /**
     * Given a NodePath, collects all the Identifiers which are BindingIdentifiers
     * and replaces them with the new name
     *
     * For example,
     *   var a = 1, { b } = c; // a and b are BindingIdentifiers
     *
     * @param {NodePath} path
     * @param {String} oldName
     * @param {String} newName
     * @param {Function} predicate
     */
    renameBindingIds(path, oldName, newName, predicate = () => true) {
      const bindingIds = path.getBindingIdentifierPaths(true, false);
      for (const name in bindingIds) {
        if (name !== oldName) continue;
        for (const idPath of bindingIds[name]) {
          if (predicate(idPath)) {
            idPath.node.name = newName;
            // babel-7 don't requeue
            // idPath.replaceWith(t.identifier(newName));
            this.renamedNodes.add(idPath.node);
          }
        }
      }
    }

    /**
     * The Renamer:
     * Renames the following for one Binding in a Scope
     *
     * 1. Binding in that Scope
     * 2. All the Binding's constant violations
     * 3. All its References
     * 4. Updates mangler.scopeTracker
     * 5. Updates Babel's Scope tracking
     *
     * @param {Scope} scope
     * @param {Binding} binding
     * @param {String} oldName
     * @param {String} newName
     */
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

      // update mangler's ScopeTracker
      scopeTracker.renameBinding(scope, oldName, newName);

      // update all constant violations
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
          // eg: https://github.com/babel/minify/issues/122
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

              refPath.node.name = newName;
              // babel-7 don't requeue
              // refPath.replaceWith(t.identifier(newName));
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
            path.node.name = newName;

            // babel-7 don't requeue
            // path.replaceWith(t.identifier(newName));
            mangler.renamedNodes.add(path.node);
            scopeTracker.updateReference(path.scope, binding, oldName, newName);
          } else if (mangler.renamedNodes.has(path.node)) {
            // already renamed,
            // just update the references
            scopeTracker.updateReference(path.scope, binding, oldName, newName);
          } else {
            throw new Error(
              `Unexpected Rename Error: ` +
                `Trying to replace "${
                  node.name
                }": from "${oldName}" to "${newName}". ` +
                `Please report it at ${newIssueUrl}`
            );
          }
        }
        // else label identifier - silently ignore
      }

      // update babel's internal tracking
      binding.identifier.name = newName;

      // update babel's internal scope tracking
      const { bindings } = scope;
      bindings[newName] = binding;
      delete bindings[oldName];
    }
  }

  return {
    name: "minify-mangle-names",
    visitor: {
      /**
       * Mangler is run as a single pass. It's the same pattern as used in DCE
       */
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
