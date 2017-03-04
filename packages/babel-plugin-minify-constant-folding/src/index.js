"use strict";

const evaluate = require("babel-helper-evaluate-path");
const jsesc = require("jsesc");

module.exports = ({ types: t, traverse }) => {
  const seen = Symbol("seen");

  return {
    name: "minify-constant-folding",
    visitor: {

      // Evaluate string expressions that are next to each other
      // but are not actually a binary expression.
      // "a" + b + "c" + "d" -> "a" + b + "cd"
      BinaryExpression(path) {
        let literal, bin;
        if (path.get("right").isStringLiteral()) {
          literal = path.get("right");
          if (path.get("left").isBinaryExpression({ operator: "+" })) {
            bin = path.get("left");
          } else {
            return;
          }
        } else if (path.get("left").isStringLiteral()) {
          literal = path.get("left");
          if (path.get("right").isBinaryExpression({ operator: "+" })) {
            bin = path.get("right");
          } else {
            return;
          }
        } else {
          return;
        }

        const relevant = getLeaf(bin, literal.key);

        if (!relevant) {
          return;
        }

        const value = literal.key === "right"
                                    ? relevant.node.value + literal.node.value
                                    : literal.node.value + relevant.node.value;

        relevant.replaceWith(t.stringLiteral(value));
        path.replaceWith(bin.node);

        function getLeaf(path, direction) {
          if (path.isStringLiteral()) {
            return path;
          } else if (path.isBinaryExpression({ operator: "+" })) {
            return getLeaf(path.get(direction), direction);
          }
        }
      },

      // TODO: look into evaluating binding too (could result in more code, but gzip?)
      Expression(path) {
        const { node } = path;

        if (node[seen]) {
          return;
        }

        if (path.isLiteral()) {
          return;
        }

        if (!path.isPure()) {
          return;
        }

        if (traverse.hasType(node, path.scope, "Identifier", t.FUNCTION_TYPES)) {
          return;
        }

        // -0 maybe compared via dividing and then checking against -Infinity
        // Also -X will always be -X.
        if (t.isUnaryExpression(node, { operator: "-" }) && t.isNumericLiteral(node.argument)) {
          return;
        }

        // We have a transform that converts true/false to !0/!1
        if (t.isUnaryExpression(node, { operator: "!" }) && t.isNumericLiteral(node.argument)) {
          if (node.argument.value === 0 || node.argument.value === 1) {
            return;
          }
        }

        // void 0 is used for undefined.
        if (t.isUnaryExpression(node, { operator: "void" }) &&
          t.isNumericLiteral(node.argument, { value: 0 })
        ) {
          return;
        }

        const res = evaluate(path);
        if (res.confident) {
          // Avoid fractions because they can be longer than the original expression.
          // There is also issues with number percision?
          if (typeof res.value === "number" && !Number.isInteger(res.value)) {
            return;
          }

          // Preserve -0
          if (typeof res.value === "number" && res.value === 0) {
            if (1 / res.value === -Infinity) {
              const node = t.unaryExpression("-", t.numericLiteral(0), true);
              node[seen] = true;
              path.replaceWith(node);
              return;
            }
          }

          // https://github.com/babel/babili/issues/382
          if (typeof res.value === "string") {
            res.value = jsesc(res.value, {
              isScriptContext: true
            });
          }

          const node = t.valueToNode(res.value);
          node[seen] = true;
          path.replaceWith(node);
        }
      },
    },
  };
};
