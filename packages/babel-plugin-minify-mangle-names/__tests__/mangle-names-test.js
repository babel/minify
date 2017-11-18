jest.autoMockOff();

const mangler = require("../src/index");
const thePlugin = require("test-transform")(mangler);

describe("mangle-names", () => {
  thePlugin(
    "should NOT mangle name arguments",
    `
      (function () {
        var arguments = void 0;
        (function () {
          console.log(arguments);
        })("argument");
      })();
    `
  );

  thePlugin(
    "should handle eval scopes",
    `
      function eval() {}
      function foo() {
        var bar = 1;
        eval("...");
      }
    `,
    `
      function eval() {}
      function foo() {
        var a = 1;
        eval("...");
      }
    `
  );

  thePlugin(
    "should handle export declarations",
    `
    const foo = 1;
    export { foo };
    export const bar = 2;
    export function baz(bar, foo) {
      bar();
      foo();
    };
    export default function (bar, baz) {
      bar();
      baz();
    }
  `,
    `
    const foo = 1;
    export { foo };
    export const bar = 2;
    export function baz(a, b) {
      a();
      b();
    };
    export default function (a, b) {
      a();
      b();
    }
  `,
    {
      sourceType: "module"
    }
  );

  // https://github.com/babel/minify/issues/138
  thePlugin(
    "should handle class exports in modules - issue#138",
    `
    export class App extends Object {};
  `,
    {
      sourceType: "module"
    }
  );

  thePlugin(
    "should work with if_return optimization changing function scope",
    `
    function foo() {
      if (x)
        return;
      function bar() {}
      bar(a);
    }
  `,
    `
    function foo() {
      function b() {}
      x || b(a);
    }
  `,
    {
      plugins: [
        require("../../babel-plugin-minify-simplify/src/index"),
        mangler
      ]
    }
  );

  thePlugin(
    "should not mangle named exports - 1",
    `
    export const Foo = foo;
  `,
    {
      sourceType: "module",
      plugins: [[mangler, { topLevel: true }]]
    }
  );

  thePlugin(
    "should not mangle named exports - 2",
    `
    const Foo = a;
    export {Foo};
  `,
    `
    const b = a;
    export { b as Foo };
  `,
    {
      sourceType: "module",
      plugins: [[mangler, { topLevel: true }]]
    }
  );

  thePlugin(
    "should not mangle named exports - 3",
    `
    const Foo = a;
    export {Foo as Bar};
  `,
    `
    const b = a;
    export { b as Bar };
  `,
    {
      sourceType: "module",
      plugins: [[mangler, { topLevel: true }]]
    }
  );
});
