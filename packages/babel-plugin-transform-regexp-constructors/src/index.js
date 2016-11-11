"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-regexp-constructors",
    visitor: {
      NewExpression(path) {
        if (!t.isIdentifier(path.node.callee, {name: "RegExp"})) {
          return;
        }
        const evaluatedArgs = path.get("arguments").map((a) => a.evaluate());
        if (!evaluatedArgs.every((a) => a.confident === true &&
            typeof a.value === "string")) {
          return;
        }
        let pattern = (evaluatedArgs.length >= 1 &&
                          evaluatedArgs[0].value !== "") ?
                        evaluatedArgs[0].value :
                        "(?:)";
        const flags = evaluatedArgs.length >= 2 ?
                      evaluatedArgs[1].value :
                      "";

        pattern = new RegExp(pattern).source;
        // This step is for prettification -- technically we can just match
        // literal Unicode fine. e.g. '\t'.replace(/	/, '') === ''.
        // This makes the output unecessarily bigger.
        pattern = pattern.replace(/\n/g, "\\n")
                         .replace(/\t/g, "\\t")
                         .replace(/[\b]/g, "[\\b]")
                         .replace(/\v/g, "\\v")
                         .replace(/\f/g, "\\f")
                         .replace(/\r/g, "\\r");
        path.replaceWith(t.regExpLiteral(pattern, flags));
      }
    },
  };
};
