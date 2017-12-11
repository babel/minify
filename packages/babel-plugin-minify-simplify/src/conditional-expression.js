const h = require("./helpers");
const PatternMatch = require("./pattern-match");

module.exports = t => {
  // small abstractions
  const not = node => t.unaryExpression("!", node);
  const notnot = node => not(not(node));
  const or = (a, b) => t.logicalExpression("||", a, b);
  const and = (a, b) => t.logicalExpression("&&", a, b);

  function simplifyPatterns(path) {
    const test = path.get("test");
    const consequent = path.get("consequent");
    const alternate = path.get("alternate");

    const { Expression: EX, LogicalExpression: LE } = h.typeSymbols(t);

    // Convention:
    // ===============
    // for each pattern [test, consequent, alternate, handler(expr, cons, alt)]
    const matcher = new PatternMatch([
      [LE, true, false, e => e],
      [EX, true, false, e => notnot(e)],

      [EX, false, true, e => not(e)],

      [LE, true, EX, (e, c, a) => or(e, a)],
      [EX, true, EX, (e, c, a) => or(notnot(e), a)],

      [EX, false, EX, (e, c, a) => and(not(e), a)],

      [EX, EX, true, (e, c) => or(not(e), c)],

      [LE, EX, false, (e, c) => and(notnot(e), c)],
      [EX, EX, false, (e, c) => and(notnot(e), c)]
    ]);

    const result = matcher.match(
      [test, consequent, alternate],
      h.isPatternMatchesPath(t)
    );

    if (result.match) {
      path.replaceWith(
        result.value(test.node, consequent.node, alternate.node)
      );
    }
  }

  return {
    simplifyPatterns
  };
};
