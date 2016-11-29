"use strict";

const NotImplementedError = Error("NotImplementedError");

class Collapser {
  isInitTypeValid(init) {
    throw NotImplementedError;
  }

  isExpressionTypeValid(expr) {
    throw NotImplementedError;
  }

  getExpressionChecker(objName, checkReference) {
    throw NotImplementedError;
  }

  extractAssignment(expr) {
    throw NotImplementedError;
  }

  tryAddAssignment(t, expr, init) {
    throw NotImplementedError;
  }

  isSizeSmaller(obj) {
    return true;
  }
}

module.exports = Collapser;
