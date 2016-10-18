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
  const id = declaratorPath.get("id");
  if (t.isIdentifier(id)) {
    return seenIds.has(id.node.name);
  }
  let hasReference = false;
  id.traverse({
    Identifier(path) {
      if (seenIds.has(path.node.name)) {
        hasReference = true;
      }
    }
  });
  return hasReference;
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
        path.node.declarations.forEach((declarator, index) => {
          const declaratorPath = path.get("declarations")[index];
          removeRvalIfUndefined(declaratorPath);
        });
        break;
      case "var":
        if (!t.isFunction(functionPath)) {
          break;
        }
        if (isInLocalLoop(path.parentPath, t)) {
          break;
        }
        path.node.declarations.forEach((declarator, index) => {
          const declaratorPath = path.get("declarations")[index];
          if (!isAnyLvalReferencedBefore(declaratorPath, seenIds, t)) {
            removeRvalIfUndefined(declaratorPath);
          }
        });
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
