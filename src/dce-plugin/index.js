'use strict';

const some = require('lodash.some');

module.exports = ({ Plugin, types: t }) => {
  const shouldRevisit = Symbol('shouldRevisit');

  const main = {
    // remove side effectless statement
    ExpressionStatement(path) {
      if (path.get('expression').isPure()) {
        if (!path.parentPath.isBlockStatement()) {
          path.replaceWith(t.emptyStatement());
        } else {
          path.remove();
        }
      }
    },

    Function: {

      // Let's take all the vars in a function that are not in the top level scope and hoist them
      // with the first var declaration in the top-level scope. This transform in itself may
      // not yield much returns (or even can be marginally harmful to size). However it's great
      // for taking away statements from blocks that can be only expressions which the `simplify`
      // plugin can turn into other things (e.g. if => conditional).
      exit(path) {
        // This hurts gzip size.
        if (!this.optimizeRawSize) {
          return;
        }

        const { node, scope } = path;
        const seen = new Set();
        const declars = [];
        const mutations = [];
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (!binding.path.isVariableDeclarator()) {
            continue;
          }

          const declarPath = binding.path.parentPath;
          if (seen.has(declarPath)) {
            continue;
          }
          seen.add(declarPath);

          if (declarPath.parentPath.isForInStatement()) {
            continue;
          }

          if (declarPath.parentPath.parentPath.isFunction()) {
            continue;
          }

          if (!declarPath.node || !declarPath.node.declarations) {
            continue;
          }

          const assignmentSequence = [];
          for (let declar of declarPath.node.declarations) {
            declars.push(declar);
            if (declar.init) {
              assignmentSequence.push(t.assignmentExpression('=', declar.id, declar.init));
              mutations.push(() => declar.init = null);
            }
          }

          if (assignmentSequence.length) {
            mutations.push(() => declarPath.replaceWith(t.sequenceExpression(assignmentSequence)));
          } else {
            mutations.push(() => declarPath.remove());
          }
        }

        if (declars.length) {
          mutations.forEach(f => f());
          for (let statement of node.body.body) {
            if (t.isVariableDeclaration(statement)) {
              statement.declarations.push(...declars);
             return;
            }
          }
          const varDecl = t.variableDeclaration('var', declars);
          node.body.body.unshift(varDecl);
        }
      },
    },

    // Remove bindings with no references.
    Scope: {
      exit(path) {
        if (path.node[shouldRevisit]) {
          delete path.node[shouldRevisit];
          path.visit();
        }
      },

      enter(path) {
        if (path.isProgram()) {
          return;
        }

        const { scope } = path;
        for (let name in scope.bindings) {
          let binding = scope.bindings[name];
          if (!binding.referenced && binding.kind !== 'param' && binding.kind !== 'module') {
            if (binding.path.isVariableDeclarator()) {
              if (binding.path.parentPath.parentPath &&
                binding.path.parentPath.parentPath.isForInStatement()
              ) {
                // Can't remove if in a for in statement `for (var x in wat)`.
                continue;
              }
            } else if (!scope.isPure(binding.path.node)) {
              continue;
            } else if (binding.path.isFunctionExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              continue;
            }

            const mutations = [];
            let bail = false;
            // Make sure none of the assignments value is used
            binding.constantViolations.forEach(p => {
              if (bail || p === binding.path) {
                return;
              }

              if (!p.parentPath.isExpressionStatement()) {
                bail = true;
              }

              if (p.isAssignmentExpression() && !p.get('right').isPure()) {
                mutations.push(() => p.replaceWith(p.get('right')));
              } else {
                mutations.push(() => p.remove());
              }
            });

            if (bail) {
              continue;
            }

            if (binding.path.isVariableDeclarator() && binding.path.node.init &&
              !scope.isPure(binding.path.node.init)
            ) {
              if (binding.path.parentPath.node.declarations.length !== 1) {
                continue;
              }

              binding.path.parentPath.replaceWith(binding.path.node.init);
            } else {
              updateReferences(binding.path, this);
              binding.path.remove();
            }

            mutations.forEach(f => f());
            scope.removeBinding(name);
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
                    updateReferences(binding.path, this);
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

              if (binding.referencePaths.length > 1) {
                throw new Error('Expected only one reference');
              }

              let parent = binding.path.parent;
              if (t.isVariableDeclaration(parent)) {
                parent = binding.path.parentPath.parent;
              }

              const refPath = binding.referencePaths[0];

              // 1. Make sure we share the parent with the node. In other words it's lexically defined
              // and not in an if statement or otherwise.
              // 2. If the replacement is an object then we have to make sure we are not in a loop or a function
              // because otherwise we'll be inlining and doing a lot more allocation than we have to
              // which would also could affect correctness in that they are not the same reference.
              let mayLoop = false;
              const sharesRoot = refPath.find(({ node }) => {
                if (!mayLoop) {
                  mayLoop = t.isWhileStatement(node) || t.isFor(node) || t.isFunction(node);
                }
                return node === parent;
              });

              // Anything that inherits from Object.
              const isObj = (n) => t.isFunction(n) || t.isObjectExpression(n) || t.isArrayExpression(n);
              const isReplacementObj = isObj(replacement) || some(replacement, isObj);

              if (!sharesRoot || (isReplacementObj && mayLoop)) {
                continue;
              }

              const replaced = replace(binding.referencePaths[0], {
                binding,
                scope,
                replacement,
              });

              if (replaced) {
                scope.removeBinding(name);
                if (binding.path.node) {
                  binding.path.remove();
                }
              }
            }
          }
        }
      },
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

    // Double check unreachable code and remove return statements that
    // have no semantic meaning
    ReturnStatement(path) {
      const { node } = path;
      if (!path.inList) {
        return;
      }

      // Not last in it's block? (See BlockStatement visitor)
      if (path.container.length - 1 !== path.key &&
          !path.getSibling(path.key + 1).isFunctionDeclaration() &&
          path.parentPath.isBlockStatement()
      ) {
        // This is probably a new oppurtinity by some other transform
        // let's call the block visitor on this again before proceeding.
        path.parentPath.pushContext(path.context);
        path.parentPath.visit();
        path.parentPath.popContext();

        return;
      }

      if (node.argument) {
        return;
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

    ConditionalExpression(path) {
      const { node } = path;
      const evaluateTest = path.get('test').evaluateTruthy();
      if (evaluateTest === true) {
        path.replaceWith(node.consequent);
      } else if (evaluateTest === false) {
        path.replaceWith(node.alternate);
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

    // Join assignment and definition when in sequence.
    // var x; x = 1; -> var x = 1;
    AssignmentExpression(path) {
      if (!path.get('left').isIdentifier() ||
          !path.parentPath.isExpressionStatement()
      ) {
        return;
      }

      const prev = path.parentPath.getSibling(path.parentPath.key - 1);
      if (!(prev && prev.isVariableDeclaration())) {
        return;
      }

      const declars = prev.node.declarations;
      if (declars.length !== 1 || declars[0].init ||
          declars[0].id.name !== path.get('left').node.name
      ) {
        return;
      }
      declars[0].init = path.node.right;
      path.remove();
    },

    // Remove named function expression name. While this is dangerous as it changes
    // `function.name` all minifiers do it and hence became a standard.
    FunctionExpression(path) {
      const id = path.get('id').node;
      if (!id) {
        return;
      }

      const { node, scope } = path;

      const binding = scope.getBinding(id.name);

      // Check if shadowed or is not referenced.
      if (binding.path.node !== node || !binding.referenced) {
        node.id = null;
      }
    },

    // Put the `var` in the left if feasible.
    ForInStatement(path) {
      const left = path.get('left');
      if (!left.isIdentifier()) {
        return;
      }

      const binding = path.scope.getBinding(left.node.name);
      if (binding.scope.getFunctionParent() !== path.scope.getFunctionParent()) {
        return;
      }

      if (!binding.path.isVariableDeclarator()) {
        return;
      }

      // If it has company then it's probably more efficient to keep.
      if (binding.path.parent.declarations.length > 1) {
        return;
      }

      // meh
      if (binding.path.node.init) {
        return;
      }

      binding.path.remove();
      path.node.left = t.variableDeclaration('var', [t.variableDeclarator(left.node)]);
    },
  };

  return {
    visitor: {
      Program(path) {
        // We need to run this plugin in isolation.
        path.traverse(main, { functionToBindings: new Map(), optimizeRawSize: this.opts.optimizeRawSize });
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

  function replace(path, options) {
    const { replacement, scope, binding } = options;

    // Same name, different binding.
    if (scope.getBinding(path.node.name) !== binding) {
      return;
    }

    if (t.isIdentifier(replacement) &&
        path.scope.getBinding(replacement.name) !== scope.getBinding(replacement.name)
    ) {
      return;
    }

    // Don't want to put functions in loops in stuff.
    if ((t.isClass(replacement) || t.isFunction(replacement))
        && scope !== path.scope) {
          return;
    }

    // Avoid recursion.
    if (path.find(({ node }) => node === replacement)) {
      return;
    }

    t.toExpression(replacement);

    // This changes `function.name` but all the other minifier
    // do it :/
    if (t.isFunction(replacement)) {
      replacement.id = null;
    }

    path.replaceWith(replacement);
    return true;
  }

  function updateReferences(fnToDeletePath) {
    if (!fnToDeletePath.isFunction()) {
      return;
    }

    fnToDeletePath.traverse({
      ReferencedIdentifier(path) {
        const { node, scope } = path;
        const binding = scope.getBinding(node.name);

        if (!binding || !binding.path.isFunction() || binding.scope === scope || !binding.constant) {
          return;
        }

        let index = binding.referencePaths.indexOf(path);
        if (index === -1) {
          return;
        }
        binding.references--;
        binding.referencePaths.splice(index, 1);
        if (binding.references === 0) {
          binding.referenced = false;
        }

        if (binding.references <= 1) {
          binding.scope.path.node[shouldRevisit] = true;
        }
      },
    });
  }
};
