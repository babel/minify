'use strict';

module.exports = function({ types: t }) {
  return {
    visitor: {
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
      },
    },
  };
};
