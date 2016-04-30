'use strict';

module.exports = ({ Plugin, types: t }) => {
  const isNodesEquiv = require('babel-helper-is-nodes-equiv')(t);
  const VOID_0 = t.unaryExpression('void', t.numericLiteral(0), true);
  const condExprSeen = Symbol('condExprSeen');
  const seqExprSeen = Symbol('seqExprSeen');
  const shouldRevisit = Symbol('shouldRevisit');
  const flipSeen = Symbol('flipSeen');

  return {
    visitor: {
      Statement: {
        exit(path) {
          if (path.node[shouldRevisit]) {
            delete path.node[shouldRevisit];
            path.visit();
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

        /* (function() {})() -> !function() {}()
        There is a bug in babel in printing this. Disabling for now.
        if (t.isFunctionExpression(node.callee) &&
            (t.isExpressionStatement(parent) ||
             (t.isSequenceExpression(parent) && parent.expressions[0] === node))
        ) {
          path.replaceWith(
            t.callExpression(
              t.unaryExpression('!', node.callee, true),
              node.arguments
            )
          );
          return;
        }*/
      },

      BinaryExpression: {
        enter: [
          // flip comparisons with a pure right hand value, this ensures
          // consistency with comparisons and increases the length of
          // strings that gzip can match
          // typeof blah === 'function' -> 'function' === typeof blah

          function (path) {
            const { node } = path;
            const { right, left } = node;

            // Make sure we have a constant on the right.
            if (!t.isLiteral(right) && !isVoid0(right) &&
                !(t.isUnaryExpression(right) && t.isLiteral(right.argument)) &&
                !t.isObjectExpression(right) && !t.isArrayExpression(right)
            ) {
              return;
            }

            // Commutative operators.
            if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 ||
               ['*', '^', '&', '|'].indexOf(node.operator) >= 0
            ) {
              node.left = right;
              node.right = left;
              return;
            }

            if (t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(node.operator) >= 0) {
              node.left = right;
              node.right = left;
              let operator;
              switch (node.operator) {
                case '>': operator = '<'; break;
                case '<': operator = '>'; break;
                case '>=': operator = '<='; break;
                case '<=': operator = '>='; break;
              }
              node.operator = operator;
              return;
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
            const strictMatch = left.baseTypeStrictlyMatches(right);
            if (strictMatch) {
              node.operator = node.operator.slice(0, -1);
            }
          },
        ],
      },

      // Convert guarded expressions
      // !a && b() --> a || b();
      // This could change the return result of the expression so we only do it
      // on things where the result is ignored.
      LogicalExpression: {
        enter: [
          function(path) {
            const { node } = path;

            if (node[flipSeen]) {
              return;
            }

            if (!path.parentPath.isExpressionStatement() &&
                !(path.parentPath.isSequenceExpression() && path.parentPath.parentPath.isExpressionStatement())
            ) {
              return;
            }

            // Start counting savings from one since we can ignore the last
            // expression.
            if (shouldFlip(node, 1)) {
              const newNode = flip(node, true);
              newNode[flipSeen] = true;
              path.replaceWith(newNode);
            }
          },
        ],
      },

      UnaryExpression: {
        enter: [

          // Demorgans.
          function(path) {
            const { node } = path;

            if (node.operator !== '!' || node[flipSeen]) {
              return;
            }

            const expr = node.argument;

            // We need to make sure that the return type will always be boolean.
            if (!(t.isLogicalExpression(expr) || t.isConditionalExpression(expr) || t.isBinaryExpression(expr))) {
              return;
            }
            if (t.isBinaryExpression(expr) && t.COMPARISON_BINARY_OPERATORS.indexOf(expr.operator) === -1) {
              return;
            }

            if (shouldFlip(expr, 1)) {
              const newNode = flip(expr);
              newNode[flipSeen] = true;
              path.replaceWith(newNode);
            }
          },

          // !(a, b, c) -> a, b, !c
          function(path) {
            const { node } = path;

            if (node.operator !== '!') {
              return;
            }

            if (!t.isSequenceExpression(node.argument)) {
              return;
            }

            const seq = node.argument.expressions;
            const expr = seq[seq.length - 1];
            seq[seq.length - 1] = t.unaryExpression('!', expr, true);
            path.replaceWith(node.argument);
          },

          // !(a ? b : c) -> a ? !b : !c
          function(path) {
            const { node } = path;

            if (node.operator !== '!') {
              return;
            }

            if (!t.isConditional(node.argument)) {
              return;
            }

            const cond = node.argument;
            cond.alternate = t.unaryExpression('!', cond.alternate, true);
            cond.consequent = t.unaryExpression('!', cond.consequent, true);
            path.replaceWith(node.argument);
          },
        ],
      },

      ConditionalExpression: {
        enter: [
          // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
          // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
          function flipIfOrConditional(path) {
            const { node } = path;
            if (!path.get('test').isLogicalExpression()) {
              flipNegation(node);
              return;
            }

            if (shouldFlip(node.test)) {
              node.test = flip(node.test);
              [node.alternate, node.consequent] = [node.consequent, node.alternate];
            }
          },
        ],

        exit: [
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
                alt = next.node;
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

          // Put vars with no init at the top.
          function (path) {
            const { node } = path;

            if (node.declarations.length < 2) {
              return;
            }

            let inits = [];
            let empty = [];
            for (let decl of node.declarations) {
              if (!decl.init) {
                empty.push(decl);
              } else {
                inits.push(decl);
              }
            }

            // This is based on exprimintation but there is a significant
            // imrpovement when we place empty vars at the top in smaller
            // files. Whereas it hurts in larger files.
            if (this.fitsInSlidingWindow) {
              node.declarations = empty.concat(inits);
            } else {
              node.declarations = inits.concat(empty);
            }
          },
        ],
      },

      Function: {
        enter: earlyReturnTransform,

        exit(path) {
          // Useful to do on enter and exit because more oppurtinties can open.
          earlyReturnTransform(path);

          if (!path.node[shouldRevisit]) {
            return;
          }

          delete path.node[shouldRevisit];
          path.visit();
        },
      },

      For: {
        enter: earlyContinueTransform,
        exit: earlyContinueTransform,
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
              node.test = t.logicalExpression('&&', node.test, t.unaryExpression('!', bodyNode.test, true));
              node.body = bodyNode.alternate || t.emptyStatement();
              return;
            }

            if (t.isBreakStatement(bodyNode.alternate, { label: null })) {
              node.test = t.logicalExpression('&&', node.test, bodyNode.test);
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

          const test = breakAt === 'consequent' ? t.unaryExpression('!', ifStatement.test, true) : ifStatement.test;
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

      Program(path) {
        // An approximation of the resultant gzipped code after minification
        this.fitsInSlidingWindow = (path.getSource().length / 10) < 33000;

        const { node } = path;
        const statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length) {
          return;
        }
        node.body = statements;
      },

      BlockStatement: {
        enter(path) {
          const { node, parent } = path;

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

          if (statements.length > 1 || needsBlock(node, parent) || node.directives) {
            node.body = statements;
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

          if (node.body.length === 0) {
            path.replaceWith(t.emptyStatement());
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

          path.visit();
        },
      },

      ThrowStatement: createPrevExpressionEater('throw'),

      // Try to merge previous statements into a sequence
      ReturnStatement: {
        enter: [
          createPrevExpressionEater('return'),

          // Remove return if last statement with no argument.
          // Replace return with `void` argument with argument.
          function(path) {
            const { node } = path;

            if (!path.parentPath.parentPath.isFunction() ||
                path.getSibling(path.key + 1).node
            ) {
              return;
            }

            if (!node.argument)  {
              path.remove();
              return;
            }

            if (t.isUnaryExpression(node.argument, { operator: 'void' })) {
              path.replaceWith(node.argument.argument);
            }
          },
        ],
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
            if (!path.getSibling(path.key + 1).node && path.parentPath &&
                path.parentPath.parentPath && path.parentPath.parentPath.isFunction()
            ) {
              // Easy: consequent and alternate are return -- conditional.
              if (t.isReturnStatement(node.consequent)
                  && t.isReturnStatement(node.alternate)
              ) {
                if (!node.consequent.argument && !node.altenrate.argument) {
                  path.replaceWith(t.expressionStatement(node.test));
                  return;
                }

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
              if (t.isReturnStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
                if (!node.consequent.argument) {
                  path.replaceWith(t.expressionStatement(
                    t.logicalExpression(
                      '||',
                      node.test,
                      node.alternate.expression
                    )
                  ));
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument || VOID_0,
                      t.unaryExpression('void', node.alternate.expression, true)
                    )
                  )
                );
                return;
              }

              // Only the alternate is a return, void the consequent.
              if (t.isReturnStatement(node.alternate) && t.isExpressionStatement(node.consequent)) {
                if (!node.alternate.argument) {
                  path.replaceWith(t.expressionStatement(
                    t.logicalExpression(
                      '&&',
                      node.test,
                      node.consequent.expression
                    )
                  ));
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      t.unaryExpression('void', node.consequent.expression, true),
                      node.alternate.argument || VOID_0
                    )
                  )
                );
                return;
              }

              if (t.isReturnStatement(node.consequent) && !node.alternate) {
                if (!node.consequent.argument) {
                  path.replaceWith(t.expressionStatement(node.test));
                  return;
                }

                // This would only be worth it if the previous statement was an if
                // because then we may merge to create a conditional.
                if (path.getSibling(path.key - 1).isIfStatement()) {
                  path.replaceWith(
                    t.returnStatement(
                      t.conditionalExpression(
                        node.test,
                        node.consequent.argument || VOID_0,
                        VOID_0
                      )
                    )
                  );
                  return;
                }

              }

              if (t.isReturnStatement(node.alternate) && !node.consequent) {
                if (!node.alternate.argument) {
                  path.replaceWith(t.expressionStatement(node.test));
                  return;
                }

                // Same as above.
                if (path.getSibling(path.key - 1).isIfStatement()) {
                  path.replaceWith(
                    t.returnStatement(
                      t.conditionalExpression(
                        node.test,
                        node.alternate.argument || VOID_0,
                        VOID_0
                      )
                    )
                  );
                  return;
                }
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
                      t.unaryExpression('void', nextExpr, true)
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
          },

          // If the consequent is if and the altenrate is not then
          // switch them out. That way we know we don't have to print
          // a block.x
          function(path) {
            const { node } = path;

            if (!node.alternate) {
              return;
            }

            if (!t.isIfStatement(node.consequent)) {
              return;
            }

            if (t.isIfStatement(node.alternate)) {
              return;
            }

            node.test = t.unaryExpression('!', node.test, true);
            [node.alternate, node.consequent] = [node.consequent, node.alternate];
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

            let ret;
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
                ret = statement.consequent;
                test = statement.test;
              } else {
                return;
              }
            }

            if (!test || !ret) {
              return;
            }

            exprs.push(test);

            const expr = exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);

            let replacement = t.logicalExpression('&&', node.test, expr);

            path.replaceWith(t.ifStatement(
              replacement,
              ret,
              null
            ));
          },

          createPrevExpressionEater('if'),
        ],
      },

      WhileStatement(path) {
        const { node } = path;
        path.replaceWith(t.forStatement(null, node.test, null, node.body));
      },

      ForInStatement:createPrevExpressionEater('for-in'),

      // Flatten sequence expressions.
      SequenceExpression: {
        exit(path) {
          if (path.node[seqExprSeen]) {
            return;
          }

          function flatten(node) {
            node[seqExprSeen] = true;
            let ret = [];
            for (let n of node.expressions) {
              if (t.isSequenceExpression(n)) {
                ret.push(...flatten(n));
              } else {
                ret.push(n);
              }
            }
            return ret;
          }

          path.node.expressions = flatten(path.node);
        },
      },

      SwitchCase(path) {
        const { node } = path;

        if (!node.consequent.length) {
          return;
        }

        node.consequent = toMultipleSequenceExpressions(node.consequent);
      },

      SwitchStatement: {
        exit: [

          // Convert switch statements with all returns in their cases
          // to return conditional.
          function(path) {
            const { node } = path;

            // Need to be careful of side-effects.
            if (!t.isIdentifier(node.discriminant)) {
              return;
            }

            if (!node.cases.length) {
              return;
            }

            const consTestPairs = [];
            let fallThru = [];
            let defaultRet;
            for (let switchCase of node.cases) {
              if (switchCase.consequent.length > 1) {
                return;
              }

              const cons = switchCase.consequent[0];

              if (!switchCase.test) {
                if (!t.isReturnStatement(cons)) {
                  return;
                }
                defaultRet = cons;
                continue;
              }

              if (!switchCase.consequent.length) {
                if (fallThru.length) {
                  fallThru.push(switchCase.test);
                } else {
                  fallThru = [switchCase.test];
                }
                continue;
              }

              // TODO: can we void it?
              if (!t.isReturnStatement(cons)) {
                return;
              }

              let test = t.binaryExpression('===', node.discriminant, switchCase.test);
              if (fallThru.length) {
                test = fallThru.reduceRight(
                  (right, test) => t.logicalExpression(
                    '||',
                    t.binaryExpression('===', node.discriminant, test),
                    right
                  ),
                  test
                );
                fallThru = [];
              }

              consTestPairs.push([test, cons.argument || VOID_0]);
            }

            // Bail if we have any remaining fallthrough
            if (fallThru.length) {
              return;
            }

            // We need the default to be there to make sure there is an oppurtinity
            // not to return.
            if (!defaultRet) {
              if (path.inList) {
                const nextPath = path.getSibling(path.key + 1);
                if (nextPath.isReturnStatement()) {
                  defaultRet = nextPath.node;
                  nextPath.remove();
                } else if (!nextPath.node && path.parentPath.parentPath.isFunction()) {
                  // If this is the last statement in a function we just fake a void return.
                  defaultRet = t.returnStatement(VOID_0);
                } else {
                  return;
                }
              } else {
                return;
              }
            }

            const cond = consTestPairs.reduceRight(
              (alt, [test, cons]) => t.conditionalExpression(test, cons, alt),
              defaultRet.argument || VOID_0
            );

            path.replaceWith(t.returnStatement(cond));

            // Maybe now we can merge with some previous switch statement.
            if (path.inList) {
              const prev = path.getSibling(path.key - 1);
              if (prev.isSwitchStatement()) {
                prev.visit();
              }
            }
          },

          // Convert switches into conditionals.
          function(path) {
            const { node } = path;

            // Need to be careful of side-effects.
            if (!t.isIdentifier(node.discriminant)) {
              return;
            }

            if (!node.cases.length) {
              return;
            }

            const exprTestPairs = [];
            let fallThru = [];
            let defaultExpr;
            for (let switchCase of node.cases) {
              if (!switchCase.test) {
                if (switchCase.consequent.length !== 1) {
                  return;
                }
                if (!t.isExpressionStatement(switchCase.consequent[0])) {
                  return;
                }
                defaultExpr = switchCase.consequent[0].expression;
                continue;
              }

              if (!switchCase.consequent.length) {
                if (fallThru.length) {
                  fallThru.push(switchCase.test);
                } else {
                  fallThru = [switchCase.test];
                }
                continue;
              }

              const [cons, breakStatement] = switchCase.consequent;
              if (switchCase === node.cases[node.cases.length - 1]) {
                if (breakStatement && !t.isBreakStatement(breakStatement)) {
                  return;
                }
              } else if (!t.isBreakStatement(breakStatement)) {
                return;
              }

              if (!t.isExpressionStatement(cons) || switchCase.consequent.length > 2) {
                return;
              }

              let test = t.binaryExpression('===', node.discriminant, switchCase.test);
              if (fallThru.length) {
                test = fallThru.reduceRight(
                  (right, test) => t.logicalExpression(
                    '||',
                    t.binaryExpression('===', node.discriminant, test),
                    right
                  ),
                  test
                );
                fallThru = [];
              }

              exprTestPairs.push([test, cons.expression]);
            }

            if (fallThru.length) {
              return;
            }

            const cond = exprTestPairs.reduceRight(
              (alt, [test, cons]) => t.conditionalExpression(test, cons, alt),
              defaultExpr || VOID_0
            );

            path.replaceWith(cond);
          },

          function(path) {
            const { node } = path;

            if (!node.cases.length) {
              return;
            }

            const lastCase = path.get('cases')[node.cases.length - 1];
            if (!lastCase.node.consequent.length) {
              return;
            }

            const potentialBreak = lastCase.get('consequent')[lastCase.node.consequent.length - 1];
            if (!t.isBreakStatement(potentialBreak)) {
              return;
            }

            potentialBreak.remove();
          },

          createPrevExpressionEater('switch'),
        ],
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
           t.isTryStatement(parent) || t.isCatchClause(parent) ||
           t.isSwitchStatement(parent);
  }

  function isVoid0(expr) {
    return expr === VOID_0 || (
      t.isUnaryExpression(expr, { operator: 'void' })  &&
      t.isNumericLiteral(expr.argument, { value: 0 })
    );
  }

  function earlyReturnTransform(path) {
    const { node } = path;

    for (let i = node.body.body.length; i >= 0; i--) {
      const statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate &&
          t.isReturnStatement(statement.consequent) && !statement.consequent.argument
      ) {
        genericEarlyExitTransform(path.get('body').get('body')[i]);
      }
    }
  }

  function earlyContinueTransform(path) {
    const { node } = path;

    if (!t.isBlockStatement(node.body)) {
      return;
    }

    for (let i = node.body.body.length; i >= 0; i--) {
      const statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate &&
          t.isContinueStatement(statement.consequent) && !statement.consequent.label
      ) {
        genericEarlyExitTransform(path.get('body').get('body')[i]);
      }
    }

    // We may have reduced the body to a single statement.
    if (node.body.body.length === 1) {
      path.get('body').replaceWith(node.body.body[0]);
    }
  }

  function genericEarlyExitTransform(path) {
    const { node } = path;

    const statements = path.container.slice(path.key + 1);
    if (!statements.length) {
      path.replaceWith(t.expressionStatement(node.test));
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
      node.test = t.unaryExpression('!', node.test, true);
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
  }

  function flip(node, resultNotUsed) {
    let lastNodeDesc;
    const ret = visit(node);

    if (resultNotUsed && lastNodeDesc) {
      const { parent, key } = lastNodeDesc;
      if (parent && key && t.isUnaryExpression(parent[key], { operator: '!' })) {
        parent[key] = parent[key].argument;
      }
    }

    return ret;

    function visit(node, parent, key) {
      lastNodeDesc = { parent, key };

      if (t.isUnaryExpression(node, { operator: '!' })) {
        return node.argument;
      }

      if (t.isLogicalExpression(node)) {
        node.operator = node.operator === '&&' ? '||' : '&&';
        node.left = visit(node.left, node, 'left');
        node.right = visit(node.right, node, 'right');
        return node;
      }

      if (t.isBinaryExpression(node)) {
        let operator;
        switch (node.operator) {
          case '!==': operator = '==='; break;
          case '===': operator = '!=='; break;
          case '!=': operator = '=='; break;
          case '==': operator = '!='; break;
        }

        if (operator) {
          node.operator = operator;
          return node;
        }

        // Falls through to unary expression
      }

      return t.unaryExpression('!', node, true);
    }
  }

  // Takes an expressions and determines if it has
  // more nodes that could benifit from flipping than not.
  function shouldFlip(topNode, savings = 0) {
    visit(topNode);
    return savings > 0;

    function visit(node) {
      if (t.isUnaryExpression(node, { operator: '!' })) {
        savings++;
        return;
      }

      if (t.isLogicalExpression(node)) {
        visit(node.left);
        visit(node.right);
        return;
      }

      if (!(t.isBinaryExpression(node) && t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) > -1)) {
        // Binary expressions wouldn't hurut because we know how to flip them
        savings--;
      }
    }
  }

  function createPrevExpressionEater(keyword) {
    let key;
    switch (keyword) {
      case 'switch': key = 'discriminant'; break;
      case 'throw':
      case 'return': key = 'argument'; break;
      case 'if': key = 'test'; break;
      case 'for-in': key = 'right'; break;
    }

    return function(path) {
      if (!path.inList) {
        return;
      }

      const { node } = path;
      const prev = path.getSibling(path.key - 1);
      if (!prev.isExpressionStatement()) {
        return;
      }

      let seq = prev.node.expression;
      if (node[key]) {
        if (t.isSequenceExpression(seq)) {
          seq.expressions.push(node[key]);
        } else {
          seq = t.sequenceExpression([seq, node[key]]);
        }
      } else {
        if (t.isSequenceExpression(seq)) {
          const lastExpr = seq.expressions[seq.expressions.length - 1];
          seq.expressions[seq.expressions.length - 1] = t.unaryExpression('void', lastExpr, true);
        } else {
          seq = t.unaryExpression('void', seq, true);
        }
      }

      if (seq) {
        node[key] = seq;
        prev.remove();

        // Since we were able to merge some stuff it's possible that this has opened
        // oppurtinties for other transforms to happen.
        // TODO: Look into changing the traversal order from bottom to up to avoid
        // having to revisit things.
        if (path.parentPath.parent) {
          path.parentPath.parent[shouldRevisit] = true;
        }
      }
    };
  }
};
