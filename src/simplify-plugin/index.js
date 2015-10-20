'use strict';

module.exports = ({ Plugin, types: t }) => {

  return new Plugin('simplify', {
    metadata: {
      group: 'builtin-pre',
    },

    visitor: {
      // undefined -> void 0
      ReferencedIdentifier: function (node) {
        if (node.name === 'undefined') {
          return t.unaryExpression('void', t.literal(0), true);
        }
      },

      // { 'foo': 'bar' } -> { foo: 'bar' }
      Property: {
        exit: function (node) {
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
        exit: function (node) {
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
      CallExpression: function (node) {
        if (t.isIdentifier(node.callee, { name: 'Number' }) &&
          node.arguments.length === 1) {
          return t.unaryExpression('+', node.arguments[0], true);
        }
      },

      // !foo && bar -> foo || bar
      LogicalExpression: function (node) {
        if (node.operator === '&&' &&
          t.isUnaryExpression(node.left, { operator: '!' })) {
          node.operator = '||';
          node.left = node.left.argument;
        }
      },

      // shorten booleans to a negation
      // true -> !0
      // false -> !1
      Literal: function (node) {
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
      ConditionalExpression: function (node) {
        flipNegation(node);
      },

      // hoist all function declarations
      Block: function (node) {
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
          // concat letiale declarations next to for loops with it's
          // initialisers if they're of the same letiable kind
          function (node) {
            if (!this.inList) {
              return;
            }

            let next = this.getSibling(this.key + 1);
            if (!next.isForStatement()) {
              return;
            }

            let init = next.get('init');
            if (!init.isLetiableDeclaration({ kind: node.kind })) {
              return;
            }

            init.node.declarations = node.declarations.concat(
              init.node.declarations
            );
            this.dangerouslyRemove();
          },

          // concat letiables of the same kind with their siblings
          function (node) {
            if (!this.inList) {
              return;
            }

            while (true) {
              let sibling = this.getSibling(this.key + 1);
              if (!sibling.isLetiableDeclaration({ kind: node.kind })) {
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
      For: function (node) {
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

      // turn block statements into sequence expression
      BlockStatement: function (node, parent, scope) {
        if (t.isFunction(parent) && node === parent.body) {
          return;
        }
        if (t.isTryStatement(parent) || t.isCatchClause(parent)) {
          return;
        }

        let seq = t.toSequenceExpression(node.body, scope);
        if (seq) {
          return t.expressionStatement(seq);
        }
      },

      // turn program body into sequence expression
      Program: function (node, parent, scope) {
        let seq = t.toSequenceExpression(node.body, scope);
        if (seq) {
          node.body = [seq];
        }
      },

      // turn blocked ifs into single statements
      IfStatement: {
        exit: function (node) {
          coerceIf('consequent');
          coerceIf('alternate');
          flipNegation(node);

          if (node.consequent && node.alternate &&
            (
              t.isReturnStatement(node.consequent) ||
              (t.isBlockStatement(node.consequent) &&
                t.isReturnStatement(
                  node.consequent.body[node.consequent.body.length - 1]
                )
              )
            )
          ) {
            this.insertAfter(
              t.isBlockStatement(node.alternate)
                ? node.alternate.body
            : node.alternate
            );
            node.alternate = null;
            return;
          }

          if (node.consequent && !node.alternate &&
            node.consequent.type === 'ExpressionStatement' &&
            !this.isCompletionRecord()) {
              return t.expressionStatement(
                t.logicalExpression('&&', node.test, node.consequent.expression)
              );
          }

          if (t.isExpressionStatement(node.consequent) &&
            t.isExpressionStatement(node.alternate)) {
              return t.conditionalExpression(
                node.test, node.consequent.expression, node.alternate.expression
              );
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
            if (t.isLetiableDeclaration(first) && first.kind !== 'let') {
              return;
            }

            node[key] = first;
          }
        },
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

    if (t.isUnaryExpression(test.type, { operator: '!' })) {
      node.test = test.argument;
      flip = true;
    }

    if (flip) {
      let consequent = node.consequent;
      node.consequent = node.alternate;
      node.alternate = consequent;
    }
  }
};
