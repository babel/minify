jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("node-env-inline-plugin", () => {
  it("should inline", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const source = 'process.env.NODE_ENV === "development";';
    const expected = "true;";
    expect(transform(source)).toBe(expected);

    process.env.NODE_ENV = prev;
  });
});
