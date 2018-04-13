jest.autoMockOff();

const babel = require("@babel/core");
const plugin = require("../src/index");
const unpad = require("unpad");
const thePlugin = require("test-transform")(plugin);

describe("type-constructors-plugin", () => {
  // options tests
  it("should respect the options disabling optomizations", () => {
    const types = {
      boolean: "Boolean",
      number: "Number",
      array: "Array",
      object: "Object",
      string: "String"
    };
    const names = Object.keys(types);
    for (let i = 0; i < names.length; i++) {
      const source = unpad(
        `
        (function () {
          var foo = ${types[names[i]]}(1);
          var bar = ${types[names[i]]}(x);
          var baz = ${types[names[i]]}();
        })();
      `
      );
      expect(
        babel.transform(source, {
          plugins: [[plugin, { [names[i]]: false }]]
        }).code
      ).toBe(source);
    }
  });

  // https://github.com/babel/minify/issues/206
  thePlugin(
    "should handle floating point numbers in `Array()`",
    `
    new Array(-0.01);
    new Array(-1);
  `,
    `
    Array(-0.01);
    Array(-1);
  `
  );
});
