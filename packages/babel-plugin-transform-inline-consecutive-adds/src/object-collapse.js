"use strict";

module.exports = {
  checkInitType: (init) => init.isObjectExpression(),

  checkExpressionType: (expr) => expr.isAssignmentExpression(),

  makeCheckExpression: (objName, references) => (expr) => {
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

  extractAddon: (expr) => [expr.node.left.property, expr.node.right],

  addAddon: (t, [left, right], init) =>
    init.node.properties.push(t.objectProperty(left, right)),
};
