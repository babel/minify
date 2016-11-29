"use strict";

const NotImplementedError = Error("NotImplementedError");

class Collapser {
  isInitTypeValid() {
    throw NotImplementedError;
  }

  isExpressionTypeValid() {
    throw NotImplementedError;
  }

  getExpressionChecker() {
    throw NotImplementedError;
  }

  extractAssignment() {
    throw NotImplementedError;
  }

  tryAddAssignment() {
    throw NotImplementedError;
  }

  isSizeSmaller() {
    return true;
  }
}

module.exports = Collapser;
