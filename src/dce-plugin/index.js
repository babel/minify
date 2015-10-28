'use strict';

module.exports = ({ Plugin, types: t }) => {

  return new Plugin('dce', {
    metadata: {
      group: 'builtin-pre',
    },

    visitor: {
      // remove side effectless statement
      ExpressionStatement: function () {
        if (this.get('expression').isPure() && !this.isCompletionRecord()) {
          this.dangerouslyRemove();
        }
      },

      ReferencedIdentifier: function ReferencedIdentifier(node, parent, scope) {
        const binding = scope.getBinding(node.name);
        if (!binding || binding.references > 1 || !binding.constant ||
            bindingIsParam(binding) || binding.kind === 'module') {
              return;
        }

        const bindingPath = getBindingPath(binding);

        let replacement = bindingPath.node;
        if (t.isVariableDeclarator(replacement)) {
          replacement = replacement.init;
        }
        if (!replacement) {
          return;
        }

        // ensure it's a "pure" type
        if (!scope.isPure(replacement, true)) {
          return;
        }

        // don't change this if it's in a different scope, this can be bad
        // for performance since it may be inside a loop or deeply nested in
        // hot code
        if ((t.isClass(replacement) || t.isFunction(replacement))
            && bindingPath.scope.parent && bindingPath.scope.parent !== scope) {
              return;
        }

        if (this.findParent(path => path.node === replacement)) {
          return;
        }

        t.toExpression(replacement);
        scope.removeBinding(node.name);
        bindingPath.dangerouslyRemove();
        return replacement;
      },

      // Remove bindings with no references.
      Scope(node, parent, scope) {
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (!binding.referenced && !bindingIsParam(binding) && binding.kind !== 'module') {
            scope.removeBinding(name);
            let path = getBindingPath(binding);
            if (path.isVariableDeclarator()) {
              if (!scope.isPure(path.node.init)) {
                continue;
              }
            } else if (!scope.isPure(path.node)) {
              continue;
            } else if (path.isFunctionExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              continue;
            }
            path.dangerouslyRemove();
          }
        }
      },

      // Remove unreachable code.
      BlockStatement() {
        const paths = this.get('body');

        let purge = false;

        for (let i = 0; i < paths.length; i++) {
          let path = paths[i];

          if (!purge && path.isCompletionStatement()) {
            purge = true;
            continue;
          }

          if (purge && !path.isFunctionDeclaration()) {
            path.dangerouslyRemove();
          }
        }
      },

      // Remove return statements that have no semantic meaning
      ReturnStatement(node, parent, scope) {
        if (node.argument || !this.inList) {
          return;
        }

        // Not last in it's block? (See BlockStatement visitor)
        if (this.container.length - 1 !== this.key) {
          throw new Error('Unexpected dead code');
        }

        let noNext = true;
        let parentPath = this.parentPath;
        while (parentPath && !parentPath.isFunction() && noNext) {
          const nextPath = parentPath.getSibling(parentPath.key + 1);
          if (nextPath.node) {
            if (nextPath.isReturnStatement()) {
              nextPath.unshiftContext(this.context);
              nextPath.visit();
              nextPath.shiftContext();
              if (parentPath.getSibling(parentPath.key + 1).node) {
                noNext = false;
                break;
              }
            } else {
              noNext = false;
              break;
            }
          }

          parentPath = parentPath.parentPath;
        }

        if (noNext) {
          this.dangerouslyRemove();
        }
      },
    },
  });
};

// Babel regression: https://github.com/babel/babel/issues/2615
function getBindingPath(binding) {
  return binding.path.parentPath && binding.path.parentPath.isFunctionDeclaration() ?
         binding.path.parentPath : binding.path;
}

// Babel regression: https://github.com/babel/babel/issues/2617
function bindingIsParam(b) {
  if (b.kind === 'param') {
    return true;
  }

  if (!b.path.node) {
    return true;
  }

  if (b.path.parentPath && b.path.parentPath.isFunction()) {
    return b.path.parentPath.node.params.indexOf(b.path.node) > -1;
  }

  return false;
}
