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
            node.key = t.numericLiteral(parseInt(node.key.value, 10));
            node.computed = false;
          } else if (t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },
	  
	  // ['foo']() {} -> foo() {}
	  ClassMethod: {
        exit({ node }) {
          const key = node.key;
		  
          if (t.isStringLiteral(key) && t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      },
	  
	  ObjectMethod: {
        exit({ node }) {
          const key = node.key;
		  
          if (t.isStringLiteral(key) && t.isValidIdentifier(key.value)) {
            node.key = t.identifier(key.value);
            node.computed = false;
          }
        },
      }
    },
  };
};
