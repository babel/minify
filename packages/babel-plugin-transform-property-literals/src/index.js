'use strict';

module.exports = function({ types: t }) {
  return {
    visitor: {
      // { 'foo': 'bar' } -> { foo: 'bar' }
      ObjectProperty: {
        exit({ node }) {
          let key = node.key;
          if (!t.isStringLiteral(key)) {
            return;
          }

          if (key.value.match(/^\d+$/)) {
            node.key = t.numericLiteral(parseInt(node.key.value, 10));
            node.computed = false;
          } else if (t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },
    },
  };
};
