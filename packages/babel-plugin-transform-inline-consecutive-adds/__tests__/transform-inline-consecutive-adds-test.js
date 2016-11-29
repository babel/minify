jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-inline-consecutive-adds-plugin", () => {
  it("should collapse simple consecutive", () => {
    const source = unpad(`
      const foo = {
        z: 3.0
      };
      foo.a = 42;
      foo.b = ["hi"];
      foo.c = bar();
      foo.d = "str";
    `);
    const expected = unpad(`
      const foo = {
        z: 3.0,
        a: 42,
        b: ["hi"],
        c: bar(),
        d: "str"
      };
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collapse only up to last ExpressionStatement", () => {
    const source = unpad(`
      const foo = {};
      foo.a = 42;
      console.log(foo);
    `);
    const expected = unpad(`
      const foo = {
        a: 42
      };

      console.log(foo);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not collapse if lval is nested MemberExpression", () => {
    const source = unpad(`
      const foo = {};
      foo.bar.a = 42;
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse if lval has wrong name", () => {
    const source = unpad(`
      const foo = {};
      bar.a = 42;
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse if has direct dependency issues", () => {
    const source = unpad(`
      const foo = {};
      foo.a = function () {
        console.log(3);
      };
      foo.b = foo.a();
    `);
    const expected = unpad(`
      const foo = {
        a: function () {
          console.log(3);
        }
      };

      foo.b = foo.a();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not collapse if has indirect dependency issues", () => {
    const source = unpad(`
      var foo = {};
      foo.a = 4;
      foo.b = cat();
      function cat() {
        return bar();
      }
      function bar() {
        console.log(foo);
        return 0;
      }
    `);
    const expected = unpad(`
      var foo = {
        a: 4
      };

      foo.b = cat();
      function cat() {
        return bar();
      }
      function bar() {
        console.log(foo);
        return 0;
      }
    `);
    expect(transform(source)).toBe(expected);
  });


  it("should not collapse if has indirect, nested dependency issues", () => {
    const source = unpad(`
      var foo = {};
      foo.a = 4;
      foo.b = cat();
      function cat() {
        return bar();
        function bar() {
          console.log(foo);
          return 0;
        }
      }
    `);
    const expected = unpad(`
      var foo = {
        a: 4
      };

      foo.b = cat();
      function cat() {
        return bar();
        function bar() {
          console.log(foo);
          return 0;
        }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collapse normal computed properties", () => {
    const source = unpad(`
      var foo = {};
      foo["a"] = 0;
      foo[4] = 1;
    `);
    const expected = unpad(`
      var foo = {
        "a": 0,
        4: 1
      };
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not collapse computed properties with dependency issues", () => {
    const source = unpad(`
      var foo = {};
      foo[bar()] = 0;
      function bar() {
        console.log(foo);
        return 0;
      }
    `);
    expect(transform(source)).toBe(source);
  });

  it("should collapse statements with multiple assignments", () => {
    const source = unpad(`
      var foo = {};
      foo.a = 0, foo.b = 2;
    `);
    const expected = unpad(`
      var foo = {
        a: 0,
        b: 2
      };
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not collapse statements with multiple assignments and dependency issues", () => {
    const source = unpad(`
      var foo = {};
      foo.a = 0, foo.b = bar();
      function bar() {
        console.log(foo);
        return 0;
      }
    `);
    expect(transform(source)).toBe(source);
  });

  it("should collapse statements for arrays", () => {
    const source = unpad(`
      var foo = [1, 2];
      foo.push(3, 4), foo.push(5);
      foo.push(6);
    `);
    const expected = unpad(`
      var foo = [1, 2, 3, 4, 5, 6];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collapse statements for sets", () => {
    const source = unpad(`
      var foo = new Set();
      foo.add(1), foo.add(2);
      foo.add(3);
    `);
    const expected = unpad(`
      var foo = new Set([1, 2, 3]);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collapse statements for array-initialized sets", () => {
    const source = unpad(`
      var foo = new Set([1, 2]);
      foo.add(3);
    `);
    const expected = unpad(`
      var foo = new Set([1, 2, 3]);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collapse array property assignments", () => {
    const source = unpad(`
      var foo = [];
      foo[5] = 'blah';
      foo[3] = 'blah';
      foo[7] = 'blah';
    `);
    const expected = unpad(`
      var foo = [,,, 'blah',, 'blah',, 'blah'];
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not collapse array property assignments if long", () => {
    const source = unpad(`
      var foo = [];
      foo[10] = 'blah';
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse array property assignments if override initial", () => {
    const source = unpad(`
      var foo = [1, 2, 3];
      foo[2] = 'blah';
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse array property assignments if override dynamic", () => {
    const source = unpad(`
      var foo = [1, 2];
      foo[2] = 'blah';
      foo[2] = 'ok';
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse array property assignments if index is float", () => {
    const source = unpad(`
      var foo = [];
      foo[2.1] = 'blah';
    `);
    expect(transform(source)).toBe(source);
  });

  it("should not collapse array property assignments if index is non-int as string", () => {
    const source = unpad(`
      var foo = [];
      foo['2.1'] = 'blah';
    `);
    expect(transform(source)).toBe(source);
  });

  it("should collapse array property assignments if index is int as string", () => {
    const source = unpad(`
      var foo = [];
      foo['2'] = 'blah';
    `);
    const expected = unpad(`
      var foo = [,, 'blah'];
    `);
    expect(transform(source)).toBe(expected);
  });
});
