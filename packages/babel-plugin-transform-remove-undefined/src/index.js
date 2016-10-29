"use strict";

function removeRvalIfUndefined(declaratorPath) {
  const rval = declaratorPath.get("init")
                              .evaluate();
  if (rval.confident === true && rval.value === undefined) {
    declaratorPath.node.init = null;
  }
}

function getLoopParent(path, scopeParent) {
  const parent = path.findParent((p) => p.isLoop() || p === scopeParent);
  // don't traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionParent(path, scopeParent) {
  const parent = path.findParent((p) => p.isFunction());
  // don't traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionReferences(path, scopeParent, references = []) {
  for (let func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
    const id = func.node.id;
    const binding = id && func.scope.getBinding(id.name);

    if (!binding) {
      continue;
    }

    binding.referencePaths.forEach((path) => {
      if (references.indexOf(path) == -1) {
        references.push(path);
        getFunctionReferences(path, scopeParent, references);
      }
    });
  }
  return references;
}

module.exports = function({ types: t }) {
  let names = null;
  let functionNesting = 0;
  return {
    name: "remove-undefined-if-possible",
    visitor: {
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
          const { node, scope } = path;
          for (const declarator of path.get("declarations")) {
            const binding = scope.getBinding(declarator.node.id.name);
            if (!binding) {
              continue;
            }

            const { start } = node;
            const scopeParent = declarator.getFunctionParent();

            const violation = binding.constantViolations.some(v => {
              const violationStart = v.node.start;
              if (violationStart < start) {
                return true;
              }

              var references = getFunctionReferences(v, scopeParent);
              for (let ref of references) {
                if (ref.node.start < start) {
                  return true;
                }
              }

              for (let loop = getLoopParent(declarator, scopeParent); loop; loop = getLoopParent(loop, scopeParent)) {
                if (loop.node.end > violationStart) {
                  return true;
                }
              }
            });

            if (!violation) {
              removeRvalIfUndefined(declarator);
            }
          }
          break;
        }
      },
    },
  };
};
