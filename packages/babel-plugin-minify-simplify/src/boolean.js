const isMinusOne = path =>
  path.isUnaryExpression({ operator: "-" }) &&
  path.get("argument").isNumericLiteral({ value: 1 });

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
    if (isMinusOne(path.get("left"))) {
      comparator = path.node.right;
    } else if (isMinusOne(path.get("right"))) {
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

  // if (foo != bar) {} >-> if (foo^bar) {}
  if (path.isBinaryExpression({ operator: "!=" })) {
    path.node.operator = "^";
  }
};
