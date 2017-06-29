jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");
const traverse = require("babel-traverse").default;
const mangler = require("../src/index");
const thePlugin = require("../../../utils/test-transform")(mangler);

describe("mangle-names", () => {
  thePlugin(
    "should not mangle names in the global namespace",
    `
    var Foo = 1;
  `
  );

  thePlugin(
    "should mangle names",
    `
    function foo() {
      var xxx = 1;
      if (xxx) {
        console.log(xxx);
      }
    }
  `,
    `
    function foo() {
      var a = 1;
      if (a) {
        console.log(a);
      }
    }
  `
  );

  thePlugin(
    "should handle name collisions",
    `
    function foo() {
      var x = 2;
      var xxx = 1;
      if (xxx) {
        console.log(xxx + x);
      }
    }
  `,
    `
    function foo() {
      var a = 2;
      var b = 1;
      if (b) {
        console.log(b + a);
      }
    }
  `
  );

  thePlugin(
    "should handle shadowing properly",
    `
    var a = 1;
    function foo() {
      var xxx = 1;
      if (xxx) {
        console.log(xxx);
      }
    }
  `,
    `
    var a = 1;
    function foo() {
      var a = 1;
      if (a) {
        console.log(a);
      }
    }
  `
  );

  thePlugin(
    "should not shadow outer references",
    `
    function bar() {
      function foo(a, b, c) {
        lol(a,b,c);
      }
      function lol() {}
    }
  `,
    `
    function bar() {
      function a(e, a, b) {
        d(e, a, b);
      }
      function d() {}
    }
  `
  );

  thePlugin(
    "should mangle args",
    `
    function foo(xxx) {
      if (xxx) {
        console.log(xxx);
      }
    }
  `,
    `
    function foo(a) {
      if (a) {
        console.log(a);
      }
    }
  `
  );

  thePlugin(
    "should not mangle labels",
    `
    function foo() {
      meh: for (;;) {
        continue meh;
      }
    }
  `,
    `
    function foo() {
      meh: for (;;) {
        continue meh;
      }
    }
  `
  );

  thePlugin(
    "should mangle variables with the same name as labels",
    `
    function foo() {
      meh: for (;;) {
        var meh;
        break meh;
      }
    }
  `,
    `
    function foo() {
      meh: for (;;) {
        var a;
        break meh;
      }
    }
  `
  );

  // https://phabricator.babeljs.io/T6957
  thePlugin(
    "labels should not shadow bindings",
    `
    function foo() {
      var meh;
      meh: for (;;) {
        break meh;
      }
      return meh;
    }

    function f(a) {
      try {
        a: {
          console.log(a);
        }
      } catch ($a) { }
    }
  `,
    `
    function foo() {
      var a;
      meh: for (;;) {
        break meh;
      }
      return a;
    }

    function f(b) {
      try {
        a: {
          console.log(b);
        }
      } catch (a) {}
    }
  `
  );

  thePlugin(
    "should be order independent",
    `
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

    function foo2() {
      (function bar() {
        bar();
        return function() {
          var bar = wow();
          bar.woo();
        };
      })();
    }
  `,
    `
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

    function foo2() {
      (function a() {
        a();
        return function () {
          var a = wow();
          a.woo();
        };
      })();
    }
  `
  );

  thePlugin(
    "should handle only thunk in function scopes",
    `
    function foo() {
      function xx(bar, baz) {
        if (1) {
          yy(bar, baz);
        }
      }
      function yy(){}
    }
  `,
    `
    function foo() {
      function a(a, c) {
        if (1) {
          b(a, c);
        }
      }
      function b() {}
    }
  `
  );

  thePlugin(
    "should be fine with shadowing 2",
    `
    function foo() {
      function xx(bar, baz) {
        return function(boo, foo) {
          bar(boo, foo);
        };
      }
      function yy(){}
    }
  `,
    `
    function foo() {
      function a(a, b) {
        return function (b, c) {
          a(b, c);
        };
      }
      function b() {}
    }
  `
  );

  thePlugin(
    "should not be confused by scopes",
    `
    function foo() {
      function bar() {
        var baz;
        if (baz) {
          bam();
        }
      }
      function bam() {}
    }
  `,
    `
    function foo() {
      function a() {
        var a;
        if (a) {
          b();
        }
      }
      function b() {}
    }
  `
  );

  thePlugin(
    "should not be confused by scopes (closures)",
    `
    function foo() {
      function bar(baz) {
        return function() {
          bam();
        };
      }
      function bam() {}
    }
  `,
    `
    function foo() {
      function a(a) {
        return function () {
          b();
        };
      }
      function b() {}
    }
  `
  );

  thePlugin(
    "should handle recursion",
    `
    function bar() {
      function foo(a, b, c) {
        foo(a,b,c);
      }
    }
  `,
    `
    function bar() {
      function d(e, a, b) {
        d(e, a, b);
      }
    }
  `
  );

  thePlugin(
    "should handle global name conflicts",
    `
    function e() {
      function foo() {
        b = bar();
      }
      function bar() {}
    }
  `,
    `
    function e() {
      function a() {
        b = c();
      }
      function c() {}
    }
  `
  );

  thePlugin(
    "should handle global names",
    `
    function foo() {
      var bar = 1;
      var baz = 2;
    }
  `,
    `
    function a() {
      var bar = 1;
      var a = 2;
    }
  `,
    {
      plugins: [
        [
          mangler,
          {
            blacklist: { foo: false, bar: true },
            topLevel: true
          }
        ]
      ]
    }
  );

  thePlugin(
    "should handle deeply nested paths with no bindings",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should handle try...catch statements",
    `
    function xoo() {
      var e;
      try {} catch (e) {

      }
    }
  `,
    `
    function xoo() {
      var a;
      try {} catch (a) {}
    }
  `
  );

  thePlugin(
    "should not mangle vars in scope with eval",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should mangle names with local eval bindings",
    `
    function eval() {}
    function foo() {
      var bar = 1;
      eval('...');
    }
  `,
    `
    function eval() {}
    function foo() {
      var a = 1;
      eval('...');
    }
  `
  );

  thePlugin(
    "should mangle names with option eval = true",
    `
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
  `,
    `
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
  `,
    {
      plugins: [[mangler, { eval: true }]]
    }
  );

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
      code: false
    });

    traverse.clearCache();

    const actual = babel.transformFromAst(first.ast, null, {
      plugins: [require("../src/index")]
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
      code: false
    });

    traverse.clearCache();

    const actual = babel.transformFromAst(first.ast, null, {
      plugins: [require("../src/index")]
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

  thePlugin(
    "should keep mangled named consistent across scopes when defined later on",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should correctly mangle in nested loops",
    `
    (function () {
      for (let x in foo) {
        for (let y in foo[x]) {
          alert(foo[x][y]);
        }
      }
    })();
  `,
    `
    (function () {
      for (let a in foo) {
        for (let b in foo[a]) {
          alert(foo[a][b]);
        }
      }
    })();
  `
  );

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

  thePlugin(
    "should NOT mangle functions when keepFnName is true",
    `
    (function() {
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
  `,
    `
    (function () {
      var a = function foo() {
        foo();
      };
      function bar() {
        a();
      }
      bar();
      var b = a;
      b();
    })();
  `,
    {
      plugins: [[mangler, { keepFnName: true }]]
    }
  );

  thePlugin(
    "should NOT mangle classes when keepClassName is true",
    `
    (function() {
      class Foo {}
      const Bar = class Bar extends Foo {}
      var foo = class Baz {}
      function bar() {
        new foo();
      }
      bar();
    })();
  `,
    `
    (function () {
      class Foo {}
      const b = class Bar extends Foo {};
      var c = class Baz {};
      function a() {
        new c();
      }
      a();
    })();
  `,
    {
      plugins: [[mangler, { keepClassName: true }]]
    }
  );

  thePlugin(
    "should mangle variable re-declaration / K violations",
    `
    !function () {
      var foo = 1;
      foo++;
      var foo = 2;
      foo++;
    }
  `,
    `
    !function () {
      var a = 1;
      a++;
      var a = 2;
      a++;
    };
  `
  );

  thePlugin(
    "should handle K violations - 2",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should work with redefinitions",
    `
    (function () {
      var x = y;
      x = z;
      x;
    })();
  `,
    `
    (function () {
      var a = y;
      a = z;
      a;
    })();
  `
  );

  thePlugin(
    "should reuse removed vars",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should mangle both referenced and binding identifiers with K violations",
    `
    (function () {
      var foo = bar,
          foo = baz;
      foo;
    })();
  `,
    `
    (function () {
      var a = bar,
          a = baz;
      a;
    })();
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

  thePlugin(
    "should find global scope properly",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should mangle classes properly",
    `
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
  `,
    `
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
  `
  );

  // https://github.com/babel/babili/issues/138
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
    "should not mangle the `arguments` variable",
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
    "should mangle top-level variables when topLevel option is true",
    `
    function foo() {
      if (FOO_ENV === "production") {
        HELLO_WORLD.call();
      }
    }
    const FOO_ENV = "production";
    var HELLO_WORLD = function bar() {
      new AbstractClass({
        [FOO_ENV]: "foo",
        a: foo(HELLO_WORLD)
      });
    };
    class AbstractClass {}
    foo();
  `,
    `
    function a() {
      if (b === "production") {
        c.call();
      }
    }
    const b = "production";
    var c = function e() {
      new d({
        [b]: "foo",
        a: a(c)
      });
    };
    class d {}
    a();
  `,
    {
      plugins: [[mangler, { topLevel: true }]]
    }
  );

  thePlugin(
    "should fix #326, #369 - destructuring",
    `
    // issue#326
    function a() {
      let foo, bar, baz;
      ({foo, bar, baz} = {});
      return {foo, bar, baz};
    }
    // issue#369
    function decodeMessage(message){
      let namespace;
      let name;
      let value = null;

      [, namespace, name, value] = message.split(',') || [];
      console.log(name);
    }
  `,
    `
    // issue#326
    function a() {
      let a, b, c;
      ({ foo: a, bar: b, baz: c } = {});
      return { foo: a, bar: b, baz: c };
    }
    // issue#369
    function decodeMessage(a) {
      let b;
      let c;
      let d = null;

      [, b, c, d] = a.split(',') || [];
      console.log(c);
    }
  `
  );

  thePlugin(
    "should rename binding.identifier - issue#411",
    `
    !function () {
      function e(e) {
        foo(e);
      }
      return function () {
        return e();
      };
    }();
  `,
    `
    !function () {
      function a(a) {
        foo(a);
      }
      return function () {
        return a();
      };
    }();
  `
  );

  thePlugin(
    "should fix issue#365 - classDeclaration with unsafe parent scope",
    `
    function foo() {
      eval("");
      class A {}
      class B {}
    }
  `
  );

  thePlugin(
    "should fix classDeclaration with unsafe program scope",
    `
    class A {}
    class B {}
    eval("");
  `,
    {
      plugins: [[mangler, { topLevel: true }]]
    }
  );

  thePlugin(
    "should handle constant violations across multiple blocks",
    `
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
  `,
    `
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
  `
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

  // Safari raises a syntax error for a `let` or `const` declaration in a `for`
  // loop initialization that shadows a parent function's parameter.
  // https://github.com/babel/babili/issues/559
  // https://bugs.webkit.org/show_bug.cgi?id=171041
  // https://trac.webkit.org/changeset/217200/webkit/trunk/Source
  describe("Safari for loop lexical scope workaround", () => {
    thePlugin(
      "should permit shadowing in top-level for loops",
      `
        var a;

        for (a = 0;;);
        for (a of x);
        for (x of a);
        for (a in x);
        for (x in a);
        for (;; a++);
        for (;; a = 1);

        for (let b;;);
        for (let b of x);
        for (const b of x);
        for (let b in x);
        for (const b in x);
        for (let [b, c] of x);
        for (const [b, c] of x);
        for (let [b, c] in x);
        for (const [b, c] in x);
        for (let { c: { b: { a } } } = x;;);
        for (;; () => {
          let a = 1;
        });
      `,
      `
        var a;

        for (a = 0;;);
        for (a of x);
        for (x of a);
        for (a in x);
        for (x in a);
        for (;; a++);
        for (;; a = 1);

        for (let a;;);
        for (let a of x);
        for (const a of x);
        for (let a in x);
        for (const a in x);
        for (let [a, b] of x);
        for (const [a, b] of x);
        for (let [a, b] in x);
        for (const [a, b] in x);
        for (let { c: { b: { a: b } } } = x;;);
        for (;; () => {
          let b = 1;
        });
      `
    );

    thePlugin(
      "should permit shadowing in nested for loops",
      `
      function a(a) {
        {
          for (a = 0;;);
          for (a of x);
          for (x of a);
          for (a in x);
          for (x in a);
          for (;; a++);
          for (;; a = 1);

          for (let a;;);
          for (let a of x);
          for (const a of x);
          for (let a in x);
          for (const a in x);
          for (let [a, b] of x);
          for (const [a, b] of x);
          for (let [a, b] in x);
          for (const [a, b] in x);
          for (let { c: { b: { a } } } = x;;);
          for (;; () => {
            let a = 1;
          });
        }
      }
    `,
      `
      function a(b) {
        {
          for (b = 0;;);
          for (b of x);
          for (x of b);
          for (b in x);
          for (x in b);
          for (;; b++);
          for (;; b = 1);

          for (let b;;);
          for (let b of x);
          for (const b of x);
          for (let b in x);
          for (const b in x);
          for (let [c, a] of x);
          for (const [c, a] of x);
          for (let [c, a] in x);
          for (const [c, a] in x);
          for (let { c: { b: { a: b } } } = x;;);
          for (;; () => {
            let b = 1;
          });
        }
      }
    `
    );

    thePlugin(
      "should not shadow params in function declaration top-level for loops",
      `
      function a(a) {
        for (a = 0;;);
        for (a of x);
        for (x of a);
        for (a in x);
        for (x in a);
        for (;; a++);
        for (;; a = 1);

        for (let b;;);
        for (let b of x);
        for (const b of x);
        for (let b in x);
        for (const b in x);
        for (let [b, c] of x);
        for (const [b, c] of x);
        for (let [b, c] in x);
        for (const [b, c] in x);
        for (let { c: { b: { a } } } = x;;);
        for (;; () => {
          let a = 1;
        });
      }
    `,
      `
      function a(b) {
        for (b = 0;;);
        for (b of x);
        for (x of b);
        for (b in x);
        for (x in b);
        for (;; b++);
        for (;; b = 1);

        for (let a;;);
        for (let a of x);
        for (const a of x);
        for (let a in x);
        for (const a in x);
        for (let [a, d] of x);
        for (const [a, d] of x);
        for (let [a, d] in x);
        for (const [a, d] in x);
        for (let { c: { b: { a: c } } } = x;;);
        for (;; () => {
          let b = 1;
        });
      }
    `
    );

    thePlugin(
      "should not shadow params in function expression top-level for loops",
      `
      var a = function (a) {
        for (a = 0;;);
        for (a of x);
        for (x of a);
        for (a in x);
        for (x in a);
        for (;; a++);
        for (;; a = 1);

        for (let b;;);
        for (let b of x);
        for (const b of x);
        for (let b in x);
        for (const b in x);
        for (let [b, c] of x);
        for (const [b, c] of x);
        for (let [b, c] in x);
        for (const [b, c] in x);
        for (let { c: { b: { a } } } = x;;);
        for (;; () => {
          let a = 1;
        });
      };
    `,
      `
      var a = function (b) {
        for (b = 0;;);
        for (b of x);
        for (x of b);
        for (b in x);
        for (x in b);
        for (;; b++);
        for (;; b = 1);

        for (let a;;);
        for (let a of x);
        for (const a of x);
        for (let a in x);
        for (const a in x);
        for (let [a, d] of x);
        for (const [a, d] of x);
        for (let [a, d] in x);
        for (const [a, d] in x);
        for (let { c: { b: { a: c } } } = x;;);
        for (;; () => {
          let b = 1;
        });
      };
    `
    );

    thePlugin(
      "should not shadow params in arrow function top-level for loops",
      `
      var a = (a) => {
        for (a = 0;;);
        for (a of x);
        for (x of a);
        for (a in x);
        for (x in a);
        for (;; a++);
        for (;; a = 1);

        for (let b;;);
        for (let b of x);
        for (const b of x);
        for (let b in x);
        for (const b in x);
        for (let [b, c] of x);
        for (const [b, c] of x);
        for (let [b, c] in x);
        for (const [b, c] in x);
        for (let { c: { b: { a } } } = x;;);
        for (;; () => {
          let a = 1;
        });
      };
    `,
      `
      var a = (b) => {
        for (b = 0;;);
        for (b of x);
        for (x of b);
        for (b in x);
        for (x in b);
        for (;; b++);
        for (;; b = 1);

        for (let a;;);
        for (let a of x);
        for (const a of x);
        for (let a in x);
        for (const a in x);
        for (let [a, d] of x);
        for (const [a, d] of x);
        for (let [a, d] in x);
        for (const [a, d] in x);
        for (let { c: { b: { a: c } } } = x;;);
        for (;; () => {
          let b = 1;
        });
      };
    `
    );

    thePlugin(
      "should not shadow params in class method top-level for loops",
      `
      class a {
        a(a) {
          for (a = 0;;);
          for (a of x);
          for (x of a);
          for (a in x);
          for (x in a);
          for (;; a++);
          for (;; a = 1);

          for (let b;;);
          for (let b of x);
          for (const b of x);
          for (let b in x);
          for (const b in x);
          for (let [b, c] of x);
          for (const [b, c] of x);
          for (let [b, c] in x);
          for (const [b, c] in x);
          for (let { c: { b: { a } } } = x;;);
          for (;; () => {
            let a = 1;
          });
        }
      }
    `,
      `
      class a {
        a(b) {
          for (b = 0;;);
          for (b of x);
          for (x of b);
          for (b in x);
          for (x in b);
          for (;; b++);
          for (;; b = 1);

          for (let a;;);
          for (let a of x);
          for (const a of x);
          for (let a in x);
          for (const a in x);
          for (let [a, d] of x);
          for (const [a, d] of x);
          for (let [a, d] in x);
          for (const [a, d] in x);
          for (let { c: { b: { a: c } } } = x;;);
          for (;; () => {
            let b = 1;
          });
        }
      }
    `
    );
  });
});
