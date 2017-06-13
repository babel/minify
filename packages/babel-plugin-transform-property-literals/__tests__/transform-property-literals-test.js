jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("transform-property-literals-plugin", () => {
  it("should strip unnecessary property literal qoutes", () => {
    const source = "var x = { 'foo': 'bar' };";
    const expected = "var x = { foo: 'bar' };";
    expect(transform(source)).toBe(expected);
  });

  it("should strip unnecessary property literal qoutes for numbers", () => {
    const source = "var x = { '1': 'bar' };";
    const expected = "var x = { 1: 'bar' };";
    expect(transform(source)).toBe(expected);
  });

  it("should not strip necessaary quotes for numeric like things", () => {
    const source = unpad(`
      var data = {
        "00": 1,
        "01": 2
      };
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not transform invalid identifiers", () => {
    const source = unpad(`
      ({
        "default": null,
        "import": null
      });
    `);
    const expected = unpad(`
      ({
        default: null,
        import: null
      });
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not transform non-string properties", () => {
    const source = unpad(`
      ({
        foo: null
      });
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not transform propety keys that are computed", () => {
    const source = unpad(`
      ({
        [a]: null
      });
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not transform invalid es5 property names", () => {
    const source = unpad(`
      ({
        "\u2118": "wp",
        "𐊧": "foo"
      });
    `);
    expect(transform(source)).toBe(source);
  });

  it("should transform valid ES5 unicodes as property names", () => {
    const source = unpad(`
      ({
        "ಠ_ಠ": "bar",
        "12e34": "wut",
        "\u01FC": "AE"
      })
    `);
    const expected = unpad(`
      ({
        ಠ_ಠ: "bar",
        "12e34": "wut",
        \u01FC: "AE"
      });
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should transform computed properties which are strings", () => {
    const source = unpad(`
      ({
        [ಠ_ಠ]: "foo",
        ["ಠ_ಠ"]: "bar"
      });
    `);
    const expected = unpad(`
      ({
        [ಠ_ಠ]: "foo",
        ಠ_ಠ: "bar"
      });
    `);
  });
});
