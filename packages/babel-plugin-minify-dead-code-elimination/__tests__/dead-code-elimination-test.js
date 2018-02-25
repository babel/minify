jest.autoMockOff();

const babel = require("@babel/core");
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
  thePlugin.skip(
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
});
