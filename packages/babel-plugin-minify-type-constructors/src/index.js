"use strict";

function replaceArray(t, path) {
  const { node } = path;
  if (t.isIdentifier(node.callee, { name: "Array" }) &&
    !path.scope.getBinding("Array")) {

    // Array(5) -> [,,,,,]
    if (node.arguments.length === 1 &&
      typeof node.arguments[0].value === "number") {

      // "Array(7)" is shorter than "[,,,,,,,]"
      if (node.arguments[0].value <= 6) {
        path.replaceWith(t.arrayExpression(Array(node.arguments[0].value).fill(null)));

      // new Array(7) -> Array(7)
      } else if (node.type === "NewExpression") {
        path.replaceWith(t.callExpression(node.callee, node.arguments));
      }

    // Array("Hello") -> ["Hello"]
    } else {
      path.replaceWith(t.arrayExpression(node.arguments));
    }
    return true;
  }
}

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

        // Array() -> []
        if (replaceArray(t, path)) {
          return;
        }
      },
      NewExpression(path) {
        // new Array() -> []
        if (replaceArray(t, path)) {
          return;
        }
      },
    },
  };
};
