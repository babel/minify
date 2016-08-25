"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-member-expression-literals",
    visitor: {
      // foo['bar'] -> foo.bar
      MemberExpression: {
        exit({ node }) {
          let prop = node.property;
          if (!node.computed || !t.isStringLiteral(prop)) {
            return;
          }

          if (prop.value.match(/^\d+$/)) {
            node.property = t.numericLiteral(parseInt(prop.value, 10));
            node.computed = false;
          } else if (t.isValidIdentifier(prop.value)) {
            node.property = t.identifier(prop.value);
            node.computed = false;
          }
        },
      },
    },
  };
};
