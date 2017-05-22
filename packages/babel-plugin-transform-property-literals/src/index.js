"use strict";

const esutils = require("esutils");

module.exports = function({ types: t }) {
  return {
    name: "transform-property-literals",
    visitor: {
      // { 'foo': 'bar' } -> { foo: 'bar' }
      ObjectProperty: {
        exit({ node }) {
          const key = node.key;
          if (!t.isStringLiteral(key)) {
            return;
          }

          if (key.value.match(/^\d+$/)) {
            const newProp = parseInt(node.key.value, 10);
            if (newProp.toString() === node.key.value) {
              node.key = t.numericLiteral(newProp);
              node.computed = false;
            }
          } else if (isValidPropertyName(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        }
      }
    }
  };
};

// This currently targets es5 now.
// TODO:
// Target es6 after integration with babel-preset-env
function isValidPropertyName(name) {
  if (typeof name !== "string") {
    return false;
  }

  for (const char of name) {
    if (!esutils.code.isIdentifierPartES5(char.charCodeAt(0))) {
      return false;
    }
  }

  return true;
}
