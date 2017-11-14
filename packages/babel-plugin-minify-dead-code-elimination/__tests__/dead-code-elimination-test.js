jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("unpad");
const deadcode = require("../src/index");
const simplify = require("../../babel-plugin-minify-simplify/src/index");
const thePlugin = require("test-transform")(deadcode);

function transformWithSimplify(code) {
  return babel.transform(code, {
    plugins: [deadcode, simplify]
  }).code;
}

describe("dce-plugin", () => {
  thePlugin(
    "should not remove used expressions",
    `
    var n = 1;
    if (foo) n;
    console.log(n);

    function bar(a) {
      var a = a ? a : a;
    }
  `,
    `
    var n = 1;
    if (foo) ;
    console.log(n);

    function bar(a) {
      var a = a ? a : a;
    }
  `
  );

  thePlugin(
    "should handle case blocks ",
    `
    function a() {
      switch (foo) {
        case 6:
          return bar;
          break;
      }
    }
  `,
    `
    function a() {
      switch (foo) {
        case 6:
          return bar;
          break;
      }
    }
  `
  );

  // NCE = Named Class Expressions
  thePlugin(
    "should remove names from named class expressions",
    `
    var Foo = class Bar {};
  `,
    `
    var Foo = class {};
  `
  );

  thePlugin(
    "should not remove names from named class expressions when the name is used",
    `
    var Foo = class Bar {
      constructor() {
        console.log(Bar);
      }
    };
  `
  );

  thePlugin(
    "should handle variable declarations with same name as the class expression name",
    `
    (function () {
      var A = class A {
        constructor() {
          this.class = A;
        }
      }
      var B = class B {};
      exports.A = A;
      exports.B = B;
    })();
  `,
    `
    (function () {
      exports.A = class A {
        constructor() {
          this.class = A;
        }
      };
      exports.B = class {};
    })();
  `
  );

  thePlugin(
    "should latch on to exisiting vars",
    `
   function x(a) {
     if (a) {
       var x = a.wat;
       foo(x);
     }
     var z = a.foo, b = b.bar;
     return z + b;
   }
  `,
    `
    function x(a) {
      if (a) {
        x = a.wat;

        foo(x);
      }
      var z = a.foo,
          b = b.bar,
          x;
      return z + b;
    }
  `,
    {
      plugins: [[deadcode, { optimizeRawSize: true }]]
    }
  );

  thePlugin.skip(
    "should evaluate and remove falsy code",
    `
    foo(0 && bar());
  `,
    `
    foo(0);
  `
  );

  thePlugin(
    "should not evaluate to false and remove conditional",
    `
    function foo(obj) {
      return obj && typeof obj === "object" ? x() : obj;
    }
  `,
    `
    function foo(obj) {
      return obj && typeof obj === "object" ? x() : obj;
    }
  `
  );

  // https://github.com/babel/minify/issues/265
  it("should integrate with simplify plugin changing scopes", () => {
    const source = unpad(`
      function getParentConditionalPath(path) {
        let parentPath;
        while (parentPath = path.parentPath) {
          if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) {
            if (path.key === "test") {
              return;
            } else {
              return parentPath;
            }
          } else {
            path = parentPath;
          }
        }
      }
    `);
    const expected = unpad(`
      function getParentConditionalPath(path) {
        for (let parentPath; parentPath = path.parentPath;) {
          if (parentPath.isIfStatement() || parentPath.isConditionalExpression()) return path.key === "test" ? void 0 : parentPath;
          path = parentPath;
        }
      }
    `);
    expect(transformWithSimplify(source)).toBe(expected);
  });

  thePlugin.skip(
    "should optimize to void 0 for lets referenced before init declarations",
    `
      function foo() {
        bar(a); // Should be a ReferenceError
        let a = 1;
      }
    `,
    {
      plugins: [[deadcode, { tdz: true }]]
    }
  );

  thePlugin(`should not inline into JSXIdentifiers`,
      `
    function foo(obj) {
      var Element = obj || "";

      return <Element />;
    }
  `,
    `
    function foo(obj) {
      var Element = obj || "";

      return <Element />;
    }
  `,
    {
      parserOpts: { plugins:["jsx"] },
      plugins: [deadcode]
    }
  )
});
