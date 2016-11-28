"use strict";

module.exports = {
  isInitTypeValid: (init) => init.isNewExpression() &&
                           init.get("callee").isIdentifier() &&
                           init.node.callee.name === "Set" &&
                           // other iterables might not be inline-able, except for arrays
                           init.node.arguments.length === 0,

  isExpressionTypeValid: (expr) => expr.isCallExpression(),

  getExpressionChecker: (objName, references) => (expr) => {
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
        prop.node.name !== "add"
    ) {
      return false;
    }

    const args = expr.get("arguments");
    if (args.length !== 1) {
      return false;
    }
    for (let ref of references) {
      if (ref.isDescendant(args[0])) {
        return false;
      }
    }
    return true;
  },

  extractAssignment: (expr) => expr.node.arguments[0],

  tryAddAssignment: (t, arg, init) => {
    if (init.arguments.length === 0) {
      init.arguments.push(t.arrayExpression());
    }
    init.arguments[0].elements.push(arg);
  }
};
