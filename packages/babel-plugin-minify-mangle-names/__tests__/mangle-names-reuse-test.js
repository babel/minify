jest.autoMockOff();

const traverse = require("babel-traverse").default;
const babel    = require("babel-core");
const unpad    = require("../../../utils/unpad");

function transform(code, options = {}, sourceType = "script") {
  options.reuse = true;
  return babel.transform(code,  {
    sourceType,
    plugins: [
      [require("../src/index"), options],
    ],
  }).code;
}

function transformWithSimplify(code, options = {}, sourceType = "script") {
  options.reuse = true;
  return babel.transform(code, {
    sourceType,
    plugins: [
      require("../../babel-plugin-minify-simplify/src/index"),
      [require("../src/index"), options]
    ]
  }).code;
}

describe("mangle-names", () => {
  it("should not mangle names in the global namespace", () => {
    const source = unpad(`
      var Foo = 1;
    `);
    const expected = unpad(`
      var Foo = 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should mangle names", () => {
    const source = unpad(`
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var a = 1;
        if (a) {
          console.log(a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle name collisions", () => {
    const source = unpad(`
      function foo() {
        var x = 2;
        var xxx = 1;
        if (xxx) {
          console.log(xxx + x);
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var a = 2;
        var b = 1;
        if (b) {
          console.log(b + a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should be fine with shadowing", () => {
    const source = unpad(`
      var a = 1;
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);
    const expected = unpad(`
      var a = 1;
      function foo() {
        var a = 1;
        if (a) {
          console.log(a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not shadow outer references", () => {
    const source = unpad(`
      function bar() {
        function foo(a, b, c) {
          lol(a,b,c);
        }

        function lol() {}
      }
    `);
    const expected = unpad(`
      function bar() {
        function a(d, a, e) {
          b(d, a, e);
        }

        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should mangle args", () => {
    const source = unpad(`
      function foo(xxx) {
        if (xxx) {
          console.log(xxx);
        }
      }
    `);
    const expected = unpad(`
      function foo(a) {
        if (a) {
          console.log(a);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should ignore labels", () => {
    const source = unpad(`
      function foo() {
        meh: for (;;) {
          continue meh;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        meh: for (;;) {
          continue meh;
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not have labels conflicting with bindings", () => {
    const source = unpad(`
      function foo() {
        meh: for (;;) {
          var meh;
          break meh;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        meh: for (;;) {
          var a;
          break meh;
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  // https://phabricator.babeljs.io/T6957
  it("labels should not shadow bindings", () => {
    const source = unpad(`
      function foo() {
        var meh;
        meh: for (;;) {
          break meh;
        }
        return meh;
      }
    `);

    const expected = unpad(`
      function foo() {
        var a;
        meh: for (;;) {
          break meh;
        }
        return a;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("labels should not shadow bindings 2", () => {
    const source = unpad(`
      function f(a) {
        try {
          a: {
            console.log(a);
          }
        } catch ($a) { }
      }
    `);
    const expected = unpad(`
      function f(b) {
        try {
          a: {
            console.log(b);
          }
        } catch (a) {}
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should be order independent", () => {
    const source = unpad(`
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
    `);

    const expected = unpad(`
      function foo() {
        function a(a, c, d) {
          b(a, c, d);
        }
        function b() {
          var a = who();
          a.bam();
        }
        a();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should be order independent 2", () => {
    const source = unpad(`
      function foo() {
        (function bar() {
          bar();
          return function() {
            var bar = wow();
            bar.woo();
          };
        })();
      }
    `);

    const expected = unpad(`
      function foo() {
        (function a() {
          a();
          return function () {
            var a = wow();
            a.woo();
          };
        })();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle only think in function scopes", () => {
    const source = unpad(`
      function foo() {
        function xx(bar, baz) {
          if (1) {
            yy(bar, baz);
          }
        }
        function yy(){}
      }
    `);
    const expected = unpad(`
      function foo() {
        function a(a, c) {
          if (1) {
            b(a, c);
          }
        }
        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should be fine with shadowing 2", () => {
    const source = unpad(`
      function foo() {
        function xx(bar, baz) {
          return function(boo, foo) {
            bar(boo, foo);
          };
        }
        function yy(){}
      }
    `);
    const expected = unpad(`
      function foo() {
        function a(a, b) {
          return function (b, c) {
            a(b, c);
          };
        }
        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not be confused by scopes", () => {
    const source = unpad(`
      function foo() {
        function bar() {
          var baz;
          if (baz) {
            bam();
          }
        }
        function bam() {}
      }
    `);
    const expected = unpad(`
      function foo() {
        function a() {
          var a;
          if (a) {
            b();
          }
        }
        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not be confused by scopes (closures)", () => {
    const source = unpad(`
      function foo() {
        function bar(baz) {
          return function() {
            bam();
          };
        }
        function bam() {}
      }
    `);
    const expected = unpad(`
      function foo() {
        function a(a) {
          return function () {
            b();
          };
        }
        function b() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle recursion", () => {
    const source = unpad(`
      function bar() {
        function foo(a, b, c) {
          foo(a,b,c);
        }
      }
    `);
    const expected = unpad(`
      function bar() {
        function a(d, e, b) {
          a(d, e, b);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle global name conflict", () => {
    const source = unpad(`
      function e() {
        function foo() {
          b = bar();
        }
        function bar() {}
      }
    `);
    const expected = unpad(`
      function e() {
        function a() {
          b = c();
        }
        function c() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle global name", () => {
    const source = unpad(`
      function foo() {
        var bar = 1;
        var baz = 2;
      }
    `);

    const expected = unpad(`
      function foo() {
        var bar = 1;
        var a = 2;
      }
    `);
    expect(transform(source, { blacklist: {foo: true, bar: true }})).toBe(expected);
  });

  it("should handle deeply nested paths with no bindings", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      function xoo() {
        function a(a, b, c) {
          function d(a, b, c) {
            return function (c) {
              b();
              return function () {
                a();
              };
            };
          }
        }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle try/catch", () => {
    const source = unpad(`
      function xoo() {
        var e;
        try {} catch (e) {

        }
      }
    `);
    const expected = unpad(`
      function xoo() {
        var a;
        try {} catch (a) {}
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not mangle vars in scope with eval" , () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      function foo() {
        var inScopeOuter = 1;
        (function () {
          var inScopeInner = 2;
          eval("inScopeInner + inScopeOuter");
          (function () {
            var a = 1;
          })();
        })();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should mangle names with local eval bindings", () => {
    const source = unpad(`
      function eval() {}
      function foo() {
        var bar = 1;
        eval('...');
      }
    `);
    const expected = unpad(`
      function eval() {}
      function foo() {
        var a = 1;
        eval('...');
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should mangle names with option eval = true", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      function foo() {
        var a = 1;
        (function () {
          var a = 2;
          eval("...");
          (function () {
            var a = 1;
          })();
        })();
      }
    `);
    expect(transform(source, { eval: true })).toBe(expected);
  });

  it("should integrate with block scoping plugin", () => {
    const srcTxt = unpad(`
      function f(x) {
        for (let i = 0; i; i++) {
          let n;
          if (n) {
            return;
          }
          g(() => n);
        }
      }
    `);

    const first = babel.transform(srcTxt, {
      plugins: ["transform-es2015-block-scoping"],
      code: false,
    });

    traverse.clearCache();

    const actual = babel.transformFromAst(first.ast, null, {
      plugins: [[require("../src/index"), { reuse: true }]],
    }).code;

    const expected = unpad(`
      function f(a) {
        var b = function (a) {
          var b = void 0;
          if (b) {
            return {
              v: void 0
            };
          }
          g(() => b);
        };

        for (var d = 0; d; d++) {
          var c = b(d);
          if (typeof c === "object") return c.v;
        }
      }
    `);

    expect(actual).toBe(expected);
  });

  it("should integrate with block scoping plugin 2", () => {
    const srcTxt = unpad(`
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
    `);

    const first = babel.transform(srcTxt, {
      plugins: ["transform-es2015-block-scoping"],
      code: false,
    });

    traverse.clearCache();

    const actual = babel.transformFromAst(first.ast, null, {
      plugins: [[require("../src/index"), { reuse: true }]],
    }).code;

    const expected = unpad(`
      (function () {
        function a() {
          if (smth) {
            var a = blah();
            a();
          }
          b();
        }
        function b() {}
        module.exports = { bar: a };
      })();
    `);

    expect(actual).toBe(expected);
  });

  it("should keep mangled named consistent across scopes when defined later on", () => {
    const source = unpad(`
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
    `);

    const expected = unpad(`
      (function () {
        function a() {
          {
            var a = true;

            {
              b();
            }
          }
        }

        function b() {}
      })();
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should correctly mangle in nested loops", () => {
    const source = unpad(`
      (function () {
        for (let x in foo) {
          for (let y in foo[x]) {
            alert(foo[x][y]);
          }
        }
      })();
    `);

    const expected = unpad(`
      (function () {
        for (let a in foo) {
          for (let b in foo[a]) {
            alert(foo[a][b]);
          }
        }
      })();
    `);

    expect(transform(source)).toBe(expected);
  });

  // #issue55, #issue57
  it("should correctly mangle function declarations in different order", () => {
    const source = unpad(`
      (function(){
        (function() {
          for (let x in y) y[x];
          f(() => { g() });
        })();
        function g() {}
      })();
    `);

    const ast = babel.transform(source, {
      presets: ["env"],
      sourceType: "script",
      code: false
    }).ast;

    traverse.clearCache();

    const actual = babel.transformFromAst(ast, null, {
      sourceType: "script",
      plugins: [require("../src/index")]
    }).code;

    const expected = unpad(`
      "use strict";

      (function () {
        (function () {
          for (var b in y) {
            y[b];
          }f(function () {
            a();
          });
        })();
        function a() {}
      })();
    `);

    expect(actual).toBe(expected);
  });

  it("should NOT mangle functions & classes when keepFnName is true", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      (function () {
        class Foo {}
        const a = class Bar extends Foo {};
        var b = function foo() {
          foo();
        };
        function bar() {
          b();
        }
        bar();
        var c = b;
        c();
      })();
    `);
    expect(transform(source, {keepFnName: true})).toBe(expected);
  });

  it("should mangle variable re-declaration / K violations", () => {
    const source = unpad(`
      !function () {
        var foo = 1;
        foo++;
        var foo = 2;
        foo++;
      }
    `);
    const expected = unpad(`
      !function () {
        var a = 1;
        a++;
        var a = 2;
        a++;
      };
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle K violations - 2", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      !function () {
        var b = 1;
        b--;
        var b = 10;
        a(b);
        function a() {
          var a = 10;
          a++;
          var a = 20;
          a(a);
        }
      };
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should work with redeclarations", () => {
    const source = unpad(`
      (function () {
        var x = y;
        x = z;
        x;
      })();
    `);
    const expected = unpad(`
      (function () {
        var a = y;
        a = z;
        a;
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should reuse removed vars", () => {
    const source = unpad(`
      function Foo() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
        var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
        var $, _;
        a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
        A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
        $, _;
        function Foo() {
          var a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
          var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
          var $, _;
          a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
          A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
          $, _;
          function Foo() {
            var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
            var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
            var $, _;
            a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z;
            A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z;
            $, _;
          }
          Foo();
        }
        Foo();
      }
    `);
    const expected = unpad(`
      function Foo() {
        var ba, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
        var z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
        var Z, $;
        ba, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
        z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
        Z, $;
        function aa() {
          var aa, a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
          var z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
          var Z, $;
          aa, a, b, c, d, e, f, g, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
          z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
          Z, $;
          function h() {
            var aa, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
            var z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
            var Z, $;
            aa, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
            z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y;
            Z, $;
          }
          h();
        }
        aa();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should mangle both referenced and binding identifiers with K violations", () => {
    const source = unpad(`
      (function () {
        var foo = bar,
            foo = baz;
        foo;
      })();
    `);
    const expected = unpad(`
      (function () {
        var a = bar,
            a = baz;
        a;
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle export declarations", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
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
    `);
    expect(transform(source, {}, "module")).toBe(expected);
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
        class a {}
        class b {}
        new a();
        new b();
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

  it("should not mangle the name arguments", () => {
    const source = unpad(`
      (function () {
        var arguments = void 0;
        (function () {
          console.log(arguments);
        })("argument");
      })();
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should handle constant violations across multiple blocks", () => {
    const source = unpad(`
      function foo() {
        var x;x;x;
        {
          var x;x;x;
          function y() {
            var x;x;x;
            {
              var x;x;x;
            }
          }
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        var a;a;a;
        {
          var a;a;a;
          function b() {
            var a;a;a;
            {
              var a;a;a;
            }
          }
        }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should work with if_return optimization changing fn scope", () => {
    const source = unpad(`
      function foo() {
        if (x)
          return;
        function bar() {}
        bar(a);
      }
    `);
    const expected = unpad(`
      function foo() {
        function b() {}
        x || b(a);
      }
    `);
    expect(transformWithSimplify(source)).toBe(expected);
  });
});
