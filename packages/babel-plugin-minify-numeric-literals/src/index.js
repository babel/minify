"use strict";

module.exports = function({ types: t }) {

  const toExp = (val) => {
    const floatVal = parseFloat(val).toString();
    const expVal = val.toExponential().toString();

    if (floatVal.length < expVal.length) {
      val = floatVal;
    } else {
      val = expVal;
    }

    // 1.1e4 -> 11e3
    if (val.indexOf(".") >= 0 && val.indexOf("e") >= 0) {
      val = val.replace(/\+/g, "");
      const lastChar = val.substr(val.lastIndexOf("e") + 1);
      const dotIndex = val.lastIndexOf(".") + 1;
      const subLength = val.substr(dotIndex, val.lastIndexOf("e") - dotIndex).length;
      val = val.replace(".", "").replace(lastChar, Number(lastChar) - subLength);
    }
    return val.replace(/\+/g, "").replace(/e0/, "");
  };

  return {
    name: "minify-numeric-literals",
    visitor: {
      NumericLiteral(path) {
        if (!path.node.extra) return;

        const exponential = toExp(path.node.value)

        if (path.node.extra.raw.length > exponential.length) {
          const literal = t.numericLiteral(path.node.value);
          literal.extra = {
            raw: exponential,
            rawValue: path.node.value
          };
          path.replaceWith(literal);
        }
      }
    },
  };
};
