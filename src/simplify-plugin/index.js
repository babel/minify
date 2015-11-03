'use strict';

module.exports = ({ Plugin, types: t }) => {
  const VOID_0 = t.unaryExpression('void', t.numericLiteral(0), true);
  const seen = Symbol('seen');

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
          if (t.isLiteral(key) && t.isValidIdentifier(key.value)) {
            // 'foo': 'bar' -> foo: 'bar'
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },

      // foo['bar'] -> foo.bar
      MemberExpression: {
        exit({ node }) {
          let prop = node.property;
          if (node.computed && t.isLiteral(prop) &&
            t.isValidIdentifier(prop.value)) {
            // foo['bar'] => foo.bar
            node.property = t.identifier(prop.value);
            node.computed = false;
          }
        },
      },

      // Number(foo) -> +foo
      CallExpression(path) {
        const {node, parent } = path;

        if (t.isIdentifier(node.callee, { name: 'Number' }) &&
          node.arguments.length === 1) {
          path.replaceWith(t.unaryExpression('+', node.arguments[0], true));
          return;
        }

        if (t.isIdentifier(node.callee, { name: 'String' }) &&
          node.arguments.length === 1) {
          path.replaceWith(t.binaryExpression('+', node.arguments[0], t.stringLiteral('')));
          return;
        }

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

            if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 &&
              path.get('right').isPure()) {
              let left = node.left;
              node.left = node.right;
              node.right = left;
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

      // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
      // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
      ConditionalExpression({ node }) {
        flipNegation(node);
      },

/* Path is just removing functions for some reason?
      // hoist all function declarations
      Block({ node }) {
        let top = [];
        let bottom = [];

        for (let i = 0; i < node.body.length; i++) {
          let bodyNode = node.body[i];
          if (t.isFunctionDeclaration(bodyNode)) {
            top.push(bodyNode);
          } else {
            bottom.push(bodyNode);
          }
        }

        node.body = top.concat(bottom);
      },
*/

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


      ForStatement(path) {
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

      Program({ node }) {
        const statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length) {
          return;
        }
        node.body = statements;
      },

      BlockStatement(path) {
        const { node, parent } = path;
        const statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length || node[seen]) {
          return;
        }

        if (statements.length > 1 || (t.isFunction(parent) && node === parent.body) ||
            t.isTryStatement(parent) || t.isCatchClause(parent)) {
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
        }
      },
      // turn blocked ifs into single statements
      IfStatement: {
        exit: [
          function(path) {
            const { node } = path;

            coerceIf('consequent');
            coerceIf('alternate');
            flipNegation(node);

            // No alternate, make into a guarded expression
            if (node.consequent && !node.alternate &&
                node.consequent.type === 'ExpressionStatement' &&
                !path.isCompletionRecord()) {
                path.replaceWith(
                  t.expressionStatement(
                    t.logicalExpression('&&', node.test, node.consequent.expression)
                  )
                );
                return;
            }

            // Easy, both are expressions, turn into ternary
            if (t.isExpressionStatement(node.consequent) &&
                t.isExpressionStatement(node.alternate)) {
              path.replaceWith(
                t.conditionalExpression(
                  node.test, node.consequent.expression, node.alternate.expression
                )
              );
              return;
            }

            // Alternate and consequent are returns turn into a return conditional
            if (t.isReturnStatement(node.consequent)
                && t.isReturnStatement(node.alternate)
                && !path.getSibling(path.key + 1).node) {
              path.replaceWith(
                t.returnStatement(
                  t.conditionalExpression(
                    node.test,
                    node.consequent.argument || VOID_0,
                    node.alternate.argument
                  )
                )
              );
              return;
            }

            const next = path.getSibling(path.key + 1);

            // No alternate but the next statement is a return
            // also turn into a return conditional
            if (t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isReturnStatement()) {
                const nextArg = next.node.argument;
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
            if (!path.getSibling(path.key + 2).node && t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isExpressionStatement()) {
                const nextExpr = t.unaryExpression('void', next.node.expression);
                next.remove();
                if (node.consequent.argument) {
                  path.replaceWith(
                    t.returnStatement(
                      t.conditionalExpression(
                        node.test,
                        node.consequent.argument,
                        nextExpr
                      )
                    )
                  );
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.logicalExpression('||', node.test, nextExpr)
                  )
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

          function ({ node }) {
            if (!t.isIfStatement(node.consequent)) {
              return;
            }
            if (node.alternate && node.consequent.alternate) {
              return;
            }

            if (node.consequent.alternate) {
              node.alternate = node.consequent.alternate;
            }

            node.test = t.logicalExpression('&&', node.test, node.consequent.test);
            node.consequent = node.consequent.consequent;
          },

          function(path) {
            const { node } = path;

            if (!path.inList || node.alternate ||
                !(t.isReturnStatement(node.consequent) && !node.consequent.argument) ||
                !path.parentPath.parentPath.isFunction()) {
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

          if (!alternate) {
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

      return { seq };
    }
  }

};


/*
      // TODO: path doesn't take into account variable declerations
      // turn program body into sequence expression
      Program(node, parent, scope) {
        let seq = t.toSequenceExpression(node.body, scope);
        if (seq) {
          node.body = [seq];
        }
      },
*/
