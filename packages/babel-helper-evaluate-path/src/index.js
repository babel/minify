"use strict";

module.exports = function evaluate(path, t) {
  if (!t) {
    throw new Error("Expected babel-types");
  }
  if (path.isReferencedIdentifier()) {
    return evaluateIdentifier(path);
  }

  const state = {
    confident: true
  };

  // prepare
  path.traverse({
    Scope(scopePath) {
      scopePath.skip();
    },
    ReferencedIdentifier(idPath) {
      const binding = idPath.scope.getBinding(idPath.node.name);
      // don't deopt globals
      // let babel take care of it
      if (!binding) return;

      const evalResult = evaluateIdentifier(idPath);
      if (evalResult.confident) {
        idPath.replaceWith(t.valueToNode(evalResult.value));
        deref(idPath, binding);
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

  // referenced in a different scope - deopt
  if (shouldDeoptBasedOnScope(binding, path)) {
    return deopt(path);
  }

  // let/var/const referenced before init
  // or "var" referenced in an outer scope
  const flowEvalResult = evaluateBasedOnControlFlow(binding, path);

  if (flowEvalResult.confident) {
    return flowEvalResult;
  }

  if (flowEvalResult.shouldDeopt) {
    return deopt(path);
  }

  return path.evaluate();
}

// check if referenced in a different fn scope
// we can't determine if this function is called sync or async
// if the binding is in program scope
// all it's references inside a different function should be deopted
function shouldDeoptBasedOnScope(binding, refPath) {
  if (binding.scope.path.isProgram() && refPath.scope !== binding.scope) {
    return true;
  }
  return false;
}

function evaluateBasedOnControlFlow(binding, refPath) {
  if (binding.kind === "var") {
    // early-exit
    const declaration = binding.path.parentPath;
    if (
      declaration.parentPath.isIfStatement() ||
      declaration.parentPath.isLoop()
    ) {
      return { shouldDeopt: true };
    }

    let blockParent = binding.path.scope.getBlockParent().path;
    const fnParent = binding.path.getFunctionParent();

    if (blockParent === fnParent) {
      if (!fnParent.isProgram()) blockParent = blockParent.get("body");
    }

    // detect Usage Outside Init Scope
    if (!blockParent.get("body").some(stmt => stmt.isAncestor(refPath))) {
      return { shouldDeopt: true };
    }

    // Detect usage before init
    const stmts = fnParent.isProgram()
      ? fnParent.get("body")
      : fnParent.get("body").get("body");

    const state = {
      binding: null,
      reference: null
    };

    for (const [idx, stmt] of stmts.entries()) {
      if (stmt.isAncestor(binding.path)) {
        state.binding = { idx };
      }
      for (const ref of binding.referencePaths) {
        if (ref === refPath && stmt.isAncestor(ref)) {
          state.reference = {
            idx,
            scope: binding.path.scope === ref.scope ? "current" : "other"
          };
          break;
        }
      }
    }

    if (state.reference && state.binding) {
      if (
        state.reference.scope === "current" &&
        state.reference.idx < state.binding.idx
      ) {
        return { confident: true, value: void 0 };
      }

      return { shouldDeopt: true };
    }
  } else if (binding.kind === "let" || binding.kind === "const") {
    // binding.path is the declarator
    const declarator = binding.path;

    let scopePath = declarator.scope.path;

    if (scopePath.isFunction()) {
      scopePath = scopePath.get("body");
    }

    // Detect Usage before Init
    const stmts = scopePath.get("body");

    const state = {
      binding: null,
      reference: null
    };

    for (const [idx, stmt] of stmts.entries()) {
      if (stmt.isAncestor(binding.path)) {
        state.binding = { idx };
      }
      for (const ref of binding.referencePaths) {
        if (ref === refPath && stmt.isAncestor(ref)) {
          state.reference = {
            idx,
            scope: binding.path.scope === ref.scope ? "current" : "other"
          };
          break;
        }
      }
    }

    if (state.reference && state.binding) {
      if (
        state.reference.scope === "current" &&
        state.reference.idx < state.binding.idx
      ) {
        throw new Error(
          `ReferenceError: Used ${refPath.node.name}: ` +
            `${binding.kind} binding before declaration`
        );
      }
      if (state.reference.scope === "other") {
        return { shouldDeopt: true };
      }
    }
  }

  return { confident: false, shouldDeopt: false };
}

function deopt(deoptPath) {
  return {
    confident: false,
    deoptPath
  };
}

function deref(refPath, binding) {
  if (!refPath.isReferencedIdentifier()) {
    throw new Error(`Expected ReferencedIdentifier. Got ${refPath.type}`);
  }

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

  binding.referencePaths.splice(idx, 1);
}
