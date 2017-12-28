"use strict";

const VOID_0 = t => t.unaryExpression("void", t.numericLiteral(0), true);

const isExpression = (t, node, typeSymbol) =>
  typeof typeSymbol !== "symbol" ? false : t.isExpression(node);

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
    if (isExpression(t, inputPath.node, patternValue)) return true;
    const evalResult = inputPath.evaluate();
    if (!evalResult.confident || !inputPath.isPure()) return false;
    return evalResult.value === patternValue;
  };

module.exports = {
  VOID_0,
  isPatternMatchesPath
};
