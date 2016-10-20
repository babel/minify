"use strict";

function isInLocalLoop(path, t) {
  if (path === null) {
    return false;
  } else if (t.isLoop(path)) {
    return true;
  } else if (t.isFunction(path)) {
    return false;
  } else {
    return isInLocalLoop(path.parentPath, t);
  }
}

function removeRvalIfUndefined(declaratorPath) {
  const rval = declaratorPath.get("init")
                              .evaluate();
  if (rval.confident === true && rval.value === undefined) {
    declaratorPath.node.init = null;
  }
}

function isAnyLvalReferencedBefore(declaratorPath, seenIds, t) {
  const id = declaratorPath.node.id;
  const ids = t.getBindingIdentifiers(id);
  for (const name in ids) {
    if (seenIds.has(name)) {
      return true;
    }
  }
  return false;
}

function removeUndefinedAssignments(functionPath, t) {
  const seenIds = new Set();
  functionPath.traverse({
    Function(path) {
      path.skip();
    },
    Identifier(path) {
      // potential optimization: only store ids that are lvals of assignments.
      seenIds.add(path.node.name);
    },
    VariableDeclaration(path) {
      switch (path.node.kind) {
      case "const":
        break;
      case "let":
        for (const declarator of path.get("declarations")) {
          removeRvalIfUndefined(declarator);
        }
        break;
      case "var":
        if (!t.isFunction(functionPath) || isInLocalLoop(path.parentPath, t)) {
          break;
        }
        for (const declarator of path.get("declarations")) {
          if (!isAnyLvalReferencedBefore(declarator, seenIds, t)) {
            removeRvalIfUndefined(declarator);
          }
        }
        break;
      }
    },
  });
}

module.exports = function({ types: t }) {
  return {
    name: "remove-undefined-if-possible",
    visitor: {
      FunctionParent(path) {
        removeUndefinedAssignments(path, t);
      },
      ReturnStatement(path) {
        if (path.node.argument !== null) {
          const rval = path.get("argument")
                           .evaluate();
          if (rval.confident === true && rval.value === undefined) {
            path.node.argument = null;
          }
        }
      },
    },
  };
};
