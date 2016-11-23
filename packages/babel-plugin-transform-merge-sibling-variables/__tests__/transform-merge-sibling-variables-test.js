jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-merge-sibling-variables-plugin", () => {
  it("concat vars", () => {
    const source = unpad(`
      var i = 0;
      var x = 0;
      var y = 0;
    `);
    const expected = unpad(`
      var i = 0,
          x = 0,
          y = 0;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("concat vars in for loops", () => {
    const source = unpad(`
      var i = 0;
      var j = 0;
      for (var x = 0; x < 10; x++) console.log(i + x);
    `);
    const expected = "for (var i = 0, j = 0, x = 0; x < 10; x++) console.log(i + x);";

    expect(transform(source).trim()).toBe(expected);
  });

  it("don't concat block-scoped variables in for loops", () => {
    const source = unpad(`
      let i = 0;
      for (let x = 0; x < 10; x++) console.log(i + x);
    `);

    expect(transform(source)).toBe(source);
  });

  it("don't concat constants in for loops", () => {
    const source = unpad(`
      const j = 0;
      for (const x = 0;;) console.log(j + x);
    `);

    expect(transform(source)).toBe(source);
  });

  it("concat block-scoped vars next to, but not into for loops", () => {
    const source = unpad(`
      let i = 0;
      let y = 0;
      for (let x = 0; x < 10; x++) console.log(i + x);
    `);
    const expected = unpad(`
      let i = 0,
          y = 0;

      for (let x = 0; x < 10; x++) console.log(i + x);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("lift var declarations to loop intializer", () => {
    const source = unpad(`
      for (var i = 0; i < 0; i++) {
        var j = jj();
      }
    `);
    const expected = unpad(`
      for (var i = 0, j; i < 0; i++) {
        j = jj();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("dont lift var declarations in these scenarios", () => {
    const source = unpad(`
      for (var i = 0; i < 0; i++) {
        var [j] = jj();
      }
      for (var i = 0; i < 0; i++) {
        var {j} = jj();
      }
      for (;;) {}
      for (;;) var i = 0;
      for(var i=foo;;){
        var j=bar;var k=baz
      }
    `);
    const expected = unpad(`
      for (var i = 0; i < 0; i++) {
        var [j] = jj();
      }
      for (var i = 0; i < 0; i++) {
        var { j } = jj();
      }
      for (;;) {}
      for (;;) var i = 0;
      for (var i = foo;;) {
        var j = bar,
            k = baz;
      }
    `);

    expect(transform(source)).toBe(expected);
  });
});
