jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("remove-undefined-if-possible-plugin", () => {
  it("should remove multiple undefined assignments", () => {
    const source = "let a = undefined, b = 3, c = undefined, d;";
    const expected = "let a,\n    b = 3,\n    c,\n    d;";
    expect(transform(source)).toBe(expected);
  });

  it("should remove let-assignments to undefined", () => {
    const source = "let a = undefined;";
    const expected = "let a;";
    expect(transform(source)).toBe(expected);
  });

  it("should remove let-assignments to void 0", () => {
    const source = "let a = void 0;";
    const expected = "let a;";
    expect(transform(source)).toBe(expected);
  });

  it("should remove undefined return value", () => {
    const source = unpad(`
      function foo() {
        const a = undefined;
        return undefined;
      }`);
    const expected = unpad(`
      function foo() {
        const a = undefined;
        return;
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should remove var declarations in functions", () => {
    const source = unpad(`
      function foo() {
        var a = undefined;
      }`);
    const expected = unpad(`
      function foo() {
        var a;
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should remove nested var-assignments if not referenced before", () => {
    const source = unpad(`
      function foo() {
        a = 3;
        var { a: aa, b: bb } = undefined;
      }`);
    const expected = unpad(`
      function foo() {
        a = 3;
        var { a: aa, b: bb };
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should remove let-assignments in inner blocks", () => {
    const source = unpad(`
      let a = 1;
      {
        let a = undefined;
      }`);
    const expected = unpad(`
      let a = 1;
      {
        let a;
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should not remove const-assignments to undefined", () => {
    const source = "const a = undefined;";
    expect(transform(source)).toBe(source);
  });

  it("should not remove var-assignments in loops", () => {
    const source = unpad(`
      for (var a = undefined;;) {
        var b = undefined;
      }`);
    expect(transform(source)).toBe(source);
  });

  it("should not remove var-assignments if referenced before", () => {
    const source = unpad(`
      function foo() {
        a = 3;
        var a = undefined;
      }`);
    expect(transform(source)).toBe(source);
  });

  it("should not remove nested var-assignments if referenced before", () => {
    const source = unpad(`
      function foo() {
        aa = 3;
        var { a: aa, b: bb } = undefined;
      }`);
    expect(transform(source)).toBe(source);
  });
});
