"use strict";

function removeRvalIfUndefined(declaratorPath) {
  const rval = declaratorPath.get("init")
                              .evaluate();
  if (rval.confident === true && rval.value === undefined) {
    declaratorPath.node.init = null;
  }
}

function areAllBindingsNotSeen(declaratorPath, seenNames, t) {
  const id = declaratorPath.node.id;
  const names = t.getBindingIdentifiers(id);
  for (const name in names) {
    if (seenNames.has(name)) {
      return false;
    }
  }
  return true;
}

module.exports = function({ types: t }) {
  let names = null;
  let functionNesting = 0;
  return {
    name: "remove-undefined-if-possible",
    visitor: {
      Program: {
        enter() {
          names = new Set();
          functionNesting = 0;
        },
        exit() {
          names = null;
          functionNesting = 0;
        },
      },
      Function: {
        enter() {
          functionNesting++;
        },
        exit() {
          functionNesting--;
        },
      },
      Identifier(path) {
        names.add(path.node.name);
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
          if (functionNesting === 0) {
            // ignore global vars
            break;
          }
          for (const declarator of path.get("declarations")) {
            if (areAllBindingsNotSeen(declarator, names, t)) {
              removeRvalIfUndefined(declarator);
            }
          }
          break;
        }
      },
    },
  };
};
