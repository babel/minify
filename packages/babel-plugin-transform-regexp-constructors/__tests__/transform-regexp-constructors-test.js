jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("transform-regexp-constructors-plugin", () => {
  it("should not duplicate forward-slash escapes", () => {
    const source = String.raw`var x = new RegExp('\\/');`;
    const expected = String.raw`var x = /\//;`;
    expect(transform(source)).toBe(expected);
  });

  it("should transform newlines fine", () => {
    const source = String.raw`var x = new RegExp('\\n');`;
    const expected = String.raw`var x = /\n/;`;
    expect(transform(source)).toBe(expected);
  });

  it("should transform unicode newlines fine", () => {
    const source = String.raw`var x = new RegExp('\u2028\u2029');`;
    const expected = String.raw`var x = /\u2028\u2029/;`;
    expect(transform(source)).toBe(expected);
  });

  it("should transform RegExp constructors with string literals", () => {
    const source = "var x = new RegExp('ab+c');";
    const expected = "var x = /ab+c/;";
    expect(transform(source)).toBe(expected);
  });

  it("should transform RegExp calls with string literals", () => {
    const source = "var x = RegExp('ab+c');";
    const expected = "var x = /ab+c/;";
    expect(transform(source)).toBe(expected);
  });

  it("should transform RegExp constructors with flags", () => {
    const source = "var x = new RegExp('ab+c', 'gimuy');";
    const expected = "var x = /ab+c/gimuy;";
    expect(transform(source)).toBe(expected);
  });

  it("should transform RegExp escapes", () => {
    const source = String.raw`var x = new RegExp('\\w+\\s');`;
    const expected = String.raw`var x = /\w+\s/;`;
    expect(transform(source)).toBe(expected);
  });

  it("should not transform RegExp constructors with expressions", () => {
    const source = "var x = new RegExp(foo(), 'g');";
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should transform empty RegExp constructor", () => {
    const source = "var x = new RegExp();";
    const expected = "var x = /(?:)/;";
    expect(transform(source)).toBe(expected);
  });

  it("should transform RegExp constructor with empty string", () => {
    const source = "var x = new RegExp('');";
    const expected = "var x = /(?:)/;";
    expect(transform(source)).toBe(expected);
  });

  it("should resolve expressions and const references", () => {
    const source = `
const foo = "ab+";
const bar = "c\\\\w";
const flags = "g";
const ret = new RegExp(foo + bar + "d", flags);`;
    const expected = `
const foo = "ab+";
const bar = "c\\\\w";
const flags = "g";
const ret = /ab+c\\wd/g;`;
    expect(transform(source)).toBe(expected);
  });

  it("should prettify special whitespaces", () => {
    const source = String.raw`var x = new RegExp('\b\f\v\t\r\n\n');`;
    const expected = String.raw`var x = /[\b]\f\v	\r\n\n/;`;
    expect(transform(source)).toBe(expected);
  });

  it("should escape forward slashes", () => {
    const source = String.raw`var x = new RegExp('/x/');`;
    const expected = String.raw`var x = /\/x\//;`;
    expect(transform(source)).toBe(expected);
  });
});
