'use strict';

module.exports = ({ Plugin, types: t }) => {

  const VOID_0 = t.unaryExpression('void', t.literal(0), true);

  return new Plugin('simplify', {
    metadata: {
      group: 'builtin-pre',
    },

    visitor: {
      // undefined -> void 0
      ReferencedIdentifier(node) {
        if (node.name === 'undefined') {
          return VOID_0;
        }
      },

      // { 'foo': 'bar' } -> { foo: 'bar' }
      Property: {
        exit(node) {
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
        exit(node) {
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
      CallExpression(node, parent) {
        if (t.isIdentifier(node.callee, { name: 'Number' }) &&
          node.arguments.length === 1) {
          return t.unaryExpression('+', node.arguments[0], true);
        }

        if (t.isIdentifier(node.callee, { name: 'String' }) &&
          node.arguments.length === 1) {
          return t.binaryExpression('+', node.arguments[0], t.literal(''));
        }

        if (t.isFunctionExpression(node.callee)
            && t.isExpressionStatement(parent)) {
          return t.callExpression(
            t.unaryExpression('!', node.callee),
            node.arguments
          );
        }
      },

      // !foo && bar -> foo || bar
      LogicalExpression(node) {
        if (node.operator === '&&' &&
          t.isUnaryExpression(node.left, { operator: '!' })) {
          node.operator = '||';
          node.left = node.left.argument;
        }
      },

      // shorten booleans to a negation
      // true -> !0
      // false -> !1
      Literal(node) {
        if (typeof node.value === 'boolean') {
          return t.unaryExpression('!', t.literal(+!node.value), true);
        }
      },

      BinaryExpression: {
        enter: [
          // flip comparisons with a pure right hand value, this ensures
          // consistency with comparisons and increases the length of
          // strings that gzip can match
          // typeof blah === 'function' -> 'function' === typeof blah
          function (node) {
            if (t.EQUALITY_BINARY_OPERATORS.indexOf(node.operator) >= 0 &&
              this.get('right').isPure()) {
              let left = node.left;
              node.left = node.right;
              node.right = left;
            }
          },

          // simplify comparison operations if we're 100% certain
          // that each value will always be of the same type
          function (node) {
            let op = node.operator;
            if (op !== '===' && op !== '!==') {
              return;
            }

            let left  = this.get('left');
            let right = this.get('right');
            if (left.baseTypeStrictlyMatches(right)) {
              node.operator = node.operator.slice(0, -1);
            }
          },
        ],
      },

      // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
      // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
      ConditionalExpression(node) {
        flipNegation(node);
      },

      // hoist all function declarations
      Block(node) {
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

      // concat
      VariableDeclaration: {
        enter: [
          // concat variable declarations next to for loops with it's
          // initialisers if they're of the same variable kind
          function (node) {
            if (!this.inList) {
              return;
            }

            let next = this.getSibling(this.key + 1);
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
            this.dangerouslyRemove();
          },

          // concat variables of the same kind with their siblings
          function (node) {
            if (!this.inList) {
              return;
            }

            while (true) {
              let sibling = this.getSibling(this.key + 1);
              if (!sibling.isVariableDeclaration({ kind: node.kind })) {
                break;
              }

              node.declarations = node.declarations.concat(
                sibling.node.declarations
              );
              sibling.dangerouslyRemove();
            }
          },
        ],
      },

      // turn a for loop block block with single statement
      // loops into just the single statement
      For: {
        enter: [
          function(node, parent, scope) {
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

          function(node, parent, scope) {
            if (!this.inList || (node.init && !t.isExpression(node.init))) {
              return;
            }

            let res = priorStatementsToSequence(this);
            if (!res) {
              return;
            }

            if (res.declars.length) {
              this.insertBefore(
                t.variableDeclaration('var', res.declars)
              );
            }
            res.spliceOut();
            let seq = res.seq;

            if (node.init) {
              if (t.isSequenceExpression(seq)) {
                seq.expressions.push(node.init);
              } else {
                seq = t.sequenceExpression([seq, node.init]);
              }
            }

            node.init = seq;
          },
        ],
      },

      BlockStatement(node, parent, scope) {
        if (t.isFunction(parent) && node === parent.body) {
          return;
        }
        if (t.isTryStatement(parent) || t.isCatchClause(parent)) {
          return;
        }

        let res = toSequenceExpression(node.body);
        if (!res) {
          return;
        }

        if (res.declars.length) {
          this.parentPath.insertBefore(t.variableDeclaration('var', res.declars));
        }

        return t.expressionStatement(res.seq);
      },

      // Try to merge previous statements into a sequence
      ReturnStatement(node, parent, scope) {
        let res = priorStatementsToSequence(this);
        if (!res) {
          return;
        }

        if (res.declars.length) {
          this.insertBefore(t.variableDeclaration('var', res.declars));
        }
        res.spliceOut();
        let seq = res.seq;

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
          return t.returnStatement(seq);
        }
      },
      // turn blocked ifs into single statements
      IfStatement: {
        exit(node) {
          coerceIf('consequent');
          coerceIf('alternate');
          flipNegation(node);

          // No alternate, make into a guarded expression
          if (node.consequent && !node.alternate &&
              node.consequent.type === 'ExpressionStatement' &&
              !this.isCompletionRecord()) {
              return t.expressionStatement(
                t.logicalExpression('&&', node.test, node.consequent.expression)
              );
          }

          // Easy, both are expressions, turn into ternary
          if (t.isExpressionStatement(node.consequent) &&
              t.isExpressionStatement(node.alternate)) {
              return t.conditionalExpression(
                node.test, node.consequent.expression, node.alternate.expression
              );
          }

          // Alternate and consequent are returns turn into a return conditional
          if (t.isReturnStatement(node.consequent)
              && t.isReturnStatement(node.alternate)
              && !this.getSibling(this.key + 1).node) {

            return t.returnStatement(
              t.conditionalExpression(
                node.test,
                node.consequent.argument || VOID_0,
                node.alternate.argument
              )
            );
          }

          const next = this.getSibling(this.key + 1);

          // No alternate but the next statement is a return
          // also turn into a return conditional
          if (t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isReturnStatement()) {
            const nextArg = next.node.argument;
            next.dangerouslyRemove();
            return t.returnStatement(
              t.conditionalExpression(
                node.test, node.consequent.argument || VOID_0, nextArg
              )
            );
          }

          // Next is the last expression, turn into a return while void'ing the exprs
          if (!this.getSibling(this.key + 2).node && t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isExpressionStatement()) {
            const nextExpr = next.node.expression;
            next.dangerouslyRemove();
            if (node.consequent.argument) {
              return t.returnStatement(
                t.conditionalExpression(
                  node.test,
                  node.consequent.argument,
                  t.unaryExpression('void', nextExpr)
                )
              );
            }

            return t.returnStatement(
              t.binaryExpression('||', node.test, nextExpr)
            );
          }

          if (node.consequent && node.alternate &&
              (t.isReturnStatement(node.consequent) || (
                t.isBlockStatement(node.consequent)
                && t.isReturnStatement(
                     node.consequent.body[node.consequent.body.length - 1]
                   )
                ))
          ) {
            this.insertAfter(
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
      },

      WhileStatement(node) {
        return t.forStatement(null, node.test, null, node.body);
      },
    },
  });

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

  function priorStatementsToSequence(path) {
    if (!path.inList) {
      return;
    }

    let i = 0;
    let res;
    let statements;
    while (!res && i < path.key) {
      statements = path.container.slice(i, path.key);
      res = toSequenceExpression(statements);
      if (!res) {
        i += 1;
      }
    }

    if (!res) {
      return;
    }

    // We need to make sure we're removing the declerations pushed
    // to scope.
    const start = path.key - statements.length;
    return {
      spliceOut: () => {
        path.container.splice(start, statements.length);
        path.updateSiblingKeys();
      },
      seq: res.seq,
      declars: res.declars,
    };
  }

  // Adapted from babel's converters. Differences is that it doesn't
  // automatically push to the scope and it doesn't care about
  // completion records.
  function toSequenceExpression(statements) {
    const declars = [];
    let bailed = false;

    let seq = convert(statements);
    if (bailed) {
      return;
    }

    return { seq, declars };

    function convert(nodes) {
      let exprs = [];

      for (let node of nodes) {
        if (t.isExpression(node)) {
          exprs.push(node);
        } else if (t.isExpressionStatement(node)) {
          exprs.push(node.expression);
        } else if (t.isVariableDeclaration(node)) {
          if (node.kind !== 'var') {
            bailed = true;
            return;
          }

          for (let declar of node.declarations) {
            let bindings = t.getBindingIdentifiers(declar);
            for (let key in bindings) {
              declars.push(t.variableDeclarator(bindings[key]));
            }

            if (declar.init) {
              exprs.push(
                t.assignmentExpression('=', declar.id, declar.init)
              );
            }
          }

          continue;
        } else if (t.isIfStatement(node)) {
          const consequent = node.consequent ? convert([node.consequent]) : VOID_0;
          const alternate = node.alternate ? convert([node.alternate]) : VOID_0;
          if (!consequent || !alternate) {
            bailed = true;
            return;
          }

          exprs.push(t.conditionalExpression(node.test, consequent, alternate));
        } else if (t.isBlockStatement(node)) {
          exprs.push(convert(node.body));
        } else {
          // bailed, we can't turn this statement into an expression
          bailed = true;
          return;
        }
      }

      if (exprs.length === 1) {
        return exprs[0];
      } else {
        return t.sequenceExpression(exprs);
      }
    }
  }

};


/*
      // TODO: this doesn't take into account variable declerations
      // turn program body into sequence expression
      Program(node, parent, scope) {
        let seq = t.toSequenceExpression(node.body, scope);
        if (seq) {
          node.body = [seq];
        }
      },
*/
