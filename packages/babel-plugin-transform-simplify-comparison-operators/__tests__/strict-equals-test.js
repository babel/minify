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
  it("should simplify comparison", () => {
    const source = "'function' === typeof a;";
    const expected = "'function' == typeof a;";
    expect(transform(source)).toBe(expected);
  });

  it("should simplify comparison operations", () => {
    const source = "null === null;";
    const expected = "null == null;";
    expect(transform(source)).toBe(expected);
  });

  it("should comparison operations 2", () => {
    const source = unpad(
      `
      var x = null;
      x === null;
    `
    );
    const expected = unpad(
      `
      var x = null;
      x == null;
    `
    );

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify comparison", () => {
    const source = unpad(
      `
      var x;
      x === null;
    `
    );
    const expected = unpad(
      `
      var x;
      x === null;
    `
    );

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify comparison 2", () => {
    const source = unpad(
      `
      var x;
      if (wow) x = foo();
      x === null;
    `
    );
    const expected = unpad(
      `
      var x;
      if (wow) x = foo();
      x === null;
    `
    );

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify comparison if already simplified", function() {
    const source = 'typeof 1 == "number";';
    expect(transform(source)).toBe(source);
  });

  it("should not simplify comparison if not equality check", function() {
    const source = "a > b;";
    expect(transform(source)).toBe(source);
  });
});
