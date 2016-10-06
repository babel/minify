"use strict";

const some = require("lodash.some");

module.exports = ({ types: t, traverse }) => {
  const removeOrVoid = require("babel-helper-remove-or-void")(t);
  const shouldRevisit = Symbol("shouldRevisit");

  const main = {
    // remove side effectless statement
    ExpressionStatement(path) {
      if (path.get("expression").isPure()) {
        removeOrVoid(path);
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
              assignmentSequence.push(t.assignmentExpression("=", declar.id, declar.init));
              mutations.push(() => { declar.init = null; });
            }
          }

          if (assignmentSequence.length) {
            mutations.push(() => declarPath.replaceWith(t.sequenceExpression(assignmentSequence)));
          } else {
            mutations.push(() => removeOrVoid(declarPath));
          }
        }

        if (declars.length) {
          mutations.forEach((f) => f());
          for (let statement of node.body.body) {
            if (t.isVariableDeclaration(statement)) {
              statement.declarations.push(...declars);
              return;
            }
          }
          const varDecl = t.variableDeclaration("var", declars);
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
          if (!binding.referenced && binding.kind !== "param" && binding.kind !== "module") {
            if (binding.path.isVariableDeclarator()) {
              if (binding.path.parentPath.parentPath &&
                binding.path.parentPath.parentPath.isForInStatement()
              ) {
                // Can't remove if in a for in statement `for (var x in wat)`.
                continue;
              }
            } else if (!scope.isPure(binding.path.node)) {
              continue;
            } else if (binding.path.isFunctionExpression() || binding.path.isClassExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              continue;
            }

            const mutations = [];
            let bail = false;
            // Make sure none of the assignments value is used
            binding.constantViolations.forEach((p) => {
              if (bail || p === binding.path) {
                return;
              }

              if (!p.parentPath.isExpressionStatement()) {
                bail = true;
              }

              if (p.isAssignmentExpression() && !p.get("right").isPure()) {
                mutations.push(() => p.replaceWith(p.get("right")));
              } else {
                mutations.push(() => removeOrVoid(p));
              }
            });

            if (bail) {
              continue;
            }

            if (binding.path.isVariableDeclarator() && binding.path.node.init &&
              !scope.isPure(binding.path.node.init) &&
              binding.path.parentPath.node.declarations
            ) {
              if (binding.path.parentPath.node.declarations.length !== 1) {
                continue;
              }

              binding.path.parentPath.replaceWith(binding.path.node.init);
            } else {
              updateReferences(binding.path, this);
              removeOrVoid(binding.path);
            }

            mutations.forEach((f) => f());
            scope.removeBinding(name);
          } else if (binding.constant) {
            if (binding.path.isFunctionDeclaration() ||
                (binding.path.isVariableDeclarator() && binding.path.get("init").isFunction())) {
              const fun = binding.path.isFunctionDeclaration() ? binding.path : binding.path.get("init");
              let allInside = true;
              for (let ref of binding.referencePaths) {
                if (!ref.find((p) => p.node === fun.node)) {
                  allInside = false;
                  break;
                }
              }

              if (allInside) {
                scope.removeBinding(name);
                updateReferences(binding.path, this);
                removeOrVoid(binding.path);
                continue;
              }
            }

            if (binding.references === 1 && binding.kind !== "param" && binding.kind !== "module" && binding.constant) {
              let replacement = binding.path.node;
              let replacementPath = binding.path;
              if (t.isVariableDeclarator(replacement)) {
                replacement = replacement.init;
                // Bail out for ArrayPattern and ObjectPattern
                // TODO: maybe a more intelligent approach instead of simply bailing out
                if (!replacementPath.get("id").isIdentifier()) {
                  continue;
                }
                replacementPath = replacementPath.get("init");
              }
              if (!replacement) {
                continue;
              }

              if (!scope.isPure(replacement, true)) {
                continue;
              }

              if (binding.referencePaths.length > 1) {
                throw new Error("Expected only one reference");
              }

              let bail = false;
              const refPath = binding.referencePaths[0];

              if (replacementPath.isIdentifier()) {
                bail = refPath.scope.getBinding(replacement.name) !== scope.getBinding(replacement.name);
              } else {
                replacementPath.traverse({
                  Function(path) {
                    path.skip();
                  },

                  ReferencedIdentifier({ node }) {
                    if (bail) {
                      return;
                    }
                    bail = refPath.scope.getBinding(node.name) !== scope.getBinding(node.name);
                  },
                });
              }

              if (bail) {
                continue;
              }

              let parent = binding.path.parent;
              if (t.isVariableDeclaration(parent)) {
                parent = binding.path.parentPath.parent;
              }


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
                  removeOrVoid(binding.path);
                }
              }
            }
          }
        }
      },
    },

    // Remove unreachable code.
    BlockStatement(path) {
      const paths = path.get("body");

      let purge = false;

      for (let i = 0; i < paths.length; i++) {
        const p = paths[i];

        if (!purge && p.isCompletionStatement()) {
          purge = true;
          continue;
        }

        if (purge && !canExistAfterCompletion(p)) {
          removeOrVoid(p);
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
          !canExistAfterCompletion(path.getSibling(path.key + 1)) &&
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
        removeOrVoid(path);
      }
    },

    ConditionalExpression(path) {
      const { node } = path;
      const evaluateTest = path.get("test").evaluateTruthy();
      if (evaluateTest === true) {
        path.replaceWith(node.consequent);
      } else if (evaluateTest === false) {
        path.replaceWith(node.alternate);
      }
    },

    IfStatement: {
      exit(path) {
        const consequent = path.get("consequent");
        const alternate = path.get("alternate");
        const test = path.get("test");

        const evaluateTest = test.evaluateTruthy();

        // we can check if a test will be truthy 100% and if so then we can inline
        // the consequent and completely ignore the alternate
        //
        //   if (true) { foo; } -> { foo; }
        //   if ("foo") { foo; } -> { foo; }
        //
        if (evaluateTest === true) {
          path.replaceWithMultiple(
            [...toStatements(consequent), ...extractVars(alternate)]
          );
          return;
        }

        // we can check if a test will be falsy 100% and if so we can inline the
        // alternate if there is one and completely remove the consequent
        //
        //   if ("") { bar; } else { foo; } -> { foo; }
        //   if ("") { bar; } ->
        //
        if (evaluateTest === false) {
          if (alternate.node) {
            path.replaceWithMultiple(
              [...toStatements(alternate), ...extractVars(consequent)]
            );
            return;
          } else {
            path.replaceWithMultiple(extractVars(consequent));
          }
        }

        // remove alternate blocks that are empty
        //
        //   if (foo) { foo; } else {} -> if (foo) { foo; }
        //
        if (alternate.isBlockStatement() && !alternate.node.body.length) {
          alternate.remove();
          // For if-statements babel-traverse replaces with an empty block
          path.node.alternate = null;
        }

        // if the consequent block is empty turn alternate blocks into a consequent
        // and flip the test
        //
        //   if (foo) {} else { bar; } -> if (!foo) { bar; }
        //
        if (consequent.isBlockStatement() && !consequent.node.body.length &&
            alternate.isBlockStatement() && alternate.node.body.length
        ) {
          consequent.replaceWith(alternate.node);
          alternate.remove();
          // For if-statements babel-traverse replaces with an empty block
          path.node.alternate = null;
          test.replaceWith(t.unaryExpression("!", test.node, true));
        }
      },
    },

    SwitchStatement: {
      exit(path) {
        const evaluated = path.get("discriminant").evaluate();

        if (!evaluated.confident) return;

        const discriminant = evaluated.value;
        const cases = path.get("cases");

        let matchingCaseIndex = -1;
        let defaultCaseIndex = -1;

        for (let i = 0; i < cases.length; i++) {
          const test = cases[i].get("test");

          // handle default case
          if (test.node === null) {
            defaultCaseIndex = i;
            continue;
          }

          const testResult = test.evaluate();

          // if we are not able to deternine a test during
          // compile time, we terminate immediately
          if (!testResult.confident) return;

          if (testResult.value === discriminant) {
            matchingCaseIndex = i;
            break;
          }
        }

        let result;

        if (matchingCaseIndex === -1) {
          if (defaultCaseIndex === -1) {
            path.skip();
            path.replaceWithMultiple(extractVars(path));
            return;
          } else {
            result = getStatementsUntilBreak(defaultCaseIndex);
          }
        } else {
          result = getStatementsUntilBreak(matchingCaseIndex);
        }

        if (result.bail) return;

        // we extract vars from the entire switch statement
        // and there will be duplicates which
        // will be again removed by DCE
        replaceSwitch([...extractVars(path), ...result.statements]);

        function getStatementsUntilBreak(start) {
          const result = {
            bail: false,
            statements: []
          };

          for (let i = start; i < cases.length; i++) {
            const consequent = cases[i].get("consequent");

            for (let j = 0; j < consequent.length; j++) {
              let _isBreaking = isBreaking(consequent[j], path);
              if (_isBreaking.bail) {
                result.bail = true;
                return result;
              }
              if (_isBreaking.break) {
                // compute no more
                // exit out of the loop
                return result;
              } else {
                result.statements.push(consequent[j].node);
              }
            }
          }

          return result;
        }

        function replaceSwitch(statements) {
          let isBlockRequired = false;

          for (let i = 0; i < statements.length; i++) {
            if (t.isVariableDeclaration(statements[i], { kind: "let" })) {
              isBlockRequired = true;
              break;
            }
            if (t.isVariableDeclaration(statements[i], { kind: "const" })) {
              isBlockRequired = true;
              break;
            }
          }

          if (isBlockRequired) {
            path.replaceWith(t.BlockStatement(statements));
          } else {
            path.replaceWithMultiple(statements);
          }
        }
      }
    },

    WhileStatement(path) {
      const test = path.get("test");
      const result = test.evaluate();
      if (result.confident && !result.value) {
        path.remove();
      }
    },

    ForStatement(path) {
      const test = path.get("test");
      const result = test.evaluate();
      if (result.confident) {
        if (result.value) {
          test.remove();
        } else {
          path.remove();
        }
      }
    },

    DoWhileStatement(path) {
      const test = path.get("test");
      const result = test.evaluate();
      if (result.confident && !result.value) {
        path.replaceWith(path.get("body").node);
      }
    },

    // Join assignment and definition when in sequence.
    // var x; x = 1; -> var x = 1;
    AssignmentExpression(path) {
      if (!path.get("left").isIdentifier() ||
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
          declars[0].id.name !== path.get("left").node.name
      ) {
        return;
      }
      declars[0].init = path.node.right;
      removeOrVoid(path);
    },

    // Remove named function expression name. While this is dangerous as it changes
    // `function.name` all minifiers do it and hence became a standard.
    "FunctionExpression|ClassExpression"(path) {
      if (!this.keepFnames) {
        removeUnreferencedId(path);
      }
    },

    // Put the `var` in the left if feasible.
    ForInStatement(path) {
      const left = path.get("left");
      if (!left.isIdentifier()) {
        return;
      }

      const binding = path.scope.getBinding(left.node.name);
      if (!binding) {
        return;
      }

      if (binding.scope.getFunctionParent() !== path.scope.getFunctionParent()) {
        return;
      }

      if (!binding.path.isVariableDeclarator()) {
        return;
      }

      if (binding.path.parentPath.parentPath.isForInStatement({ left: binding.path.parent })) {
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

      removeOrVoid(binding.path);
      path.node.left = t.variableDeclaration("var", [t.variableDeclarator(left.node)]);
      binding.path = path.get("left").get("declarations")[0];
    },
  };

  return {
    name: "minify-dead-code-elimination",
    visitor: {
      Program(path, {
        opts: {
          // set defaults
          optimizeRawSize = false,
          keepFnames = false
        } = {}
      } = {}) {
        // We need to run this plugin in isolation.
        path.traverse(main, {
          functionToBindings: new Map(),
          optimizeRawSize,
          keepFnames
        });
      },
    },
  };

  function toStatements(path) {
    const {node} = path;
    if (path.isBlockStatement()) {
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
    return [node];
  }

  // Extracts vars from a path
  // Useful for removing blocks or paths that can contain
  // variable declarations inside them
  // Note:
  // drops are inits
  // extractVars({ var x = 5, y = x }) => var x, y;
  function extractVars(path) {
    let declarators = [];

    if (path.isVariableDeclaration({ kind: "var" })) {
      for (let decl of path.node.declarations) {
        declarators.push(t.variableDeclarator(decl.id));
      }
    } else {
      path.traverse({
        VariableDeclaration(varPath) {
          if (!varPath.isVariableDeclaration({ kind: "var" })) return;
          if (!isSameFunctionScope(varPath, path)) return;

          for (let decl of varPath.node.declarations) {
            declarators.push(t.variableDeclarator(decl.id));
          }
        }
      });
    }

    if (declarators.length <= 0) return [];

    return [t.variableDeclaration("var", declarators)];
  }

  function replace(path, options) {
    const { replacement, scope, binding } = options;

    // Same name, different binding.
    if (scope.getBinding(path.node.name) !== binding) {
      return;
    }

    // We don't want to move code around to different scopes because:
    // 1. Original bindings that is referenced could be shadowed
    // 2. Moving defintions to potentially hot code is bad
    if (scope !== path.scope) {
      if (t.isClass(replacement) || t.isFunction(replacement)) {
        return;
      }

      let bail = false;
      traverse(replacement, {
        Function(path) {
          if (bail) {
            return;
          }
          bail = true;
          path.stop();
        },
      }, scope);

      if (bail) {
        return;
      }
    }

    // Avoid recursion.
    if (path.find(({ node }) => node === replacement)) {
      return;
    }

    // https://github.com/babel/babili/issues/130
    if (!t.isExpression(replacement)) {
      t.toExpression(replacement);
    }

    // We don't remove fn name here, we let the FnExpr & ClassExpr visitors
    // check its references and remove unreferenced ones
    // if (t.isFunction(replacement)) {
    //   replacement.id = null;
    // }

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

        if (binding.references <= 1 && binding.scope.path.node) {
          binding.scope.path.node[shouldRevisit] = true;
        }
      },
    });
  }

  function removeUnreferencedId(path) {
    const id = path.get("id").node;
    if (!id) {
      return;
    }

    const { node, scope } = path;
    const binding = scope.getBinding(id.name);

    // Check if shadowed or is not referenced.
    if (binding.path.node !== node || !binding.referenced) {
      node.id = null;
    }
  }

  // path1 -> path2
  // is path1 an ancestor of path2
  function isAncestor(path1, path2) {
    return !!path2.findParent((parent) => parent === path1);
  }

  function isSameFunctionScope(path1, path2) {
    return path1.scope.getFunctionParent() === path2.scope.getFunctionParent();
  }

  // tells if a "stmt" is a break statement that would break the "path"
  function isBreaking(stmt, path) {
    if (stmt.isBreakStatement()) {
      return _isBreaking(stmt, path);
    }

    let isBroken = false;
    let result = {
      break: false,
      bail: false
    };

    stmt.traverse({
      BreakStatement(breakPath) {
        // if we already detected a break statement,
        if (isBroken) return;

        result = _isBreaking(breakPath, path);

        if (result.bail || result.break) {
          isBroken = true;
        }
      }
    });

    return result;

    function _isBreaking(breakPath, path) {
      const label = breakPath.get("label");

      if (label.node !== null) {
        // labels are fn scoped and not accessible by inner functions
        // path is the switch statement
        if (!isSameFunctionScope(path, breakPath)) {
          // we don't have to worry about this break statement
          return {
            break: false,
            bail: false
          };
        }

        // here we handle the break labels
        // if they are outside switch, we bail out
        // if they are within the case, we keep them
        const _isAncestor = isAncestor(path.scope.getBinding(label.node.name).path, path);

        return {
          bail: _isAncestor,
          break: _isAncestor
        };
      }

      // set the flag that it is indeed breaking
      let isBreak = true;

      // this flag is to capture
      // switch(0) { case 0: while(1) if (x) break; }
      let possibleRunTimeBreak = false;

      // and compute if it's breaking the correct thing
      let parent = breakPath.parentPath;

      while (parent !== stmt.parentPath) {
        // loops and nested switch cases
        if (parent.isLoop() || parent.isSwitchCase()) {
          // invalidate all the possible runtime breaks captured
          // while (1) { if (x) break; }
          possibleRunTimeBreak = false;

          // and set that it's not breaking our switch statement
          isBreak = false;
          break;
        }
        //
        // this is a special case and depends on
        // the fact that SwitchStatement is handled in the
        // exit hook of the traverse
        //
        // switch (0) {
        //   case 0: if (x) break;
        // }
        //
        // here `x` is runtime only.
        // in this case, we need to bail out. So we depend on exit hook
        // of switch so that, it would have visited the IfStatement first
        // before the SwitchStatement and would have removed the
        // IfStatement if it was a compile time determined
        //
        if (parent.isIfStatement()) {
          possibleRunTimeBreak = true;
        }
        parent = parent.parentPath;
      }

      return {
        break: possibleRunTimeBreak || isBreak,
        bail: possibleRunTimeBreak
      };
    }
  }

  // things that are hoisted
  function canExistAfterCompletion(path) {
    return path.isFunctionDeclaration()
      || path.isVariableDeclaration({ kind: "var" });
  }
};
