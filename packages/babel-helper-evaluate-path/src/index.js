"use strict";

module.exports = function evaluate(path) {
  if (path.isIdentifier()) {
    return evaluateIdentifier(path);
  }

  const state = {
    deoptPath: null,
    confident: false
  };

  // prepare
  path.traverse({
    Scope(scopePath) {
      scopePath.skip();
    },
    ReferencedIdentifier(idPath) {
      const evalResult = evaluateIdentifier(idPath);
      if (evalResult.confident) {
        idPath.replaceWith(evalResult.value);
        deref(idPath);
      } else {
        state.confident = evalResult.confident;
        state.deoptPath = evalResult.deoptPath;
      }
    }
  });

  if (!state.confident) {
    return state;
  }

  try {
    return path.evaluate();
  } catch (e) {
    return {
      confident: false,
      error: e
    };
  }
};

// Original Source:
// https://github.com/babel/babel/blob/master/packages/babel-traverse/src/path/evaluation.js
// modified for Babili use
function evaluateIdentifier(path) {
  if (!path.isReferencedIdentifier()) {
    throw new Error(`Expected ReferencedIdentifier. Got ${path.type}`);
  }

  const { node } = path;

  const binding = path.scope.getBinding(node.name);

  if (!binding) {
    return deopt(path);
  }

  if (binding.constantViolations.length > 0) {
    return deopt(binding.path);
  }

  // let/var/const referenced before init
  // or "var" referenced in an outer scope
  if (shouldDeoptBasedOnFlow(binding, path)) {
    return deopt(path);
  }

  return path.evaluate();
}

function shouldDeoptBasedOnFlow(binding, refPath) {
  const decl = binding.path;
  const refs = binding.referencePaths;

  if (binding.kind === "var") {
    // early-exit
    const declaration = binding.path.parentPath;
    if (
      declaration.parentPath.isIfStatement() ||
      declaration.parentPath.isLoop()
    ) {
      return true;
    }

    let blockParent = binding.path.scope.getBlockParent().path;
    const fnParent = binding.path.getFunctionParent();

    if (blockParent === fnParent) {
      blockParent = blockParent.get("body");
    }

    detectUsageOutsideInitScope: {
      if (!blockParent.get("body").some(stmt => stmt.isAncestor(refPath))) {
        return true;
      }
    }

    detectUsageBeforeInit: {
      const stmts = fnParent.get("body").get("body");

      const state = stmts.map(stmt => {
        if (stmt.isAncestor(binding.path)) {
          return { type: "binding" };
        } else {
          for (const ref of binding.referencePaths) {
            if (stmt.isAncestor(ref)) {
              return {
                type: "ref"
              };
            }
          }
          return { type: "neither" };
        }
      });

      if (state[0].type === "ref") {
        return true;
      }
    }
  } else if (binding.kind === "let" || binding.kind === "const") {
    throw "not implemented";
  }

  return false;
}

function deopt(deoptPath) {
  return {
    confident: false,
    deoptPath
  };
}

function deref(refPath) {
  if (!refPath.isReferencedIdentifier()) {
    throw new Error(`Expected ReferencedIdentifier. Got ${refPath.type}`);
  }

  const binding = refPath.scope.getBinding(refPath.node.name);

  if (binding.references > 0) {
    binding.references--;
  }
  if (binding.references === 0) {
    binding.referenced = false;
  }
  const idx = binding.referencePaths.indexOf(refPath);

  if (idx < 0) {
    throw new Error("Unexpected Error. Scope not updated properly");
  }

  binding.referecePaths.splice(idx, 1);
}
