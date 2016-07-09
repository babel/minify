jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("type-constructors-plugin", () => {
  it("should turn Boolean(x) to !!x", () => {
    const source = "Boolean(x);";
    const expected = "!!x;";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Number(x) to +x", () => {
    const source = "Number(x);";
    const expected = "+x;";
    expect(transform(source)).toBe(expected);
  });

  it("should turn String(x) to x + ''", () => {
    const source = "String(x);";
    const expected = "x + \"\";";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array() to []", () => {
    const source = "Array();";
    const expected = "[];";
    expect(transform(source)).toBe(expected);
  });

  it("should turn new Array() to []", () => {
    const source = "new Array();";
    const expected = "[];";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(nonNumericValue) to [nonNumericValue]", () => {
    const source = unpad(`
      Array("Rome");
      Array(false);
      Array(null);
      Array({});
      Array([]);
    `);
    const expected = unpad(`
      ["Rome"];
      [false];
      [null];
      [{}];
      [[]];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(number) to [,] only if number is <=6", () => {
    const source = unpad(`
      Array(0);
      Array(1);
      Array(6);
      Array(7);
    `);
    const expected = unpad(`
      [];
      [,];
      [,,,,,,];
      Array(7);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn new Array(number) to Array(number) if number is >6", () => {
    const source = unpad(`
      new Array(6);
      new Array(7);
    `);
    const expected = unpad(`
      [,,,,,,];
      Array(7);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(value, value) to [value, value]", () => {
    const source = unpad(`
      Array("a", "b");
      new Array("0", "1", {});
      Array(10, Symbol(), foo());
    `);
    const expected = unpad(`
      ["a", "b"];
      ["0", "1", {}];
      [10, Symbol(), foo()];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("shouldn't change referenced identifiers", () => {
    const source = unpad(`
      (function (Boolean, String, Number, Array) {
        return Boolean(a), String(b), Number(c), Array(d);
      })(MyBoolean, MyString, MyNumber, MyArray);
    `);
    const expected = unpad(`
      (function (Boolean, String, Number, Array) {
        return Boolean(a), String(b), Number(c), Array(d);
      })(MyBoolean, MyString, MyNumber, MyArray);
    `);
    expect(transform(source)).toBe(expected);
  });
});
