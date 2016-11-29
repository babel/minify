"use strict";

module.exports = {
  isInitTypeValid: (init) => init.isArrayExpression(),

  isExpressionTypeValid: (expr) => expr.isCallExpression(),

  getExpressionChecker: (objName, checkReference) => (expr) => {
    // checks expr is of form:
    // foo.push(rval1, ...)

    const callee = expr.get("callee");

    if (!callee.isMemberExpression()) {
      return false;
    }

    const obj = callee.get("object"), prop = callee.get("property");
    if (!obj.isIdentifier() ||
        obj.node.name !== objName ||
        !prop.isIdentifier() ||
        prop.node.name !== "push"
    ) {
      return false;
    }

    const args = expr.get("arguments");
    if (args.some(checkReference)) {
      return false;
    }
    return true;
  },

  extractAssignment: (expr) => expr.node.arguments,

  tryAddAssignment: (t, args, init) =>
    args.map((a) => init.elements.push(a)),
};
