"use strict";

module.exports = {
  isInitTypeValid: (init) => init.isObjectExpression(),

  isExpressionTypeValid: (expr) => expr.isAssignmentExpression(),

  getExpressionChecker: (objName, checkReference) => (expr) => {
    // checks expr is of form:
    // foo.a = rval

    const left = expr.get("left");
    if (!left.isMemberExpression()) {
      return false;
    }

    const obj = left.get("object"), prop = left.get("property");
    if (!obj.isIdentifier() || obj.node.name !== objName) {
      return false;
    }
    if (!prop.isIdentifier() && checkReference(prop)) {
      return false;
    }

    const right = expr.get("right");
    if (checkReference(right)) {
      return false;
    }

    return true;
  },

  extractAssignment: (expr) => [expr.node.left.property, expr.node.right],

  tryAddAssignment: (t, [left, right], init) =>
    init.properties.push(t.objectProperty(left, right)),
};
