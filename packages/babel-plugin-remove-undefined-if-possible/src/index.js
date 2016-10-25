"use strict";

function removeRvalIfUndefined(declaratorPath) {
  const rval = declaratorPath.get("init")
                              .evaluate();
  if (rval.confident === true && rval.value === undefined) {
    declaratorPath.node.init = null;
  }
}

function isAnyLvalReferencedBefore(declaratorPath, seenNames, t) {
  const id = declaratorPath.node.id;
  const names = t.getBindingIdentifiers(id);
  for (const name in names) {
    if (seenNames.has(name)) {
      return true;
    }
  }
  return false;
}

module.exports = function({ types: t }) {
  let functionStack = null;
  let functionLoopStack = null;
  let functionToNamesMap = null;
  return {
    name: "remove-undefined-if-possible",
    visitor: {
      Program: {
        enter(path) {
          functionStack = [];
          functionLoopStack = [];
          functionToNamesMap = new Map();
        },
        exit(path) {
          functionStack = null;
          functionLoopStack = null;
          functionToNamesMap = null;
        },
      },
      Function: {
        enter(path) {
          functionStack.push(path);
          functionLoopStack.push(path);
          functionToNamesMap.set(path, new Set());
        },
        exit(path) {
          functionStack.pop();
          functionLoopStack.pop();
          functionToNamesMap.delete(path);
        },
      },
      Loop: {
        enter(path) {
          functionLoopStack.push(path);
        },
        exit(path) {
          functionLoopStack.pop();
        },
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
      Identifier(path) {
        // potential optimization: only store ids that are lvals, instead of all
        // ids
        if (functionStack.length > 0) {
          functionToNamesMap.get(functionStack[functionStack.length - 1])
                            .add(path.node.name);
        }
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
          if (functionLoopStack.length === 0) {
            // ignore global variables
            break;
          }
          const fnOrLoop = functionLoopStack[functionLoopStack.length - 1];
          if (t.isLoop(fnOrLoop)) {
            break;
          }
          for (const declarator of path.get("declarations")) {
            if (!isAnyLvalReferencedBefore(declarator,
                functionToNamesMap.get(fnOrLoop), t)) {
              removeRvalIfUndefined(declarator);
            }
          }
          break;
        }
      },
    },
  };
};
