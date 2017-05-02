jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-inline-temp-plugin", () => {
  it("should inline temp variable", () => {
    const source = unpad(`
      function foo() {
        let a = bar();
        return a;
      }
    `);
    const expected = unpad(`
      function foo() {
        return bar();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should inline temp variable in all blocks", () => {
    const source = unpad(`
      function foo() {
        if (something) {
          let a = bar();
          return a;
        } else {
          const c = what();
          return c;
        }
        var s = ok();
        return s;
      }
    `);
    const expected = unpad(`
      function foo() {
        if (something) {
          return bar();
        } else {
          return what();
        }

        return ok();
      }
    `);
    expect(transform(source)).toBe(expected);
  });
});
