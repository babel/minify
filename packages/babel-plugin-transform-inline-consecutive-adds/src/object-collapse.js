"use strict";

module.exports = {
  isInitTypeValid: (init) => init.isObjectExpression(),

  isExpressionTypeValid: (expr) => expr.isAssignmentExpression(),

  getExpressionChecker: (objName, references) => (expr) => {
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

    const right = expr.get("right");
    for (let ref of references) {
      if (ref.isDescendant(right)) {
        return false;
      }
      if (!prop.isIdentifier() && ref.isDescendant(prop)) {
        return false;
      }
    }
    return true;
  },

  extractAssignment: (expr) => [expr.node.left.property, expr.node.right],

  tryAddAssignment: (t, [left, right], init) =>
    init.properties.push(t.objectProperty(left, right)),
};
