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
        d ? e && f : e || f;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix remove comments", () => {
    const source = unpad(`
      var asdf = 1; // test
    `);
    const expected = unpad(`
      var asdf = 1;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should keep license/preserve annotated comments", () => {
    const source = unpad(`
      /* @license */
      var asdf = 1;
    `);
    const expected = unpad(`
      /* @license */
      var asdf = 1;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix issue#385 - impure if statements with Sequence and DCE", () => {
    const source = unpad(`
      a = b;
      c = d;
      if (false) {
        const x = y
      }
    `);
    const expected = unpad(`
      a = b, c = d;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix issue#402 - lifting var decl & DCE", () => {
    const source = unpad(`
      function a() {
        if (0) {
          for (var i;;) {
            var something = 5;
          }
        }
      }
      a();
    `);
    const expected = unpad(`
      function a() {}
      a();
    `);
    expect(transform(source)).toBe(expected);
  });

});
