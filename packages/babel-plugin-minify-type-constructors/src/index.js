"use strict";

module.exports = function({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const { node } = path;

        // Boolean(foo) -> !!foo
        if (t.isIdentifier(node.callee, { name: "Boolean" }) &&
          node.arguments.length === 1 &&
          !path.scope.getBinding("Boolean")) {
          path.replaceWith(t.unaryExpression("!", t.unaryExpression("!", node.arguments[0], true), true));
          return;
        }

        // Number(foo) -> +foo
        if (t.isIdentifier(node.callee, { name: "Number" }) &&
          node.arguments.length === 1 &&
          !path.scope.getBinding("Number")) {
          path.replaceWith(t.unaryExpression("+", node.arguments[0], true));
          return;
        }

        // String(foo) -> foo + ''
        if (t.isIdentifier(node.callee, { name: "String" }) &&
          node.arguments.length === 1 &&
          !path.scope.getBinding("String")) {
          path.replaceWith(t.binaryExpression("+", node.arguments[0], t.stringLiteral("")));
          return;
        }
      },
    },
  };
};
