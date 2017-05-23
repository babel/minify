jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("remove-debugger-plugin", () => {
  it("should remove debugger", () => {
    const source = "debugger;";
    const expected = "";
    expect(transform(source)).toBe(expected);
  });

  it("should remove debugger only", () => {
    const source = "debugger; 1;";
    const expected = "1;";
    expect(transform(source)).toBe(expected);
  });

  it("statement no block", () => {
    const source = unpad(`
      if (blah) debugger;
      for (;;) debugger;
      for (var blah in []) debugger;
      for (var blah of []) debugger;
      while (blah) debugger;
      do debugger; while (blah);
    `);

    const expected = unpad(`
      if (blah) {}
      for (;;) {}
      for (var blah in []) {}
      for (var blah of []) {}
      while (blah) {}
      do {} while (blah);
    `);
    expect(transform(source).trim()).toBe(expected);
  });
});
