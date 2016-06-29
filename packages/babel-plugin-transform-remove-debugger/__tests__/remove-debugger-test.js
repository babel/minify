jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("remove-debugger-plugin", () => {
  it("should remove debugger", () => {
    const source = "debugger;";
    const expected = "";
    expect(transform(source)).toBe(expected);
  });

  it("should remove debugger only", () => {
    const source = "debugger; 1;";
    const expected = "1;";
    expect(transform(source)).toBe(expected);
  });
});
