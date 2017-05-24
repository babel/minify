jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("transform-remove-undefined-plugin", () => {
  it("should remove multiple undefined assignments in 1 statement", () => {
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

  it("should not remove const-assignments to undefined", () => {
    const source = "const a = undefined;";
    expect(transform(source)).toBe(source);
  });

  it("should remove undefined return value", () => {
    const source = unpad(`
      function foo() {
        return undefined;
      }`);
    const expected = unpad(`
      function foo() {
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

  it("should remove var-assignments in loops if no modify", () => {
    const source = unpad(`
      for (var a = undefined;;) {
        var b = undefined;
      }`);
    const expected = unpad(`
      for (var a;;) {
        var b;
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should not remove var-assignments in loops if modify", () => {
    const source = unpad(`
      for (var a;;) {
        var b = undefined;
        console.log(b);
        b = 3;
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

  it("should not remove if lval is reference before via a function", () => {
    const source = unpad(`
      function foo() {
        bar();
        var x = undefined;
        console.log(x);
        function bar() {
          x = 3;
        }
      }`);
    expect(transform(source)).toBe(source);
  });

  it("should remove if not referenced in any way before", () => {
    const source = unpad(`
      function foo() {
        var x = undefined;
        bar();
        console.log(x);
        function bar() {
          x = 3;
        }
      }`);
    const expected = unpad(`
      function foo() {
        var x;
        bar();
        console.log(x);
        function bar() {
          x = 3;
        }
      }`);
    expect(transform(source)).toBe(expected);
  });

  it("should not remove on mutually recursive function", () => {
    const source = unpad(`
      function foo() {
        a();
        var c = undefined;
        function a() {
          b();
        }
        function b() {
          a();
          c = 3;
        }
      }`);
    expect(transform(source)).toBe(source);
  });

  it("should not remove if rval has side effects", () => {
    const source = unpad(`
      function foo() {
        var a = void b();
        return void bar();
      }`);
    expect(transform(source)).toBe(source);
  });

  it("should remove from sequence expressions", () => {
    const source = unpad(`
      a = b, void 0, b = c, d.e.f(), void 0, hello.world();
    `);
    const expected = unpad(`
      a = b, b = c, d.e.f(), hello.world();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should NOT remove last undefined from sequence expressions", () => {
    const source = unpad(`
      if (foo.bar(), void 0) {
        foo.baz();
      }
      function bar() {
        return a.b(), void 0;
      }
    `);
    expect(transform(source)).toBe(source);
  });

  it("should remove last undefined from sequence expressions if safe", () => {
    const source = unpad(`
      a = b, void 0, b = c, d.e.f(), void 0, hello.world(), void 0;
    `);
    const expected = unpad(`
      a = b, b = c, d.e.f(), hello.world();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should remove not remove local undefined", () => {
    const source = unpad(`
      function foo(undefined) {
        a = b, undefined;
        return undefined;
      }`);
    expect(transform(source)).toBe(source);
  });
});
