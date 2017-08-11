jest.autoMockOff();

const babili = require("../src/index");

const sampleInput = `
function foo() {
  const bar = x(1);
  const baz = y(2);
  return z(bar, baz);
}
`;

describe("Babili Node API", () => {
  it("simple usage", () => {
    expect(babili(sampleInput).code).toMatchSnapshot();
  });

  it("throw on invalid options", () => {
    expect(() => babili(sampleInput, { foo: false, bar: true }).code).toThrow();
  });

  it("override default babili options", () => {
    const babiliOpts = { mangle: false };
    expect(babili(sampleInput, babiliOpts).code).toMatchSnapshot();
  });
});
