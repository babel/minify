"use strict";

module.exports = function() {

  const transform = (val) => {
    const floatVal = parseFloat(val).toString();
    const expVal = val.toExponential().replace(/\+/g, "");
    if (floatVal.length < expVal.length) {
      return floatVal;
    }
    // 1.1e4 -> 11e3
    val = expVal;
    if (val.indexOf(".") >= 0 && val.indexOf("e") >= 0) {
      const lastChar = val.substr(val.lastIndexOf("e") + 1);
      const dotIndex = val.lastIndexOf(".") + 1;
      const subLength = val.substr(dotIndex, val.lastIndexOf("e") - dotIndex).length;
      val = val.substr(0, val.lastIndexOf("e") + 1) + (lastChar - subLength);
      val =  val.replace(".", "").replace(/e0/, "");
    }
    return val;
  };

  return {
    name: "minify-numeric-literals",
    visitor: {
      NumericLiteral(path) {
        if (!path.node.extra) return;

        const newVal = transform(path.node.value);

        if (path.node.extra.raw.length > newVal.length) {
          path.node.extra.raw = newVal;
        }
      }
    },
  };
};
