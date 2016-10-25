jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("numeric-literals", () => {
  it("should shorten properly", () => {
    const source = unpad(`
      [10, 100, 1000, 10000, -2, -30000, 1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1]
    `);

    const expected = unpad(`
      [10, 100, 1e3, 1e4, -2, -3e4, 1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1];
    `);
    
    expect(transform(source)).toBe(expected);
  });
});
