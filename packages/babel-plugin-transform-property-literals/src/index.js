"use strict";

const safeIdentifierRegExp = /[^a-z0-9$_]/i;

function isSafeKeyIdentifier(t, value) {
  return !safeIdentifierRegExp.test(value) && t.isValidIdentifier(value);
}

module.exports = function({ types: t }) {
  return {
    name: "transform-property-literals",
    visitor: {
      // { 'foo': 'bar' } -> { foo: 'bar' }
      ObjectProperty: {
        exit({ node }) {
          const key = node.key;

          // Handle the case where the incoming property key may not be a safe
          // identifier that works in all browsers
          if (t.isIdentifier(key)) {
            if (!isSafeKeyIdentifier(t, key.name)) {
              node.key = t.stringLiteral(key.name);
            }
            return;
          }

          if (!t.isStringLiteral(key)) {
            return;
          }

          if (key.value.match(/^\d+$/)) {
            node.key = t.numericLiteral(parseInt(node.key.value, 10));
            node.computed = false;
          } else if (isSafeKeyIdentifier(t, key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },
    },
  };
};
