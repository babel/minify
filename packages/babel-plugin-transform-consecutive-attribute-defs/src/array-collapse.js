module.exports = {
  checkInitType: (init) => init.isArrayExpression(),

  checkExpressionType: (expr) => expr.isCallExpression(),

  makeCheckExpression: (objName, references) => (expr) => {
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
    for (let arg of args) {
      for (let ref of references) {
        if (ref.isDescendant(arg)) {
          return false;
        }
      }
    }
    return true;
  },

  extractAddon: (expr) => expr.node.arguments,

  addAddon: (t, args, init) =>
    args.map((a) => init.node.elements.push(a)),
};
