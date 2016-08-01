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
    } else if (node.arguments.length === 0) {
      // Array() -> []
      path.replaceWith(t.arrayExpression([]));
    } else if (node.arguments.length > 1) {
      // Array(1,2,3) -> [1,2,3]
      path.replaceWith(t.arrayExpression(node.arguments));
    }
    // else
    // Array("Hello") -> Array("Hello")
    // Array(x) -> Array(x)
    return true;
  }
}

function replaceObject(t, path) {
  const { node } = path;
  if (t.isIdentifier(node.callee, { name: "Object" }) &&
    !path.scope.getBinding("Object")) {

    const isVoid0 = require("babel-helper-is-void-0")(t);
    const arg = node.arguments[0];
    const binding = arg && t.isIdentifier(arg) && path.scope.getBinding(arg.name);

    // Object() -> {}
    if (node.arguments.length === 0) {
      path.replaceWith(t.objectExpression([]));

    // Object([]) -> []
    } else if (arg.type === "ArrayExpression" ||
      t.isFunctionExpression(arg)) {
      path.replaceWith(arg);

    // Object(null) -> {}
    } else if (isVoid0(arg) ||
      arg.name === "undefined" ||
      arg.type === "NullLiteral" ||
      arg.type === "ObjectExpression" && arg.properties.length === 0) {
      path.replaceWith(t.objectExpression([]));

    // Object(localFn) -> localFn
    } else if (binding && binding.path.isFunction()) {
      path.replaceWith(arg);

    // Object({a:b}) -> {a:b}
    } else if (arg.type === "ObjectExpression") {
      path.replaceWith(arg);

    // new Object(a) -> Object(a)
    } else if (node.type === "NewExpression") {
      path.replaceWith(t.callExpression(node.callee, node.arguments));
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

        // Object() -> {}
        if (replaceObject(t, path)) {
          return;
        }
      },
      NewExpression(path) {
        // new Array() -> []
        if (replaceArray(t, path)) {
          return;
        }

        // new Object() -> {}
        if (replaceObject(t, path)) {
          return;
        }
      },
    },
  };
};
