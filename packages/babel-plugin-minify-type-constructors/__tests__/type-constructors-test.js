jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("type-constructors-plugin", () => {
  it("should turn Boolean(x) to !!x", () => {
    const source = "Boolean(x);";
    const expected = "!!x;";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Number(x) to +x", () => {
    const source = "Number(x);";
    const expected = "+x;";
    expect(transform(source)).toBe(expected);
  });

  it("should turn String(x) to x + ''", () => {
    const source = "String(x);";
    const expected = "x + \"\";";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array() to []", () => {
    const source = "Array();";
    const expected = "[];";
    expect(transform(source)).toBe(expected);
  });

  it("should turn new Array() to []", () => {
    const source = "new Array();";
    const expected = "[];";
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(nonNumericValue) to [nonNumericValue]", () => {
    const source = unpad(`
      Array("Rome");
      Array(false);
      Array(null);
      new Array({});
      new Array([a, b]);
      Array([]);
      Array(t);
      new Array(a.b);
      new Array((() => 5)());
    `);
    const expected = unpad(`
      ["Rome"];
      [false];
      [null];
      [{}];
      [[a, b]];
      [[]];
      Array(t);
      Array(a.b);
      Array((() => 5)());
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(number) to [,] only if number is <=6", () => {
    const source = unpad(`
      Array(0);
      Array(1);
      Array(2 + 4);
      Array(7);
    `);
    const expected = unpad(`
      [];
      [,];
      [,,,,,,];
      Array(7);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn new Array(number) to Array(number) if number is >6", () => {
    const source = unpad(`
      new Array(6);
      new Array(7);
    `);
    const expected = unpad(`
      [,,,,,,];
      Array(7);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn Array(value, value) to [value, value]", () => {
    const source = unpad(`
      Array("a", "b");
      new Array("0", "1", {});
      Array(10, Symbol(), foo());
    `);
    const expected = unpad(`
      ["a", "b"];
      ["0", "1", {}];
      [10, Symbol(), foo()];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should turn Object() to {}", () => {
    const source = "var x = Object();";
    const expected = "var x = {};";
    expect(transform(source)).toBe(expected);
  });

  it("should turn new Object() to {}", () => {
    const source = "var x = new Object();";
    const expected = "var x = {};";
    expect(transform(source)).toBe(expected);
  });

  it("should change Object(null|undefined) to {}", () => {
    const source = unpad(`
      [
        Object(null),
        Object(undefined),
        new Object(void 0)
      ]
    `);
    const expected = "[{}, {}, {}];";
    expect(transform(source)).toBe(expected);
  });

  it("should change Object({a:b}) to {a:b}", () => {
    const source = unpad(`
      [
        Object({}),
        Object({a:b}),
        Object({a:b, c:d}),
      ]
    `);// todo: add Object(Array())
    const expected = "[{}, { a: b }, { a: b, c: d }];";
    expect(transform(source)).toBe(expected);
  });

  it("should change Object([]) to []", () => {
    const source = unpad(`
      [
        Object([]),
        Object([1]),
        Object([1,2]),
        new Object([null])
      ]
    `);// todo: add Object(Array())
    const expected = "[[], [1], [1, 2], [null]];";
    expect(transform(source)).toBe(expected);
  });

  it("should change Object(localFn) to localFn", () => {
    const source = unpad(`
      function a() {};
      [
        Object(function () {}),
        new Object(a),
        Object(Array)
      ]
    `);
    const expected = unpad(`
      function a() {};
      [function () {}, a, Object(Array)];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("shouldn't change Object(value) for unrecognized values", () => {
    const source = unpad(`
      [
        Object("undefined"),
        Object(nulled),
        Object(0),
        Object(false),
        Object(stuff())
      ]
    `);
    const expected = "[Object(\"undefined\"), Object(nulled), Object(0), Object(false), Object(stuff())];";
    expect(transform(source)).toBe(expected);
  });

  it("should change new Object(value) to Object(value) for unrecognized values", () => {
    const source = unpad(`
      [
        new Object("function"),
        new Object(Symbol),
        new Object(true),
        new Object(1),
        new Object(call({ me: true }))
      ]
    `);
    const expected = "[Object(\"function\"), Object(Symbol), Object(true), Object(1), Object(call({ me: true }))];";
    expect(transform(source)).toBe(expected);
  });

  it("should change Object() to ({}) in ambiguous contexts", () => {
    const source = unpad(`
      new Object();
      var foo = () => Object();
      var bar = () => Object({ baz: 3 });
    `);
    const expected = unpad(`
      ({});
      var foo = () => ({});
      var bar = () => ({ baz: 3 });
    `);
    expect(transform(source)).toBe(expected);
  });

  it("shouldn't change referenced identifiers", () => {
    const source = unpad(`
      (function (Boolean, String, Number, Array, Object) {
        return Boolean(a), String(b), Number(c), Array(d), Object(d);
      })(MyBoolean, MyString, MyNumber, MyArray, MyObject);
    `);
    const expected = unpad(`
      (function (Boolean, String, Number, Array, Object) {
        return Boolean(a), String(b), Number(c), Array(d), Object(d);
      })(MyBoolean, MyString, MyNumber, MyArray, MyObject);
    `);
    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/206
  it("should handle floating point numbers in Array()", () => {
    const source = unpad(`
      new Array(-0.01);
      new Array(-1);
    `);
    const expected = unpad(`
      Array(-0.01);
      Array(-1);
    `);
    expect(transform(source)).toBe(expected);
  });
});
