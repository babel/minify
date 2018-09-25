"use strict";

const operators = new Set([
  "+",
  "-",
  "*",
  "%",
  "<<",
  ">>",
  ">>>",
  "&",
  "|",
  "^",
  "/",
  "**"
]);

const updateOperators = new Set(["+", "-"]);

module.exports = t => {
  function simplify(path) {
    const rightExpr = path.node.right;
    const leftExpr = path.node.left;

    if (path.node.operator !== "=") {
      return;
    }

    const canBeUpdateExpression =
      t.isNumericLiteral(rightExpr.right) &&
      rightExpr.right.value === 1 &&
      updateOperators.has(rightExpr.operator);

    if (t.isMemberExpression(leftExpr)) {
      const leftPropNames = getPropNames(leftExpr);
      const rightPropNames = getPropNames(rightExpr.left);

      if (
        !leftPropNames ||
        leftPropNames.indexOf(undefined) > -1 ||
        !rightPropNames ||
        rightPropNames.indexOf(undefined) > -1 ||
        !operators.has(rightExpr.operator) ||
        !areArraysEqual(leftPropNames, rightPropNames)
      ) {
        return;
      }
    } else {
      if (
        !t.isBinaryExpression(rightExpr) ||
        !operators.has(rightExpr.operator) ||
        leftExpr.name !== rightExpr.left.name
      ) {
        return;
      }
    }

    let newExpression;

    // special case x=x+1 --> ++x
    if (canBeUpdateExpression) {
      newExpression = t.updateExpression(
        rightExpr.operator + rightExpr.operator,
        t.clone(leftExpr),
        true /* prefix */
      );
    } else {
      newExpression = t.assignmentExpression(
        rightExpr.operator + "=",
        t.clone(leftExpr),
        t.clone(rightExpr.right)
      );
    }

    path.replaceWith(newExpression);
  }

  function getPropNames(node) {
    if (!t.isMemberExpression(node)) {
      return;
    }

    const prop = node.property;
    const propNames = [getName(prop)];

    let obj = node.object;

    while (t.isMemberExpression(obj)) {
      const currentNode = obj.property;
      if (currentNode) {
        propNames.push(getName(currentNode));
      }
      obj = obj.object;
    }

    propNames.push(getName(obj));

    return propNames;
  }

  function getName(node) {
    if (t.isThisExpression(node)) {
      return "this";
    }
    if (t.isSuper(node)) {
      return "super";
    }
    if (t.isNullLiteral(node)) {
      return "null";
    }

    // augment identifiers so that they don't match
    // string/number literals
    // but still match against each other
    return node.name ? node.name + "_" : node.value /* Literal */;
  }

  return {
    simplify
  };
};

function areArraysEqual(arr1, arr2) {
  return arr1.every((value, index) => {
    return String(value) === String(arr2[index]);
  });
}
