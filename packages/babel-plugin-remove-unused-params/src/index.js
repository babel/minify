"use strict";

function isIdentifierReferenced(id, scope) {
  const binding = scope.getBinding(id.node.name);
  if (!binding) {
    return false;
  }
  return binding.references > 0;
}

function isLvalReferenced(lval, scope, t) {
  if (t.isIdentifier(lval)) {
    return isIdentifierReferenced(lval, scope);
  }
  let isAnyIdReferenced = false;
  lval.traverse({
    Identifier(path) {
      if (isIdentifierReferenced(path, scope)) {
        isAnyIdReferenced = true;
      }
    }
  });
  return isAnyIdReferenced;
}

module.exports = function({ types: t }) {
  return {
    name: "remove-unused-params",
    visitor: {
      Function(path) {
        const lvals = path.get("params");
        const isReferenced = lvals.map(
          (lval) => isLvalReferenced(lval, path.scope, t));
        for (let i = lvals.length - 1; i >= 0; i--) {
          if (isReferenced[i] === true) {
            break;
          }
          lvals[i].remove();
        }
      },
    },
  };
};
