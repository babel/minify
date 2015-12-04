'use strict';

module.exports = ({ Plugin, types: t }) => {

  const removeReferenceVisitor = {
    ReferencedIdentifier(path) {
      if (!this.bindingsToReplace[path.node.name]) {
        return;
      }

      const { replacement, markReplaced, scope } = this.bindingsToReplace[path.node.name];

      if ((t.isClass(replacement) || t.isFunction(replacement))
          && scope !== path.scope) {
        return;
      }

      if (path.find(({ node }) => node === replacement)) {
        return;
      }

      t.toExpression(replacement);
      path.replaceWith(replacement);
      markReplaced();
    },
  };

  const main = {
    // remove side effectless statement
    ExpressionStatement(path) {
      if (path.get('expression').isPure() && !path.isCompletionRecord()) {
        path.remove();
      }
    },

    // Remove bindings with no references.
    Scope(path) {
      if (path.isProgram()) {
        return;
      }

      const { scope } = path;
      const bindingsToReplace = Object.create(null);

      for (let name in scope.bindings) {
        let binding = scope.bindings[name];

        if (!binding.referenced && binding.kind !== 'param' && binding.kind !== 'module') {
          if (binding.path.isVariableDeclarator()) {

            // Can't remove if in a for in statement `for (var x in wat)`.
            if (binding.path.parentPath.parentPath && binding.path.parentPath.parentPath.isForInStatement()) {
              continue;
            }

            if (binding.path.node.init && !scope.isPure(binding.path.node.init)) {
              if (binding.path.parentPath.node.declarations.length === 1) {
                binding.path.parentPath.replaceWith(binding.path.node.init);
                scope.removeBinding(name);
              }
              continue;
            }
          } else if (!scope.isPure(binding.path.node)) {
            continue;
          } else if (binding.path.isFunctionExpression()) {
            // `bar(function foo() {})` foo is not referenced but it's used.
            continue;
          }
          scope.removeBinding(name);
          binding.path.remove();
        } else if (binding.constant) {
          if (binding.path.isFunctionDeclaration() ||
              (binding.path.isVariableDeclarator() && binding.path.get('init').isFunction())) {
                const fun = binding.path.isFunctionDeclaration() ? binding.path : binding.path.get('init');
                let allInside = true;
                for (let ref of binding.referencePaths) {
                  if (!ref.find(p => p.node === fun.node)) {
                    allInside = false;
                    break;
                  }
                }

                if (allInside) {
                  scope.removeBinding(name);
                  binding.path.remove();
                  continue;
                }
          }

          if (binding.references === 1 && binding.kind !== 'param' && binding.kind !== 'module' && binding.constant) {
            let replacement = binding.path.node;
            if (t.isVariableDeclarator(replacement)) {
              replacement = replacement.init;
            }
            if (!replacement) {
              continue;
            }

            if (!scope.isPure(replacement, true)) {
              continue;
            }

            bindingsToReplace[name] = {
              scope,
              replacement,
              markReplaced() {
                scope.removeBinding(name);
                if (binding.path.node) {
                  binding.path.remove();
                }
              },
            };
          }
        }
      }
      if (Object.keys(bindingsToReplace).length) {
        path.traverse(removeReferenceVisitor, {bindingsToReplace});
      }
    },

    // Remove unreachable code.
    BlockStatement(path) {
      const paths = path.get('body');

      let purge = false;

      for (let i = 0; i < paths.length; i++) {
        const p = paths[i];

        if (!purge && p.isCompletionStatement()) {
          purge = true;
          continue;
        }

        if (purge && !p.isFunctionDeclaration()) {
          p.remove();
        }
      }
    },

    // Remove return statements that have no semantic meaning
    ReturnStatement(path) {
      const { node } = path;
      if (node.argument || !path.inList) {
        return;
      }

      // Not last in it's block? (See BlockStatement visitor)
      if (path.container.length - 1 !== path.key) {
        throw new Error('Unexpected dead code');
      }

      let noNext = true;
      let parentPath = path.parentPath;
      while (parentPath && !parentPath.isFunction() && noNext) {
        const nextPath = parentPath.getSibling(parentPath.key + 1);
        if (nextPath.node) {
          if (nextPath.isReturnStatement()) {
            nextPath.pushContext(path.context);
            nextPath.visit();
            nextPath.popContext();
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
        path.remove();
      }
    },

    IfStatement: {
      exit(path) {
        const { node } = path;
        let { consequent, alternate, test } = node;

        const evaluateTest = path.get('test').evaluateTruthy();

        // we can check if a test will be truthy 100% and if so then we can inline
        // the consequent and completely ignore the alternate
        //
        //   if (true) { foo; } -> { foo; }
        //   if ("foo") { foo; } -> { foo; }
        //
        if (evaluateTest === true) {
          path.replaceWithMultiple(toStatements(consequent));
          return;
        }

        // we can check if a test will be falsy 100% and if so we can inline the
        // alternate if there is one and completely remove the consequent
        //
        //   if ("") { bar; } else { foo; } -> { foo; }
        //   if ("") { bar; } ->
        //
        if (evaluateTest === false) {
          if (alternate) {
            path.replaceWithMultiple(toStatements(alternate));
            return;
          } else {
            path.remove();
          }
        }

        // remove alternate blocks that are empty
        //
        //   if (foo) { foo; } else {} -> if (foo) { foo; }
        //
        if (t.isBlockStatement(alternate) && !alternate.body.length) {
          alternate = node.alternate = null;
        }

        // if the consequent block is empty turn alternate blocks into a consequent
        // and flip the test
        //
        //   if (foo) {} else { bar; } -> if (!foo) { bar; }
        //

        if (t.isBlockStatement(consequent) && !consequent.body.length &&
            t.isBlockStatement(alternate) && alternate.body.length
        ) {
          node.consequent = node.alternate;
          node.alternate = null;
          node.test = t.unaryExpression('!', test, true);
        }
      },
    },
  };

  return {
    visitor: {
      Program(path) {
        // We need to run this plugin in isolation.
        path.traverse(main, {});
      },
    },
  };

  function toStatements(node) {
    if (t.isBlockStatement(node)) {
      let hasBlockScoped = false;

      for (let i = 0; i < node.body.length; i++) {
        let bodyNode = node.body[i];
        if (t.isBlockScoped(bodyNode)) {
          hasBlockScoped = true;
        }
      }

      if (!hasBlockScoped) {
        return node.body;
      }
    }
    return node;
  }
};
