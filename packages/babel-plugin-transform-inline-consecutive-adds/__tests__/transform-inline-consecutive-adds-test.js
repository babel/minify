jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("transform-inline-consecutive-adds-plugin", () => {
  thePlugin(
    "should collapse simple consecutive",
    `
    const foo = {
      z: 3.0
    };
    foo.a = 42;
    foo.b = ["hi"];
    foo.c = bar();
    foo.d = "str";
  `,
    `
    const foo = {
      z: 3.0,
      a: 42,
      b: ["hi"],
      c: bar(),
      d: "str"
    };
  `
  );

  thePlugin(
    "should collapse only up to last ExpressionStatement",
    `
    const foo = {};
    foo.a = 42;
    console.log(foo);
  `,
    `
    const foo = {
      a: 42
    };

    console.log(foo);
  `
  );

  thePlugin(
    "should not collapse if lval is nested MemberExpression",
    `
    const foo = {};
    foo.bar.a = 42;
  `
  );

  thePlugin(
    "should not collapse if lval has wrong name",
    `
    const foo = {};
    bar.a = 42;
  `
  );

  thePlugin(
    "should not collapse if has direct dependency issues",
    `
    const foo = {};
    foo.a = function () {
      console.log(3);
    };
    foo.b = foo.a();
  `,
    `
    const foo = {
      a: function () {
        console.log(3);
      }
    };

    foo.b = foo.a();
  `
  );

  thePlugin(
    "should not collapse if has indirect dependency issues",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should not collapse if has indirect, nested dependency issues",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should collapse computed properties if they are literals",
    `
    var foo = {};
    foo["a"] = 0;
    foo[4] = 1;
  `,
    `
    var foo = {
      "a": 0,
      4: 1
    };
  `
  );

  thePlugin(
    "should not collapse computed properties otherwise",
    `
    var foo = {};
    foo[global] = 0;
  `
  );

  thePlugin(
    "should not collapse computed properties with dependency issues",
    `
    var foo = {};
    foo[bar()] = 0;
    function bar() {
      console.log(foo);
      return 0;
    }
  `
  );

  thePlugin(
    "should not collapse computed properties with circular reference",
    `
    var foo = {};
    foo.bar = foo;
  `
  );

  thePlugin(
    "should collapse statements with multiple assignments",
    `
    var foo = {};
    foo.a = 0, foo.b = 2;
  `,
    `
    var foo = {
      a: 0,
      b: 2
    };
  `
  );

  thePlugin(
    "should not collapse statements with multiple assignments and dependency issues",
    `
    var foo = {};
    foo.a = 0, foo.b = bar();
    function bar() {
      console.log(foo);
      return 0;
    }
  `
  );

  thePlugin(
    "should collapse statements for arrays",
    `
    var foo = [1, 2];
    foo.push(3, 4), foo.push(5);
    foo.push(6);
  `,
    `
    var foo = [1, 2, 3, 4, 5, 6];
  `
  );

  thePlugin(
    "should collapse statements for sets",
    `
    var foo = new Set();
    foo.add(1), foo.add(2);
    foo.add(3);
  `,
    `
    var foo = new Set([1, 2, 3]);
  `
  );

  thePlugin(
    "should collapse statements for array-initialized sets",
    `
    var foo = new Set([1, 2]);
    foo.add(3);
  `,
    `
    var foo = new Set([1, 2, 3]);
  `
  );

  thePlugin(
    "should not collapse statements for array-initialized sets with circular reference",
    `
    var foo = new Set([1, 2]);
    foo.add(foo);
  `
  );

  thePlugin(
    "should collapse array property assignments",
    `
    var foo = [];
    foo[5] = 'blah';
    foo[3] = 'blah';
    foo[7] = 'blah';
  `,
    `
    var foo = [,,, 'blah',, 'blah',, 'blah'];
  `
  );

  thePlugin(
    "should not collapse array property assignments if long",
    `
    var foo = [];
    foo[10] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if override initial",
    `
    var foo = [1, 2, 3];
    foo[2] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if override dynamic",
    `
    var foo = [1, 2];
    foo[2] = 'blah';
    foo[2] = 'ok';
  `
  );

  thePlugin(
    "should not collapse array property assignments if index is float",
    `
    var foo = [];
    foo[2.1] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if index is non-int as string",
    `
    var foo = [];
    foo['2.1'] = 'blah';
  `
  );

  thePlugin(
    "should collapse array property assignments if index is int as string",
    `
    var foo = [];
    foo['2'] = 'blah';
  `,
    `
    var foo = [,, 'blah'];
  `
  );

  thePlugin(
    "should not collapse array property assignments if it is circular reference",
    `
    var foo = [];
    foo[2] = foo;
  `
  );
});
