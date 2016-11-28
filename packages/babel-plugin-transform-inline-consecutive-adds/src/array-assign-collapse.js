"use strict";

module.exports = {
  isInitTypeValid: (init) => init.isArrayExpression(),

  isExpressionTypeValid: (expr) => expr.isAssignmentExpression(),

  getExpressionChecker: (objName, references) => (expr) => {
    // checks expr is of form:
    // foo[num] = expr

    const left = expr.get("left");

    if (!left.isMemberExpression()) {
      return false;
    }

    const obj = left.get("object"), prop = left.get("property");
    if (!obj.isIdentifier() ||
        obj.node.name !== objName ||
        !prop.isNumericLiteral() ||
        prop.node.value < 0 ||
        !Number.isInteger(prop.node.value)) {
      return false;
    }

    const right = expr.get("right");
    for (let ref in references) {
      if (ref.isDescendant(right)) {
        return false;
      }
    }

    return true;
  },

  extractAssignment: (expr) => [expr.node.left.property.value, expr.get("right")],

  addAssignment: (t, [index, rval], init) => {
    const elements = init.elements;
    for (let i = elements.length; i <= index; i++) {
      elements.push(null);
    }
    elements[index] = rval.node;
  },

  isSizeSmaller: (initCopy, init, varDecl, assignments, statements) => {
    // We make an inexact calculation of how much space we save.
    // It's inexact because we don't know how whitespaces will get minimized,
    // and other factors.
    const statementsLength = statements[statements.length - 1].node.end - varDecl.node.end;

    // Approx. formula of increasing init's length =
    // (# commas added) + (all the rvals added), where
    // # commas added = (difference between the lengths of the old and new arrays)

    const numCommaAdded = initCopy.elements.length - init.elements.length;
    const sizeOfRvals = assignments.map(([, rval]) => rval.node.end - rval.node.start + 1)  // add 1 for space in front
                                   .reduce((a, b) => a + b, 0); // sum

    return (statementsLength > numCommaAdded + sizeOfRvals);
  },
};
