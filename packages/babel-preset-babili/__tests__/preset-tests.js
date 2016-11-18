jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");

function transform(code, options = {}, sourceType = "script") {
  return babel.transform(code,  {
    sourceType,
    minified: false,
    presets: [
      require("../src/index")
    ],
  }).code;
}

describe("preset", () => {
  // https://github.com/babel/babili/issues/122
  it ("should fix issue#122", () => {
    const source = unpad(`
      function foo() {
        var a, b, c;
        if (a) {
          if (b) {
            if (c) {}
          }
        } else {
          if (b) {
          } else {
            if (c) {}
          }
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var d, e, f;
        d ? e && f : !b && f;
      }
    `);
    expect(transform(source)).toBe(expected);
  });
});
