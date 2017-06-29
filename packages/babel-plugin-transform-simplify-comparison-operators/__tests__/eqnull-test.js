jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("simplify-comparison-operators-plugin", () => {
  it("should shorten `x == undefined`", () => {
    const source = "x == undefined;";
    const expected = "x == null;";
    expect(transform(source)).toBe(expected);
  });

  it("should shorten `x == void 0`", () => {
    const source = "x == void 0;";
    const expected = "x == null;";
    expect(transform(source)).toBe(expected);
  });

  it("should not shorten `x === undefined`", () => {
    const source = "x === undefined;";
    expect(transform(source)).toBe(source);
  });
});
