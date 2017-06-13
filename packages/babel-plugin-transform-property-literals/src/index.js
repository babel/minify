"use strict";

const { reduceStaticPropertyNameES5 } = require("./property-name");

module.exports = function({ types: t }) {
  return {
    name: "transform-property-literals",
    visitor: {
      // { 'foo': 'bar' } -> { foo: 'bar' }
      ObjectProperty: {
        exit(path) {
          const key = path.get("key");
          if (!key.isStringLiteral()) {
            return;
          }

          const newNode = t.clone(path.node);
          newNode.key = reduceStaticPropertyNameES5(t, key.node);
          newNode.computed = false;

          path.replaceWith(newNode);
        }
      }
    }
  };
};
