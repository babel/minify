jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("remove-unused-params-plugin", () => {
  it("should remove trailing unused params", () => {
    const source =
`function foo(a, b, c) {
  return a;
}`;
    const expected =
`function foo(a) {
  return a;
}`;
    expect(transform(source)).toBe(expected);
  });

  it("should preserve unused params before used params", () => {
    const source =
`function foo(a, b, c) {
  return b;
}`;
    const expected =
`function foo(a, b) {
  return b;
}`;
    expect(transform(source)).toBe(expected);
  });

  it("should remove all params if all unused", () => {
    const source =
`function foo(a, b, c) {
  return 42;
}`;
    const expected =
`function foo() {
  return 42;
}`;
    expect(transform(source)).toBe(expected);
  });


  it("should remove all params if all unused", () => {
    const source =
`function foo(a, b, c) {
  return 42;
}`;
    const expected =
`function foo() {
  return 42;
}`;
    expect(transform(source)).toBe(expected);
  });

  it("should not remove params if referenced in nested functions", () => {
    const source =
`function foo(a, b, c) {
  function bar(c = b()) {
    return;
  }
  return 42;
}`;
    const expected =
`function foo(a, b) {
  function bar(c = b()) {
    return;
  }
  return 42;
}`;
    expect(transform(source)).toBe(expected);
  });

  it("should not remove nested params if referenced", () => {
    const source =
`function foo({ a: aa, b: bb }, [c, d]) {
  return aa;
}`;
    const expected =
`function foo({ a: aa, b: bb }) {
  return aa;
}`;
    expect(transform(source)).toBe(expected);
  });
});
