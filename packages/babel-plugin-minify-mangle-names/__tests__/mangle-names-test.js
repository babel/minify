jest.autoMockOff();

const plugin = require("../src/index");
const testUtils = require("../../../utils/test");

const transform = testUtils.transformer(plugin);
const transformModule = testUtils.transformer(plugin, {
  sourceType: "module"
});
const transformWithBlockScoping = testUtils.transformerWithBlockScoping(plugin);
const transformWithES2015 = testUtils.transformerWithES2015(plugin);

describe("mangle-names", () => {
  it("should not mangle names in the global namespace", () => {
    const source = `
      var Foo = 1;
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should mangle names", () => {
    const source = `
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle name collisions", () => {
    const source = `
      function foo() {
        var x = 2;
        var xxx = 1;
        if (xxx) {
          console.log(xxx + x);
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should be fine with shadowing", () => {
    const source = `
      var a = 1;
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should not shadow outer references", () => {
    const source = `
      function bar() {
        function foo(a, b, c) {
          lol(a,b,c);
        }

        function lol() {}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should mangle args", () => {
    const source = `
      function foo(xxx) {
        if (xxx) {
          console.log(xxx);
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should ignore labels", () => {
    const source = `
      function foo() {
        meh: for (;;) {
          continue meh;
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should not have labels conflicting with bindings", () => {
    const source = `
      function foo() {
        meh: for (;;) {
          var meh;
          break meh;
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  // https://phabricator.babeljs.io/T6957
  xit("labels should not shadow bindings", () => {
    const source = `
      function foo() {
        var meh;
        meh: for (;;) {
          break meh;
        }
        return meh;
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should be order independent", () => {
    const source = `
      function foo() {
        function bar(aaa, bbb, ccc) {
          baz(aaa, bbb, ccc);
        }
        function baz() {
          var baz = who();
          baz.bam();
        }
        bar();
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should be order independent 2", () => {
    const source = `
      function foo() {
        (function bar() {
          bar();
          return function() {
            var bar = wow();
            bar.woo();
          };
        })();
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle only think in function scopes", () => {
    const source = `
      function foo() {
        function xx(bar, baz) {
          if (1) {
            yy(bar, baz);
          }
        }
        function yy(){}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should be fine with shadowing 2", () => {
    const source = `
      function foo() {
        function xx(bar, baz) {
          return function(boo, foo) {
            bar(boo, foo);
          };
        }
        function yy(){}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should not be confused by scopes", () => {
    const source = `
      function foo() {
        function bar() {
          var baz;
          if (baz) {
            bam();
          }
        }
        function bam() {}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should not be confused by scopes (closures)", () => {
    const source = `
      function foo() {
        function bar(baz) {
          return function() {
            bam();
          };
        }
        function bam() {}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle recursion", () => {
    const source = `
      function bar() {
        function foo(a, b, c) {
          foo(a,b,c);
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle global name conflict", () => {
    const source = `
      function e() {
        function foo() {
          b = bar();
        }
        function bar() {}
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle global name", () => {
    const source = `
      function foo() {
        var bar = 1;
        var baz = 2;
      }
    `;

    expect(transform(source, { blacklist: {foo: true, bar: true }})).toMatchSnapshot();
  });

  it("should handle deeply nested paths with no bindings", () => {
    const source = `
      function xoo() {
        function foo(zz, xx, yy) {
          function bar(zip, zap, zop) {
            return function(bar) {
              zap();
              return function() {
                zip();
              }
            }
          }
        }
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle try/catch", () => {
    const source = `
      function xoo() {
        var e;
        try {} catch (e) {

        }
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should not mangle vars in scope with eval" , () => {
    const source = `
      function foo() {
        var inScopeOuter = 1;
        (function () {
          var inScopeInner = 2;
          eval("inScopeInner + inScopeOuter");
          (function () {
            var outOfScope = 1;
          })();
        })();
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should mangle names with local eval bindings", () => {
    const source = `
      function eval() {}
      function foo() {
        var bar = 1;
        eval('...');
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should mangle names with option eval = true", () => {
    const source = `
      function foo() {
        var inScopeOuter = 1;
        (function () {
          var inScopeInner = 2;
          eval("...");
          (function () {
            var outOfScope = 1;
          })();
        })();
      }
    `;
    expect(transform(source, { eval: true })).toMatchSnapshot();
  });

  it("should integrate with block scoping plugin", () => {
    const source = `
      function f(x) {
        for (let i = 0; i; i++) {
          let n;
          if (n) {
            return;
          }
          g(() => n);
        }
      }
    `;

    expect(transformWithBlockScoping(source)).toMatchSnapshot();
  });

  it("should integrate with block scoping plugin 2", () => {
    const source = `
      (function () {
        function bar() {
          if (smth) {
            let entries = blah();
            entries();
          }
          foo();
        }
        function foo() { }
        module.exports = { bar };
      })();
    `;

    expect(transformWithBlockScoping(source)).toMatchSnapshot();
  });

  it("should keep mangled named consistent across scopes when defined later on", () => {
    const source = `
      (function() {
        function foo() {
          {
            var baz = true;

            {
              bar();
            }
          }
        }

        function bar() {}
      }());
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  it("should correctly mangle in nested loops", () => {
    const source = `
      (function () {
        for (let x in foo) {
          for (let y in foo[x]) {
            alert(foo[x][y]);
          }
        }
      })();
    `;

    expect(transform(source)).toMatchSnapshot();
  });

  // #issue55, #issue57
  it("should correctly mangle function declarations in different order", () => {
    const source = `
      (function(){
        (function() {
          for (let x in y) y[x];
          f(() => { g() });
        })();
        function g() {}
      })();
    `;

    expect(transformWithES2015(source)).toMatchSnapshot();
  });

  it("should NOT mangle functions & classes when keep_fnames is true", () => {
    const source = `
      (function() {
        class Foo {}
        const Bar = class Bar extends Foo {}
        var foo = function foo() {
          foo();
        }
        function bar() {
          foo();
        }
        bar();
        var baz = foo;
        baz();
      })();
    `;
    expect(transform(source, {keepFnames: true})).toMatchSnapshot();
  });

  it("should mangle variable re-declaration / K violations", () => {
    const source = `
      !function () {
        var foo = 1;
        foo++;
        var foo = 2;
        foo++;
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle K violations - 2", () => {
    const source = `
      !function () {
        var bar = 1;
        bar--;
        var bar = 10;
        foo(bar)
        function foo() {
          var foo = 10;
          foo++;
          var foo = 20;
          foo(foo);
        }
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should work with redeclarations", () => {
    const source = `
      (function () {
        var x = y;
        x = z;
        x;
      })();
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should reuse removed vars", () => {
    const source = `
      function Foo() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
        var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
        var $, _;
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should mangle both referenced and binding identifiers with K violations", () => {
    const source = `
      (function () {
        var foo = bar,
            foo = baz;
        foo;
      })();
    `;
    expect(transform(source)).toMatchSnapshot();
  });

  it("should handle export declarations", () => {
    const source = `
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
    `;
    expect(transformModule(source)).toMatchSnapshot();
  });

  it("should find global scope properly", () => {
    const source = unpad(`
      class A {}
      class B extends A {}
      (function () {
        class C {
          constructor() {
            new A();
            new B();
            C;
          }
        }
      })();
    `);
    const expected = unpad(`
      class A {}
      class B extends A {}
      (function () {
        class a {
          constructor() {
            new A();
            new B();
            a;
          }
        }
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should mangle classes properly", () => {
    const source = unpad(`
      class A {}
      class B {}
      new A();
      new B();
      function a() {
        class A {}
        class B {}
        new A();
        new B();
      }
    `);
    const expected = unpad(`
      class A {}
      class B {}
      new A();
      new B();
      function a() {
        class b {}
        class c {}
        new b();
        new c();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/138
  it("should handle class exports in modules - issue#138", () => {
    const source = unpad(`
      export class App extends Object {};
    `);
    const expected = source;
    expect(transform(source, {}, "module")).toBe(expected);
  });
});
