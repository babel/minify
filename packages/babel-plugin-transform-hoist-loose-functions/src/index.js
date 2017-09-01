"use strict";

function hasStrictModeDirective(path) {
  const { directives } = path.isProgram() ? path.node : path.node.body;
  return directives.some(
    d =>
      d.value &&
      d.value.type === "DirectiveLiteral" &&
      d.value.value === "use strict"
  );
}

function isStrictMode(path) {
  while (path) {
    if (hasStrictModeDirective(path)) {
      return true;
    }
    path = path.getFunctionParent();
  }
  return false;
}

function isHoisted(path, parent) {
  let children = parent.get("body");
  if (parent.isFunctionDeclaration()) {
    children = children.get("body");
  }

  for (const child of children) {
    if (!child.isFunctionDeclaration()) return false;
    if (child === path) return true;
  }
  return false;
}

function findFirstNonFn(path) {
  let children = path.get("body");
  if (path.isFunctionDeclaration()) {
    children = children.get("body");
  }

  for (const child of children) {
    if (!child.isFunctionDeclaration()) return child;
  }
  return null;
}

module.exports = function({ types: t }) {
  return {
    name: "transform-hoist-loose-functions",
    visitor: {
      FunctionDeclaration(path) {
        const fn = path.getFunctionParent();
        if (
          (fn.isFunctionDeclaration() ||
            fn.isFunctionExpression() ||
            fn.isProgram()) &&
          !isHoisted(path, fn) &&
          !isStrictMode(fn)
        ) {
          const newFn = t.clone(path.node);
          const firstNonFn = findFirstNonFn(fn);
          if (firstNonFn) {
            firstNonFn.insertBefore(newFn);
          } else {
            fn.get("body").pushContainer("body", newFn);
          }
          path.remove();
        }
      }
    }
  };
};
