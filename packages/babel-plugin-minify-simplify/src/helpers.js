"use strict";

const VOID_0 = t => t.unaryExpression("void", t.numericLiteral(0), true);

// Types as Symbols - for comparing types
// init must be empty object -
// computing this involves checking object.keys() to be of length 0
// skipped otherwise
const types = {};
const typeSymbols = t => {
  // don't recompute
  if (Object.keys(types).length < 1) {
    t.TYPES.forEach(type => {
      types[type] = Symbol.for(type);
    });
  }
  return types;
};

const isNodeOfType = (t, node, typeSymbol) =>
  typeof typeSymbol !== "symbol"
    ? false
    : t["is" + Symbol.keyFor(typeSymbol)](node);

const isPatternMatchesPath = t =>
  function _isPatternMatchesPath(patternValue, inputPath) {
    if (Array.isArray(patternValue)) {
      for (let i = 0; i < patternValue.length; i++) {
        if (_isPatternMatchesPath(patternValue[i], inputPath)) {
          return true;
        }
      }
      return false;
    }
    if (typeof patternValue === "function") {
      return patternValue(inputPath);
    }
    if (isNodeOfType(t, inputPath.node, patternValue)) return true;
    const evalResult = inputPath.evaluate();
    if (!evalResult.confident || !inputPath.isPure()) return false;
    return evalResult.value === patternValue;
  };

module.exports = {
  VOID_0,
  // Types as Symbols
  typeSymbols,
  // This is required for resolving type aliases
  isNodeOfType,
  isPatternMatchesPath
};
