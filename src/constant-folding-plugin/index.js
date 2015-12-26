'use strict';

const traverse = require('babel-traverse').default;

module.exports = ({ Plugin, types: t }) => {
  const seen = Symbol('seen');

  return {
    visitor: {

      // TODO: look into evaluating binding too (could result in more code, but gzip?)

      Expression(path) {
        const { node } = path;
        if (node[seen]) {
          return;
        }

        if (!path.isPure()) {
          return;
        }

        if (traverse.hasType(node, path.scope, 'Identifier', t.FUNCTION_TYPES)) {
          return;
        }

        // We have a transform that converts true/false to !0/!1
        if (t.isUnaryExpression(node, { operator: '!' }) && t.isNumericLiteral(node.argument)) {
          if (node.argument.value === 0 || node.argument.value === 1) {
            return;
          }
        }

        // void 0 is used for undefined.
        if (t.isUnaryExpression(node, { operator: 'void' }) &&
          t.isNumericLiteral(node.argument, { value: 0 })
        ) {
          return;
        }

        const res = path.evaluate();
        if (res.confident) {
          // Avoid fractions because they can be longer than the original expression.
          // There is also issues with number percision?
          if (typeof res.value === 'number' && !Number.isInteger(res.value)) {
            return;
          }

          // We have a different visitor that convert booleans to unaries
          if (typeof res.value === 'boolean') {

          }

          const node = t.valueToNode(res.value);
          node[seen] = true;
          path.replaceWith(node);
        }
      },
    },
  };
};
