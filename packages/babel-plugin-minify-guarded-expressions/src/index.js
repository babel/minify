"use strict";

function getBlockPath(path) {
  var parent = path.findParent(function(p) {
    return p.isBlockStatement();
  });
  // return program path if null
  return parent !== null ? parent : path.getFunctionParent();
}

module.exports = function({ types: t }) {
  const flipExpressions = require("babel-helper-flip-expressions")(t);

  // identify defined check patterns like a && a.foo
  // a && a['foo']
  // should bail in this case if declaration is inside other block
  function isDefinedCheck(path, left, right) {
    if (t.isIdentifier(left) && t.isMemberExpression(right)) {
      const binding = path.scope.getBinding(left.node.name);
      // should bail only for var
      if (binding === null || binding.kind !== "var") {
        return false;
      }
      const expressionParent = getBlockPath(path);
      const bindingParent = getBlockPath(binding.path);
      // bail if referenced in the same block
      if (expressionParent !== bindingParent) {
        return true;
      }

      const { object } = right.node;
      return left.node.name !== object.name;
    }
    return false;
  }

  return {
    name: "minify-guarded-expressions",
    visitor: {
      // Convert guarded expressions
      // !a && b() --> a || b();
      // This could change the return result of the expression so we only do it
      // on things where the result is ignored.
      LogicalExpression: {
        enter: [
          function(path) {
            const { node } = path;

            const left = path.get("left");
            const right = path.get("right");

            // issues - 171, 174, 176
            // we assume that it is returned/assigned/part of a bigger expression
            // or utilized somehow
            // we check if we shouldBail only when evaluating
            // the rightside of the expression;
            // if the left side is evaluated to be deterministic,
            // we can safely replace the entire expression
            const shouldBail = !path.parentPath.isExpressionStatement();

            if (node.operator === "&&") {
              const leftTruthy = left.evaluateTruthy();
              if (leftTruthy === false) {
                // Short-circuit
                path.replaceWith(node.left);
              } else if (
                leftTruthy === true &&
                left.isPure() &&
                !isDefinedCheck(path, left, right)
              ) {
                path.replaceWith(node.right);
              } else if (
                right.evaluateTruthy() === false &&
                right.isPure() &&
                !shouldBail
              ) {
                path.replaceWith(node.left);
              }
            } else if (node.operator === "||") {
              const leftTruthy = left.evaluateTruthy();
              if (leftTruthy === false && left.isPure()) {
                path.replaceWith(node.right);
              } else if (leftTruthy === true) {
                // Short-circuit
                path.replaceWith(node.left);
              } else if (
                right.evaluateTruthy() === false &&
                right.isPure() &&
                !shouldBail
              ) {
                path.replaceWith(node.left);
              }
            }
          },

          function(path) {
            const { node } = path;

            if (flipExpressions.hasSeen(node)) {
              return;
            }

            if (
              !path.parentPath.isExpressionStatement() &&
              !(
                path.parentPath.isSequenceExpression() &&
                path.parentPath.parentPath.isExpressionStatement()
              )
            ) {
              return;
            }

            // Start counting savings from one since we can ignore the last
            // expression.
            if (flipExpressions.shouldFlip(node, 1)) {
              const newNode = flipExpressions.flip(node, true);
              path.replaceWith(newNode);
            }
          }
        ]
      }
    }
  };
};
