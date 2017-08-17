jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("transform-inline-consecutive-adds-plugin", () => {
  thePlugin(
    "should collapse simple consecutive assignments",
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
    "should collapse only up to the last ExpressionStatement",
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
    "should not collapse if the lval is a nested MemberExpression",
    `
    const foo = {};
    foo.bar.a = 42;
  `
  );

  thePlugin(
    "should not collapse if the lval is different from the one in hte previous line",
    `
    const foo = {};
    bar.a = 42;
  `
  );

  thePlugin(
    "should not collapse if the property directly depends on another property",
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
    "should not collapse if the property indirectly depends on another property",
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
    "should not collapse if the property indirectly depends on another property inside a nested function",
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
    "should not collapse computed properties whose key depends on the object",
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
    "should not collapse computed properties with circular references",
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
    "should collapse `Array#push` calls",
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
    "should collapse `Set#add` calls",
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
    "should collapse `Set#add` calls with array-initialized sets",
    `
    var foo = new Set([1, 2]);
    foo.add(3);
  `,
    `
    var foo = new Set([1, 2, 3]);
  `
  );

  thePlugin(
    "should not collapse statements for array-initialized sets with circular references",
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
    "should not collapse array property assignments if it doesn’t make the code shorter",
    `
    var foo = [];
    foo[10] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if they override properties assigned in the inital declaration",
    `
    var foo = [1, 2, 3];
    foo[2] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if they override properties assigned outside of the initial declaration",
    `
    var foo = [1, 2];
    foo[2] = 'blah';
    foo[2] = 'ok';
  `
  );

  thePlugin(
    "should not collapse array property assignments if the index is a float",
    `
    var foo = [];
    foo[2.1] = 'blah';
  `
  );

  thePlugin(
    "should not collapse array property assignments if index is a float written as a string",
    `
    var foo = [];
    foo['2.1'] = 'blah';
  `
  );

  thePlugin(
    "should collapse array property assignments if index is an integer written as string",
    `
    var foo = [];
    foo['2'] = 'blah';
  `,
    `
    var foo = [,, 'blah'];
  `
  );

  thePlugin(
    "should not collapse array property assignments if the rval is a circular reference",
    `
    var foo = [];
    foo[2] = foo;
  `
  );
});
