jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");
const thePlugin = require("../../../utils/test-transform")(plugin);

describe("type-constructors-plugin", () => {
  thePlugin(
    "should turn Boolean(x) to !!x",
    `
    Boolean(x);
  `,
    `
    !!x;
  `
  );

  thePlugin(
    "should turn Number(x) to +x",
    `
    Number(x);
  `,
    `
    +x;
  `
  );

  thePlugin(
    "should turn String(x) to x + ''",
    `
    String(x);
  `,
    `
    x + "";
  `
  );

  thePlugin(
    "should turn Array() to []",
    `
    Array();
  `,
    `
    [];
  `
  );

  thePlugin(
    "should turn new Array() to []",
    `
    new Array();
  `,
    `
    [];
  `
  );

  thePlugin(
    "should turn Array(nonNumericValue) to [nonNumericValue]",
    `
    Array("Rome");
    Array(false);
    Array(null);
    new Array({});
    new Array([a, b]);
    Array([]);
    Array(t);
    new Array(a.b);
    new Array((() => 5)());
  `,
    `
    ["Rome"];
    [false];
    [null];
    [{}];
    [[a, b]];
    [[]];
    Array(t);
    Array(a.b);
    Array((() => 5)());
  `
  );

  thePlugin(
    "should turn Array(number) to [,] only if number is <=6",
    `
    Array(0);
    Array(1);
    Array(2 + 4);
    Array(7);
  `,
    `
    [];
    [,];
    [,,,,,,];
    Array(7);
  `
  );

  thePlugin(
    "should turn new Array(number) to Array(number) if number is >6",
    `
    new Array(6);
    new Array(7);
  `,
    `
    [,,,,,,];
    Array(7);
  `
  );

  thePlugin(
    "should turn Array(value, value) to [value, value]",
    `
    Array("a", "b");
    new Array("0", "1", {});
    Array(10, Symbol(), foo());
  `,
    `
    ["a", "b"];
    ["0", "1", {}];
    [10, Symbol(), foo()];
  `
  );

  thePlugin(
    "should turn Object() to {}",
    `
    var x = Object();
  `,
    `
    var x = {};
  `
  );

  thePlugin(
    "should turn new Object() to {}",
    `
    var x = new Object();
  `,
    `
    var x = {};
  `
  );

  thePlugin(
    "should change Object(null|undefined) to {}",
    `
    [
      Object(null),
      Object(undefined),
      new Object(void 0)
    ]
  `,
    `
    [{}, {}, {}];
  `
  );

  // TODO: add Object(Array())
  thePlugin(
    "should change Object({a:b}) to {a:b}",
    `
    [
      Object({}),
      Object({a:b}),
      Object({a:b, c:d}),
    ]
  `,
    `
    [{}, { a: b }, { a: b, c: d }];
  `
  );

  // TODO: add Object(Array())
  thePlugin(
    "should change Object([]) to []",
    `
    [
      Object([]),
      Object([1]),
      Object([1,2]),
      new Object([null])
    ]
  `,
    `
    [[], [1], [1, 2], [null]];
  `
  );

  thePlugin(
    "should change Object(localFn) to localFn",
    `
    function a() {};
    [
      Object(function () {}),
      new Object(a),
      Object(Array)
    ]
  `,
    `
    function a() {};
    [function () {}, a, Object(Array)];
  `
  );

  thePlugin(
    "shouldn't change Object(value) for unrecognized values",
    `
    [
      Object("undefined"),
      Object(nulled),
      Object(0),
      Object(false),
      Object(stuff())
    ]
  `,
    `
    [Object("undefined"), Object(nulled), Object(0), Object(false), Object(stuff())];
  `
  );

  thePlugin(
    "should change new Object(value) to Object(value) for unrecognized values",
    `
    [
      new Object("function"),
      new Object(Symbol),
      new Object(true),
      new Object(1),
      new Object(call({ me: true }))
    ]
  `,
    `
    [Object("function"), Object(Symbol), Object(true), Object(1), Object(call({ me: true }))];
  `
  );

  thePlugin(
    "should change Object() to ({}) in ambiguous contexts",
    `
    new Object();
    var foo = () => Object();
    var bar = () => Object({ baz: 3 });
  `,
    `
    ({});
    var foo = () => ({});
    var bar = () => ({ baz: 3 });
  `
  );

  thePlugin(
    "shouldn't change referenced identifiers",
    `
    (function (Boolean, String, Number, Array, Object) {
      return Boolean(a), String(b), Number(c), Array(d), Object(d);
    })(MyBoolean, MyString, MyNumber, MyArray, MyObject);
  `,
    `
    (function (Boolean, String, Number, Array, Object) {
      return Boolean(a), String(b), Number(c), Array(d), Object(d);
    })(MyBoolean, MyString, MyNumber, MyArray, MyObject);
  `
  );

  // options tests
  it("should not transform type for falsy option", () => {
    const types = {
      boolean: "Boolean",
      number: "Number",
      array: "Array",
      object: "Object",
      string: "String"
    };
    const names = Object.keys(types);
    for (let i = 0; i < names.length; i++) {
      const source = unpad(
        `
        (function () {
          var foo = ${types[names[i]]}(1);
          var bar = ${types[names[i]]}(x);
          var baz = ${types[names[i]]}();
        })();
      `
      );
      expect(
        babel.transform(source, {
          plugins: [[plugin, { [names[i]]: false }]]
        }).code
      ).toBe(source);
    }
  });

  // https://github.com/babel/babili/issues/206
  thePlugin(
    "should handle floating point numbers in Array()",
    `
    new Array(-0.01);
    new Array(-1);
  `,
    `
    Array(-0.01);
    Array(-1);
  `
  );
});
