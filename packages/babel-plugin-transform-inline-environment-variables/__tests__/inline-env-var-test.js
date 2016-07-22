jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("inline-env-plugin", () => {
  it("should inline environment variables", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const source = "process.env.NODE_ENV";
    const expected = "\"development\";";
    expect(transform(source)).toBe(expected);

    process.env.NODE_ENV = prev;
  });
});
