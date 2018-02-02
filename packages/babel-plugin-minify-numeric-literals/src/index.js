"use strict";

module.exports = function() {
  return {
    name: "minify-numeric-literals",
    visitor: {
      NumericLiteral(path) {
        if (!path.node.extra) return;

        const normal = path.node.value.toString().replace(/^0\./, ".");
        let exponential = path.node.value.toExponential().replace(/\+/g, "");
        const hexadecimal = `0x${path.node.value.toString(16)}`;

        if (exponential.indexOf(".") >= 0 && exponential.indexOf("e") >= 0) {
          const lastChar = exponential.substr(exponential.lastIndexOf("e") + 1);
          const dotIndex = exponential.lastIndexOf(".") + 1;
          const subLength = exponential.substr(
            dotIndex,
            exponential.lastIndexOf("e") - dotIndex
          ).length;
          exponential = (
            exponential.substr(0, exponential.lastIndexOf("e") + 1) +
            (lastChar - subLength)
          )
            .replace(".", "")
            .replace(/e0/, "");
        }

        let replacement =
          normal.length > exponential.length ? exponential : normal;

        if (path.node.value > 0 && Number.isInteger(path.node.value))
          replacement =
            replacement.length > hexadecimal.length ? hexadecimal : replacement;

        if (path.node.extra.raw.length > replacement.length) {
          path.node.extra.raw = replacement;
        }
      }
    }
  };
};
