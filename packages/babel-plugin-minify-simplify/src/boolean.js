const isNumber = path =>
  path.isNumericLiteral() ||
  (path.isUnaryExpression({ operator: "-" }) &&
    path.get("argument").isNumericLiteral());

const isSpecificNumber = (path, number) =>
  path.isNumericLiteral({ value: number }) ||
  (path.isUnaryExpression({ operator: "-" }) &&
    path.get("argument").isNumericLiteral({ value: -number }));

module.exports = t => path => {
  const isTripleEquals = (p = path) =>
    p.isBinaryExpression({ operator: "!==" }) ||
    p.isBinaryExpression({ operator: "===" });

  const isDoubleEquals = (p = path) =>
    p.isBinaryExpression({ operator: "!=" }) ||
    p.isBinaryExpression({ operator: "==" });

  const isEquals = (p = path) => isTripleEquals(p) || isDoubleEquals(p);

  const isNegatedEqual = (p = path) =>
    p.isBinaryExpression({ operator: "!==" }) ||
    p.isBinaryExpression({ operator: "!=" });

  // if (!!foo) {} >-> if (foo) {}
  if (
    path.isUnaryExpression({ operator: "!" }) &&
    path.get("argument").isUnaryExpression({ operator: "!" })
  ) {
    path.replaceWith(path.get("argument.argument"));
  }

  // if (!(foo === bar)) {} >-> if (foo !== bar) {}
  // if (!(foo !== bar)) {} >-> if (foo === bar) {}
  if (
    path.isUnaryExpression({ operator: "!" }) &&
    isEquals(path.get("argument"))
  ) {
    const argument = path.get("argument");
    if (isNegatedEqual(argument)) {
      argument.node.operator = argument.node.operator.replace("!", "=");
    } else {
      // String#replace() only changes the first match
      argument.node.operator = argument.node.operator.replace("=", "!");
    }
    path.replaceWith(argument);
  }

  // if (foo === -1) {} >-> if (!~foo) {}
  // if (foo !== -1) {} >-> if (~foo) {}
  if (isEquals()) {
    let comparator = null;
    if (isSpecificNumber(path.get("left"), -1)) {
      comparator = path.node.right;
    } else if (isSpecificNumber(path.get("right"), -1)) {
      comparator = path.node.left;
    }

    if (comparator) {
      const tilde = t.unaryExpression("~", comparator);
      if (isNegatedEqual()) {
        path.replaceWith(tilde);
      } else {
        path.replaceWith(t.unaryExpression("!", tilde));
      }
    }
  }

  // if (foo != 1) {} >-> if (foo^1) {}
  if (
    path.isBinaryExpression({ operator: "!=" }) &&
    (isNumber(path.get("left")) || isNumber(path.get("right")))
  ) {
    path.node.operator = "^";
  }
};
