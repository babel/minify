jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("numeric-literals", () => {
  it("should shorten properly", () => {

    let source = "[10, 100, 1000, 10000, -2, -30000];";
    let expected = "[10, 100, 1e3, 1e4, -2, -3e4];";

    expect(transform(source)).toBe(expected);

    source = "[1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1];";
    expected = "[1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1];";

    expect(transform(source)).toBe(expected);

    source = "[0x000001, 0o23420, 0b10011100010000];";
    expected = "[1, 1e4, 1e4];";

    expect(transform(source)).toBe(expected);

    source = "[+0.000000000001, -0.00000000001];";
    // TODO: this seems to be specific to how Babel outputs number
    // for some reason it adds + in the beginning
    expected = "[+1e-12, -1e-11];";

    expect(transform(source)).toBe(expected);
  });
});
