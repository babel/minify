"use strict";

function isPureAndUndefined(rval) {
  if (rval.isIdentifier() &&
    rval.node.name === "undefined") {
    return true;
  }
  if (!rval.isPure()) {
    return false;
  }
  const evaluation = rval.evaluate();
  return evaluation.confident === true && evaluation.value === undefined;
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

function getFunctionReferences(path, scopeParent, references = new Set()) {
  for (let func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
    const id = func.node.id;
    const binding = id && func.scope.getBinding(id.name);

    if (!binding) {
      continue;
    }

    binding.referencePaths.forEach((path) => {
      if (!references.has(path)) {
        references.add(path);
        getFunctionReferences(path, scopeParent, references);
      }
    });
  }
  return references;
}

function hasViolation(declarator, scope, start) {
  const binding = scope.getBinding(declarator.node.id.name);
  if (!binding) {
    return true;
  }

  const scopeParent = declarator.getFunctionParent();

  const violation = binding.constantViolations.some((v) => {
    // return 'true' if we cannot guarantee the violation references
    // the initialized identifier after
    const violationStart = v.node.start;
    if (violationStart === undefined || violationStart < start) {
      return true;
    }

    const references = getFunctionReferences(v, scopeParent);
    for (const ref of references) {
      if (ref.node.start === undefined || ref.node.start < start) {
        return true;
      }
    }

    for (let loop = getLoopParent(declarator, scopeParent); loop; loop = getLoopParent(loop, scopeParent)) {
      if (loop.node.end === undefined || loop.node.end > violationStart) {
        return true;
      }
    }
  });

  return violation;
}

module.exports = function() {
  return {
    name: "transform-remove-undefined",
    visitor: {
      ReturnStatement(path) {
        if (path.node.argument !== null) {
          if (isPureAndUndefined(path.get("argument"))) {
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
            if (isPureAndUndefined(declarator.get("init"))) {
              declarator.node.init = null;
            }
          }
          break;
        case "var":
          const start = path.node.start;
          if (start === undefined) {
            // This is common for plugin-generated nodes
            break;
          }
          const scope = path.scope;
          for (const declarator of path.get("declarations")) {
            if (isPureAndUndefined(declarator.get("init")) &&
                !hasViolation(declarator, scope, start)) {
              declarator.node.init = null;
            }
          }
          break;
        }
      },
    },
  };
};
