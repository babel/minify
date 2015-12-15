'use strict';

const isNodesEquiv = require('../utils/isNodesEquiv');

module.exports = ({ Plugin, types: t }) => {
  const VOID_0 = t.unaryExpression('void', t.numericLiteral(0), true);
  const seen = Symbol('seen');
  const condExprSeen = Symbol('condExprSeen');

  return {
    visitor: {
      // undefined -> void 0
      ReferencedIdentifier(path) {
        if (path.node.name === 'undefined') {
          path.replaceWith(VOID_0);
        }
      },

      // { 'foo': 'bar' } -> { foo: 'bar' }
      Property: {
        exit({ node }) {
          let key = node.key;
          if (!t.isStringLiteral(key)) {
            return;
          }

          if (key.value.match(/^\d+$/)) {
            node.key = t.numericLiteral(parseInt(node.key.value, 10));
            node.computed = false;
          } else if (t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },

      // foo['bar'] -> foo.bar
      MemberExpression: {
        exit({ node }) {
          let prop = node.property;
          if (!node.computed || !t.isStringLiteral(prop)) {
            return;
          }

          if (prop.value.match(/^\d+$/)) {
            node.property = t.numericLiteral(parseInt(prop.value, 10));
            node.computed = false;
          } else if (t.isValidIdentifier(prop.value)) {
            node.property = t.identifier(prop.value);
            node.computed = false;
          }
        },
      },

      CallExpression(path) {
        const { node } = path;

        // Number(foo) -> +foo
        if (t.isIdentifier(node.callee, { name: 'Number' }) &&
          node.arguments.length === 1) {
          path.replaceWith(t.unaryExpression('+', node.arguments[0], true));
          return;
        }

        // String(foo) -> foo + ''
        if (t.isIdentifier(node.callee, { name: 'String' }) &&
          node.arguments.length === 1) {
          path.replaceWith(t.binaryExpression('+', node.arguments[0], t.stringLiteral('')));
          return;
        }

        // (function() {})() -> !function() {}()
        // Bug in babel https://github.com/babel/babel/issues/3052
        /*
        if (t.isFunctionExpression(node.callee)
            && (t.isExpressionStatement(parent) || t.isSequenceExpression(parent))) {
          path.replaceWith(
            t.callExpression(
              t.unaryExpression('!', node.callee),
              node.arguments
            )
          );
          return;
        }
        */
      },

      // shorten booleans to a negation
      // true -> !0
      // false -> !1
      Literal(path) {
        const { node } = path;
        if (typeof node.value === 'boolean') {
          path.replaceWith(t.unaryExpression('!', t.numericLiteral(+!node.value), true));
        }
      },

      BinaryExpression: {
        enter: [
          // flip comparisons with a pure right hand value, this ensures
          // consistency with comparisons and increases the length of
          // strings that gzip can match
          // typeof blah === 'function' -> 'function' === typeof blah
          function (path) {
            const { node } = path;
            if (node[seen]) {
              return;
            }

            node[seen] = true;
            if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 &&
              path.get('right').isPure()
            ) {
              const left = node.left;
              const right = node.right;
              path.get('right').replaceWith(left);
              path.get('left').replaceWith(right);
            }
          },

          // simplify comparison operations if we're 100% certain
          // that each value will always be of the same type
          function (path) {
            const { node } = path;
            let op = node.operator;
            if (op !== '===' && op !== '!==') {
              return;
            }

            let left  = path.get('left');
            let right = path.get('right');
            if (left.baseTypeStrictlyMatches(right)) {
              node.operator = node.operator.slice(0, -1);
            }
          },
        ],
      },

      // Apply demorgan's law to save byte.
      // TODO: make sure no security vuln.
      LogicalExpression(path) {
        if (!path.parentPath.isExpressionStatement()) {
          return;
        }

        const { node } = path;

        if (t.isUnaryExpression(node.left, { operator: '!' })) {
          node.operator = node.operator === '&&' ? '||' : '&&';
          node.left = node.left.argument;
          return;
        }
      },

      UnaryExpression(path) {
        const { node } = path;

        if (node.operator !== '!' && !node.prefix) {
          return;
        }

        const expr = node.argument;

        if (t.isBinaryExpression(expr)) {
          switch (expr.operator) {
            case '===':
              expr.operator = '!==';
              break;
            case '!==':
              expr.operator = '===';
              break;
            case '==':
              expr.operator = '!=';
              break;
            case '!=':
              expr.operator = '==';
              break;
            default:
              return;
          }

          path.replaceWith(expr);
          return;
        }

        if (t.isLogicalExpression(expr)) {
          expr.operator = expr.operator === '&&' ? '||' : '&&';
          flip('left');
          flip('right');
          path.replaceWith(expr);
        }

        function flip(dir) {
          if (t.isUnaryExpression(expr[dir], { operator: '!', prefix: true})) {
            expr[dir] = expr[dir].argument;
          } else {
            expr[dir] = t.unaryExpression('!', expr[dir]);
          }
        }
      },

      ConditionalExpression: {
        enter: [
          // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
          // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
          function({ node }) {
            flipNegation(node);
          },

          // a ? x = foo : b ? x = bar : x = baz;
          // x = a ? foo : b ? bar : baz;
          function(topPath) {
            if (!topPath.parentPath.isExpressionStatement() &&
                !topPath.parentPath.isSequenceExpression()
            ) {
              return;
            }

            let mutations = [];
            let firstLeft = null;
            let operator = null;
            function visit(path) {
              if (path.isConditionalExpression()) {
                let bail = visit(path.get('consequent'));
                if (bail) {
                  return true;
                }
                bail = visit(path.get('alternate'));
                return bail;
              }

              if (operator == null) {
                operator = path.node.operator;
              } else if (path.node.operator !== operator) {
                return true;
              }

              if (!path.isAssignmentExpression() ||
                  !(path.get('left').isIdentifier() || path.get('left').isMemberExpression())
              ) {
                return true;
              }

              const left = path.get('left').node;
              if (firstLeft == null) {
                firstLeft = left;
              } else if (!isNodesEquiv(left, firstLeft)) {
                return true;
              }

              mutations.push(
                () => path.replaceWith(path.get('right').node)
              );
            }

            let bail = visit(topPath);
            if (bail) {
              return;
            }

            mutations.forEach(f => f());
            topPath.replaceWith(
              t.assignmentExpression(
                operator,
                firstLeft,
                topPath.node
              )
            );
          },

          // bar ? void 0 : void 0
          // (bar, void 0)
          // TODO: turn this into general equiv check
          function (path) {
            const { node } = path;
            if (isVoid0(node.consequent) && isVoid0(node.alternate)) {
              path.replaceWith(t.sequenceExpression([path.node.test, VOID_0]));
            }
          },

          // bar ? void 0 : foo ? void 0 : <etc>
          // bar || foo : void 0
          // TODO: turn this into general equiv check
          function (path) {
            const { node } = path;

            if (node[condExprSeen] || !isVoid0(node.consequent)) {
              return;
            }

            node[condExprSeen] = true;

            const tests = [node.test];
            const mutations = [];
            let alt;
            for (let next = path.get('alternate'); next.isConditionalExpression(); next = next.get('alternate')) {
              next.node[condExprSeen] = true;
              alt = next.node.alternate;

              if (isVoid0(next.node.consequent)) {
                tests.push(next.node.test);
                mutations.push(() => next.remove());
              } else {
                break;
              }
            }

            if (tests.length === 1) {
              return;
            }

            const test = tests.reduce((expr, curTest) => t.logicalExpression(
              '||',
              expr,
              curTest
            ));

            path.replaceWith(t.conditionalExpression(test, VOID_0, alt));
          },
        ],
      },

      // concat
      VariableDeclaration: {
        enter: [
          // concat variables of the same kind with their siblings
          function (path) {
            if (!path.inList) {
              return;
            }

            const { node } = path;
            while (true) {
              let sibling = path.getSibling(path.key + 1);
              if (!sibling.isVariableDeclaration({ kind: node.kind })) {
                break;
              }

              node.declarations = node.declarations.concat(
                sibling.node.declarations
              );
              sibling.remove();
            }
          },

          // concat variable declarations next to for loops with it's
          // initialisers if they're of the same variable kind
          function (path) {
            if (!path.inList) {
              return;
            }

            const { node } = path;
            let next = path.getSibling(path.key + 1);
            if (!next.isForStatement()) {
              return;
            }

            let init = next.get('init');
            if (!init.isVariableDeclaration({ kind: node.kind })) {
              return;
            }

            init.node.declarations = node.declarations.concat(
              init.node.declarations
            );
            path.remove();
          },
        ],
      },

      // turn a for loop block block with single statement
      // loops into just the single statement
      For({ node, parent }) {
        let block = node.body;
        if (!block || !t.isBlockStatement(block)) {
          return;
        }

        let body = block.body;
        if (body.length !== 1) {
          return;
        }

        let first = body[0];
        node.body = first;
      },


      ForStatement: {

        // Merge previous expressions in the init part of the for.
        enter(path) {
          const { node } = path;
          if (!path.inList || (node.init && !t.isExpression(node.init))) {
            return;
          }

          const prev = path.getSibling(path.key - 1);
          let consumed = false;
          if (prev.isVariableDeclaration()) {
            if (!node.init) {
              node.init = prev.node;
              consumed = true;
            }
          } else if (prev.isExpressionStatement()) {
            const expr = prev.node.expression;
            if (node.init) {
              if (t.isSequenceExpression(expr)) {
                expr.expressions.push(node.init);
                node.init = expr;
              } else {
                node.init = t.sequenceExpression([expr, node.init]);
              }
            } else {
              node.init = expr;
            }
            consumed = true;
          }
          if (consumed) {
            prev.remove();
          }
        },

        exit(path) {
          const { node } = path;
          if (!node.test) {
            return;
          }

          if (!path.get('body').isBlockStatement()) {
            const bodyNode = path.get('body').node;
            if (!t.isIfStatement(bodyNode)) {
              return;
            }

            if (t.isBreakStatement(bodyNode.consequent, { label: null })) {
              node.test = t.logicalExpression('&&', node.test, bodyNode.test);
              node.body = bodyNode.alternate || t.emptyStatement();
              return;
            }

            if (t.isBreakStatement(bodyNode.alternate, { label: null })) {
              node.test = t.logicalExpression('&&', node.test, t.unaryExpression('!', bodyNode.test));
              node.body = bodyNode.consequent || t.emptyStatement();
              return;
            }

            return;
          }

          const statements = node.body.body;
          const exprs = [];
          let ifStatement = null;
          let breakAt = null;
          let i = 0;
          for (let statement; statement = statements[i]; i++) {
            if (t.isIfStatement(statement)) {
              if (t.isBreakStatement(statement.consequent, { label: null })) {
                ifStatement = statement;
                breakAt = 'consequent';
              } else if (t.isBreakStatement(statement.alternate, { label: null })) {
                ifStatement = statement;
                breakAt = 'alternate';
              }
              break;
            }

            // A statement appears before the break statement then bail.
            if (!t.isExpressionStatement(statement)) {
              return;
            }

            exprs.push(statement.expression);
          }

          if (!ifStatement) {
            return;
          }

          let rest = [];

          if (breakAt = 'consequent') {
            if (t.isBlockStatement(ifStatement.alternate)) {
              rest.push(...ifStatement.alternate.body);
            } else if (ifStatement.alternate) {
              rest.push(ifStatement.alternate);
            }
          } else {
            if (t.isBlockStatement(ifStatement.consequent)) {
              rest.push(...ifStatement.consequent.body);
            } else if (ifStatement.consequent) {
              rest.push(ifStatement.consequent);
            }
          }

          rest.push(...statements.slice(i + 1));

          const test = breakAt === 'consequent' ? ifStatement.test : t.unaryExpression('!', ifStatement.test);
          let expr;
          if (exprs.length === 1) {
            expr = t.sequenceExpression([exprs[0], test]);
          } else if (exprs.length) {
            exprs.push(test);
            expr = t.sequenceExpression(exprs);
          } else {
            expr = test;
          }

          node.test = t.logicalExpression('&&', node.test, expr);
          if (rest.length === 1) {
            node.body = rest[0];
          } else if (rest.length) {
            node.body = t.blockStatement(rest);
          } else {
            node.body = t.emptyStatement();
          }
        },
      },

      Program({ node }) {
        const statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length) {
          return;
        }
        node.body = statements;
      },

      BlockStatement: {
        enter(path) {
          const { node, parent } = path;

          if (node[seen]) {
            return;
          }

          const top = [];
          const bottom = [];

          for (let i = 0; i < node.body.length; i++) {
            const bodyNode = node.body[i];
            if (t.isFunctionDeclaration(bodyNode)) {
              top.push(bodyNode);
            } else {
              bottom.push(bodyNode);
            }
          }

          const statements = top.concat(toMultipleSequenceExpressions(bottom));

          if (!statements.length) {
            return;
          }

          if (statements.length > 1 || needsBlock(node, parent)) {
                const n = t.blockStatement(statements);
                n[seen] = true;
                path.replaceWith(n);
                return;
          }

          if (statements.length) {
            path.replaceWith(statements[0]);
            return;
          }
        },

        exit(path) {
          const { node, parent } = path;

          if (needsBlock(node, parent)) {
            return;
          }

          if (node.body.length === 1) {
            path.get('body')[0].inList = false;
            path.replaceWith(node.body[0]);
            return;
          }

          // Check if oppurtinties to merge statements are available.
          const statements = node.body;
          if (!statements.length) {
            return;
          }

          for (let statement of statements) {
            if (!t.isExpressionStatement(statement)) {
              return;
            }
          }

          delete node[seen];
          path.visit();
        },
      },

      // Try to merge previous statements into a sequence
      ReturnStatement(path) {
        if (!path.inList) {
          return;
        }

        const { node } = path;
        const prev = path.getSibling(path.key - 1);
        if (!prev.isExpressionStatement()) {
          return;
        }

        let seq = prev.node.expression;
        if (node.argument) {
          if (t.isSequenceExpression(seq)) {
            seq.expressions.push(node.argument);
          } else {
            seq = t.sequenceExpression([seq, node.argument]);
          }
        } else {
          if (t.isSequenceExpression(seq)) {
            const lastExpr = seq.expressions[seq.expressions.length - 1];
            seq.expressions[seq.expressions.length - 1] = t.unaryExpression('void', lastExpr);
          } else {
            seq = t.unaryExpression('void', seq);
          }
        }

        if (seq) {
          prev.remove();
          path.replaceWith(t.returnStatement(seq));

          // Since we were able to merge some stuff it's possible that this has opened
          // oppurtinties for other transforms to happen. Let's revisit the funciton parent.
          // TODO: Look into changing the traversal order from bottom to up to avoid
          // having to revisit things.
          const fn = path.scope.getFunctionParent().path;
          fn.pushContext(path.context);
          fn.visit();
          fn.popContext();
        }
      },
      // turn blocked ifs into single statements
      IfStatement: {
        exit: [
          // Merge nested if statements if possible
          function ({ node }) {
            if (!t.isIfStatement(node.consequent)) {
              return;
            }

            if (node.alternate || node.consequent.alternate) {
              return;
            }

            node.test = t.logicalExpression('&&', node.test, node.consequent.test);
            node.consequent = node.consequent.consequent;
          },

          function(path) {
            const { node } = path;

            coerceIf('consequent');
            coerceIf('alternate');
            flipNegation(node);

            // No alternate, make into a guarded expression
            if (node.consequent && !node.alternate &&
                node.consequent.type === 'ExpressionStatement'
            ) {
              let op = '&&';
              if (t.isUnaryExpression(node.test, { operator: '!' })) {
                node.test = node.test.argument;
                op = '||';
              }

              path.replaceWith(
                t.expressionStatement(
                  t.logicalExpression(op, node.test, node.consequent.expression)
                )
              );
              return;
            }

            // Easy, both are expressions, turn into ternary
            if (t.isExpressionStatement(node.consequent) &&
                t.isExpressionStatement(node.alternate)
            ) {
              path.replaceWith(
                t.conditionalExpression(
                  node.test, node.consequent.expression, node.alternate.expression
                )
              );
              return;
            }

            // There is nothing after this block. And one or both
            // of the consequent and alternate are either expression statment
            // or return statements.
            if (!path.getSibling(path.key + 1).node &&
                node.consequent && node.alternate &&
                (t.isReturnStatement(node.consequent) ||
                 t.isExpressionStatement(node.consequent)) &&
                (t.isReturnStatement(node.alternate) ||
                 t.isExpressionStatement(node.alternate))
            ) {
              // Easy: consequent and alternate are return -- conditional.
              if (t.isReturnStatement(node.consequent)
                  && t.isReturnStatement(node.alternate)
              ) {
                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument || VOID_0,
                      node.alternate.argument || VOID_0
                    )
                  )
                );
                return;
              }

              // Only the consequent is a return, void the alternate.
              if (t.isReturnStatement(node.consequent)) {
                if (!node.consequent.argument) {
                  path.replaceWith(
                    t.returnStatement(
                      t.logicalExpression(
                        '||',
                        node.test,
                        t.unaryExpression('void', node.alternate.expression)
                      )
                    )
                  );
                  return;
                }
                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument || VOID_0,
                      t.unaryExpression('void', node.alternate.expression)
                    )
                  )
                );
                return;
              }

              // Only the alternate is a return, void the consequent.
              if (t.isReturnStatement(node.alternate)) {
                if (!node.alternate.argument) {
                  path.replaceWith(
                    t.returnStatement(
                      t.logicalExpression(
                        '&&',
                        node.test,
                        t.unaryExpression('void', node.consequent.expression)
                      )
                    )
                  );
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      t.unaryExpression('void', node.consequent.expression),
                      node.alternate.argument || VOID_0
                    )
                  )
                );
                return;
              }
            }

            let next = path.getSibling(path.key + 1);

            // If the next satatement(s) is an if statement and we can simplify that
            // to potentailly be an expression (or a return) then this will make it
            // easier merge.
            if (next.isIfStatement()) {
              next.pushContext(path.context);
              next.visit();
              next.popContext();
              next = path.getSibling(path.key + 1);
            }

            // Some other visitor might have deleted our node. OUR NODE ;_;
            if (!path.node) {
              return;
            }

            // No alternate but the next statement is a return
            // also turn into a return conditional
            if (t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isReturnStatement()
            ) {
              const nextArg = next.node.argument || VOID_0;
              next.remove();
              path.replaceWith(
                t.returnStatement(
                  t.conditionalExpression(
                    node.test, node.consequent.argument || VOID_0, nextArg
                  )
                )
              );
              return;
            }

            // Next is the last expression, turn into a return while void'ing the exprs
            if (path.parentPath && path.parentPath.parentPath &&
                path.parentPath.parentPath.isFunction() && !path.getSibling(path.key + 2).node &&
                t.isReturnStatement(node.consequent) && !node.alternate && next.isExpressionStatement()
            ) {
              const nextExpr = next.node.expression;
              next.remove();
              if (node.consequent.argument) {
                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument,
                      t.unaryExpression('void', nextExpr)
                    )
                  )
                );
                return;
              }

              path.replaceWith(
                t.logicalExpression('||', node.test, nextExpr)
              );
              return;
            }

            if (node.consequent && node.alternate &&
              (t.isReturnStatement(node.consequent) || (
                t.isBlockStatement(node.consequent)
                  && t.isReturnStatement(
                    node.consequent.body[node.consequent.body.length - 1]
                  )
              ))
            ) {
              path.insertAfter(
                t.isBlockStatement(node.alternate)
                  ? node.alternate.body
                  : node.alternate
              );
              node.alternate = null;
              return;
            }

            function coerceIf(key) {
              let block = node[key];
              if (!block || !t.isBlockStatement(block)) {
                return;
              }

              let body = block.body;
              if (body.length !== 1) {
                return;
              }

              let first = body[0];
              if (t.isVariableDeclaration(first) && first.kind !== 'let') {
                return;
              }

              node[key] = first;
            }
          },

          // Merge if statements with return values in sequence.
          function(path) {
            const { node } = path;

            if (!path.inList || node.alternate ||
                !(path.parentPath.parentPath && path.parentPath.parentPath.isFunction())
            ) {
              return;
            }

            if (!t.isReturnStatement(node.consequent)) {
              return;
            }

            const exprs = [node.consequent.argument || VOID_0];
            const tests = [node.test];
            const mutations = [];
            let i = 1;

            while (path.getSibling(path.key + i).node) {
              const next = path.getSibling(path.key + i);
              if (!next.isIfStatement() || next.node.alternate) {
                return;
              }

              if (!t.isReturnStatement(next.node.consequent)) {
                return;
              }

              tests.push(next.node.test);
              exprs.push(next.node.consequent.argument || VOID_0);
              mutations.push(() => next.remove());
              i++;
            }

            if (exprs.length < 2) {
              // Will results in more bytes and destroy any wins we have
              // (even the ones from gzip).
              return;
            }

            const cond = exprs.reduceRight(
              (alt, cons, ind) => t.conditionalExpression(
                tests[ind],
                cons,
                alt
              ),
              VOID_0
            );

            mutations.forEach(f => f());
            path.replaceWith(t.returnStatement(cond));
          },

          // Make if statements with conditional returns in the body into
          // an if statement that guards the rest of the block.
          function(path) {
            const { node } = path;

            if (!path.inList || !path.get('consequent').isBlockStatement() ||
                node.alternate
            ) {
              return;
            }

            let test;
            const exprs = [];
            const statements = node.consequent.body;

            for (let i = 0, statement; statement = statements[i]; i++) {
              if (t.isExpressionStatement(statement)) {
                exprs.push(statement.expression);
              } else if (t.isIfStatement(statement)) {
                if (i < statements.length - 1) {
                  // This isn't the last statement. Bail.
                  return;
                }
                if (statement.alternate) {
                  return;
                }
                if (!t.isReturnStatement(statement.consequent)) {
                  return;
                }
                test = statement.test;
              }
            }

            if (!test) {
              return;
            }

            exprs.push(test);

            const expr = exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);
            const parentStatements = path.container.slice(path.key + 1);

            let l = parentStatements.length;

            if (!l) {
              path.replaceWith(t.expressionStatement(
                t.logicalExpression(
                  '&&',
                  node.test,
                  expr
                )
              ));
              return;
            }

            while (l-- > 0) {
              path.getSibling(path.key + 1).remove();
            }

            test = t.unaryExpression(
              '!',
              t.logicalExpression('&&', node.test, expr)
            );
            const consequent = parentStatements.length === 1
                               ? parentStatements[0]
                               : t.blockStatement(parentStatements);

            path.replaceWith(t.ifStatement(test, consequent, null));
          },

          function (path) {
            const { node } = path;
            const expr = node.test;

            if (t.isUnaryExpression(expr) &&
                t.isLogicalExpression(expr) &&
                !t.isLogicalExpression(expr.left) &&
                !t.isLogicalExpression(expr.right)
            ) {
              expr.operator = expr.operator === '&&' ? '||' : '&&';
              expr.left = t.unaryExpression('!', expr.left);
              expr.right = t.unaryExpression('!', expr.right);
              path.get('test').replaceWith(expr);
            }
          },

          // Convert early returns and continues in if statements to negated
          // ifs with the rest of the body in the consequent
          function(path) {
            const { node } = path;

            if (!path.inList || node.alternate) {
              return;
            }

            if (t.isReturnStatement(node.consequent) &&
                path.parentPath.parentPath.isFunction()
            ) {
              if (node.consequent.argument) {
                return;
              }
            } else if (t.isContinueStatement(node.consequent)) {
              if (node.consequent.label) {
                return;
              }
            } else {
              return;
            }

            const test = node.test;
            if (t.isBinaryExpression(test) && test.operator === '!==') {
              test.operator = '===';
            } else if (t.isBinaryExpression(test) && test.operator === '!=') {
              test.operator = '==';
            } else if (t.isUnaryExpression(test, { operator: '!' })) {
              node.test = test.argument;
            } else {
              node.test = t.unaryExpression('!', node.test);
            }

            const statements = path.container.slice(path.key + 1);
            if (!statements.length) {
              path.remove();
              return;
            }

            let l = statements.length;
            while (l-- > 0) {
              path.getSibling(path.key + 1).remove();
            }

            if (statements.length === 1) {
              node.consequent = statements[0];
            } else {
              node.consequent = t.blockStatement(statements);
            }
            path.visit();
          },
        ],
      },

      WhileStatement(path) {
        const { node } = path;
        path.replaceWith(t.forStatement(null, node.test, null, node.body));
      },
    },
  };

  function flipNegation(node) {
    if (!node.consequent || !node.alternate) {
      return;
    }

    let test = node.test;
    let flip = false;

    if (t.isBinaryExpression(test)) {
      if (test.operator === '!==') {
        test.operator = '===';
        flip = true;
      }

      if (test.operator === '!=') {
        test.operator = '==';
        flip = true;
      }
    }

    if (t.isUnaryExpression(test, { operator: '!' })) {
      node.test = test.argument;
      flip = true;
    }

    if (flip) {
      let consequent = node.consequent;
      node.consequent = node.alternate;
      node.alternate = consequent;
    }
  }

  function toMultipleSequenceExpressions(statements) {
    let retStatements = [];
    let bailed;
    do {
      let res = convert(statements);
      bailed = res.bailed;
      let {seq, bailedAtIndex} = res;
      if (seq) {
        retStatements.push(t.expressionStatement(seq));
      }
      if (bailed && statements[bailedAtIndex]) {
        retStatements.push(statements[bailedAtIndex]);
      }
      if (bailed) {
        statements = statements.slice(bailedAtIndex + 1);
        if (!statements.length) {
          bailed = false;
        }
      }
    } while (bailed);

    return retStatements;

    function convert(nodes) {
      let exprs = [];

      for (let i = 0; i < nodes.length; i++) {
        let bail = () => {
          let seq;
          if (exprs.length === 1) {
            seq = exprs[0];
          } else if (exprs.length) {
            seq = t.sequenceExpression(exprs);
          }

          return {
            seq,
            bailed: true,
            bailedAtIndex: i,
          };
        };

        let node = nodes[i];
        if (t.isExpression(node)) {
          exprs.push(node);
        } else if (t.isExpressionStatement(node)) {
          exprs.push(node.expression);
        } else if (t.isIfStatement(node)) {
          let consequent;
          if (node.consequent) {
            const res = convert([node.consequent]);
            if (res.bailed) {
              return bail();
            }
            consequent = res.seq;
          }
          let alternate;
          if (node.alternate) {
            const res = convert([node.alternate]);
            if (res.bailed) {
              return bail();
            }
            alternate = res.seq;
          }

          if (!alternate && !consequent) {
            exprs.push(node.test);
          } else if (!alternate) {
            exprs.push(t.logicalExpression('&&', node.test, consequent));
          } else if (!consequent) {
            exprs.push(t.logicalExpression('||', node.test, alternate));
          } else {
            exprs.push(t.conditionalExpression(node.test, consequent, alternate));
          }
        } else if (t.isBlockStatement(node)) {
          const res = convert(node.body);
          if (res.bailed) {
            return bail();
          }
          exprs.push(res.seq);
        } else {
          return bail();
        }
      }

      let seq;
      if (exprs.length === 1) {
        seq = exprs[0];
      } else if (exprs.length) {
        seq = t.sequenceExpression(exprs);
      }

      seq = seq;
      return { seq };
    }
  }

  function needsBlock(node, parent) {
    return (t.isFunction(parent) && node === parent.body) ||
           t.isTryStatement(parent) || t.isCatchClause(parent);
  }

  function isVoid0(expr) {
    return expr === VOID_0 || (
      t.isUnaryExpression(expr, { operator: 'void' })  &&
      t.isNumericLiteral(expr.argument, { value: 0 })
    );
  }
};
