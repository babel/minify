jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("boolean-plugin", () => {
  it("should convert infinity to division over 0", () => {
    const source = unpad(`
      Infinity;
    `);

    const expected = unpad(`
      1 / 0;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not convert infinity when its a property", () => {
    const source = unpad(`
      var x = { Infinity: 0 };
    `);

    const expected = unpad(`
      var x = { Infinity: 0 };
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not convert infinity when its a property", () => {
    const source = unpad(`
      x.Infinity;
    `);

    const expected = unpad(`
      x.Infinity;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not convert infinity if its a assignment expression", () => {
    const source = unpad(`
      Infinity = 1;
    `);

    const expected = unpad(`
      Infinity = 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not convert infinity when its destructed", () => {
    const source = unpad(`
      ({ Infinity } = 1);
      [Infinity] = foo;
      [...Infinity] = foo;
    `);

    const expected = unpad(`
      ({ Infinity } = 1);
      [Infinity] = foo;
      [...Infinity] = foo;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not convert infinity when as a function params", () => {
    const source = unpad(`
      function a(Infinity) {}
      function a(...Infinity) {}
      function a({ Infinity }) {}
    `);

    const expected = unpad(`
      function a(Infinity) {}
      function a(...Infinity) {}
      function a({ Infinity }) {}
    `);

    expect(transform(source)).toBe(expected);
  });
});
