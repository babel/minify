"use strict";

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
          } else if (t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },
    },
  };
};
