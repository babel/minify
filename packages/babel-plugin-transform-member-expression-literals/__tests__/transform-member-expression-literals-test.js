jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-member-expressions-literals-plugin", () => {
  it("should work with string literals", () => {
    const source = "foo['bar'];";
    const expected = "foo.bar;";
    expect(transform(source)).toBe(expected);
  });

  it("should work with numbers", () => {
    const source = "foo['1'];";
    const expected = "foo[1];";
    expect(transform(source)).toBe(expected);
  });

  it("should not transform invalid identifiers", () => {
    const source = unpad(`
      foo["default"];
      foo["import"];
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not transform non-string properties", () => {
    const source = "foo[a];";
    expect(transform(source)).toBe(source);
  });

  it("should not transform literals that are not computed", () => {
    const source = "foo.bar;";
    expect(transform(source)).toBe(source);
  });
});
