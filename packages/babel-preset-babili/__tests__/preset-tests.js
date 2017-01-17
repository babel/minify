jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");

function transform(code, options = {}, sourceType = "script") {
  return babel.transform(code,  {
    sourceType,
    minified: false,
    presets: [
      [require("../src/index"), options]
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
        var d, a, b;
        d ? a && b : a || b;
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

  it("should fix bug#326 - object destructuring", () => {
    const source = unpad(`
      function a() {
        let foo, bar, baz;
        ({foo, bar, baz} = {});
        return {foo, bar, baz};
      }
    `);
    const expected = unpad(`
      function a() {
        let a, b, c;

        return ({ foo: a, bar: b, baz: c } = {}), { foo: a, bar: b, baz: c };
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix bug#326 - object destructuring", () => {
    const source = unpad(`
      function a() {
        let foo, bar, baz;
        ({foo, bar, baz} = {});
        return {foo, bar, baz};
      }
    `);
    const expected = unpad(`
      function a() {
        let b, c, d;

        return ({ foo: b, bar: c, baz: d } = {}), { foo: b, bar: c, baz: d };
      }
    `);
    expect(transform(source, {
      mangle: {
        reuse: false
      }
    })).toBe(expected);
  });
});
