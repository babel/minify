jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

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
  it("should not shorten `x === undefined`", () => {
    const source = "x === undefined;";
    expect(transform(source)).toBe(source);
  });
  
  it("should shorten `undefined == null`", () => {
    const source = "undefined == null";
    const expected = "!0;";
    expect(transform(source)).toBe(expected);
  });
  it("should shorten `undefined == undefined`", () => {
    const source = "undefined == undefined";
    const expected = "!0;";
    expect(transform(source)).toBe(expected);
  });
  it("should shorten `undefined != null`", () => {
    const source = "undefined != undefined";
    const expected = "!1;";
    expect(transform(source)).toBe(expected);
  });
  it("should shorten `undefined != undefined`", () => {
    const source = "undefined != undefined";
    const expected = "!1;";
    expect(transform(source)).toBe(expected);
  });
});
