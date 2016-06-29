jest.autoMockOff();

const babel = require("babel-core");
const t = babel.types;
const isNodesEquiv = require("../src/index")(t);

function parse(code) {
  return babel.transform(code).ast.program;
}

describe("isNodesEquiv", () => {
  it("should handle simple cases", () => {
    const mem = t.memberExpression(t.identifier("a"), t.identifier("b"));
    expect(isNodesEquiv(mem, mem)).toBe(true);

    const mem2 = t.memberExpression(t.identifier("a"), t.identifier("c"));
    expect(isNodesEquiv(mem, mem2)).toBe(false);
  });

  it("should handle full programs", () => {
    expect(isNodesEquiv(parse("1 + 1"), parse("1+1"))).toBe(true);
    expect(isNodesEquiv(parse("1 + 1"), parse("1+2"))).toBe(false);
  });

  it("should handle complex programs", () => {
    const program = `
    'use strict';
    function lol() {
      wow();
      return 1;
    }
    `;

    expect(isNodesEquiv(parse(program), parse(program))).toBe(true);

    const program2 = `
    'use strict';
    function lol() {
      wow();
      return -1;
    }
    `;

    expect(isNodesEquiv(parse(program), parse(program2))).toBe(false);
  });
});
