jest.autoMockOff();

const traverse = require("babel-traverse").default;
const babel    = require("babel-core");
const unpad    = require("../../../utils/unpad");

function transform(code, options = {}) {
  return babel.transform(code,  {
    sourceType: "script",
    plugins: [
      [require("../src/index"), options],
    ],
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
        var b = 1;
        if (b) {
          console.log(b);
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
        function d(e, a, b) {
          c(e, a, b);
        }

        function c() {}
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
  xit("labels should not shadow bindings", () => {
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
        function a(b, c, d) {
          e(b, c, d);
        }
        function e() {
          var b = who();
          b.bam();
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
            var b = wow();
            b.woo();
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
        function a(b, c) {
          if (1) {
            d(b, c);
          }
        }
        function d() {}
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
        function a(b, c) {
          return function (d, e) {
            b(d, e);
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
          var b;
          if (b) {
            c();
          }
        }
        function c() {}
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
        function a(b) {
          return function () {
            c();
          };
        }
        function c() {}
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
        function d(e, a, b) {
          d(e, a, b);
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
        function a(b, c, d) {
          function e(f, g, h) {
            return function (i) {
              g();
              return function () {
                f();
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
        try {} catch (b) {}
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

  it("should integrate with block scoping plugin", () => {
    const srcTxt = unpad(`
      function f(x) {
        for (let i = 0; i; i++) {
          let n;
          if (n) return;
          g(() => n);
        }
      }
    `);

    const first = babel.transform(srcTxt, {
      plugins: ["transform-es2015-block-scoping"],
    });

    traverse.clearCache();

    const source = babel.transformFromAst(first.ast, null, {
      plugins: [require("../src/index")],
    }).code;

    const expected = unpad(`
      function f(a) {
        var e = function (b) {
          var h = void 0;
          if (h) return {
            v: void 0
          };
          g(() => h);
        };

        for (var b = 0; b; b++) {
          var c = e(b);
          if (typeof c === "object") return c.v;
        }
      }
    `);

    expect(transform(source)).toBe(expected);
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
    });

    traverse.clearCache();

    const source = babel.transformFromAst(first.ast, null, {
      plugins: [require("../src/index")],
    }).code;

    const expected = unpad(`
      (function () {
        function b() {
          if (smth) {
            var a = blah();
            a();
          }
          d();
        }
        function d() {}
        module.exports = { bar: b };
      })();
    `);

    expect(transform(source)).toBe(expected);
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
            var b = true;

            {
              c();
            }
          }
        }

        function c() {}
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

  xit("should correctly mangle multiple presets with passPerPreset", () => {
    const srcTxt = unpad(`
      (function() {
        for (let x in y) y[x];
        f(() => { g() });
      })();
      function g() {}
    `);

    const t = require("babel-core").types;

    const first = babel.transform(srcTxt, {
      code: false,
      passPerPreset: true,
      presets: [
        { plugins: [ "transform-es2015-block-scoping" ] },
        { plugins: [ {
          visitor: {
            Program: {
              exit(programPath) {
                if (this._wrapped) return;
                const wrappedProgram = t.program([t.expressionStatement(
                  t.callExpression(
                    t.identifier("__d"), [
                      t.functionExpression(
                        t.identifier(""),
                        [],
                        t.blockStatement(
                          programPath.node.body,
                          programPath.node.directives
                        )
                      ),
                    ]
                  )
                )]);
                programPath.replaceWith(wrappedProgram);
                this._wrapped = true;
              },
            },
          },
        }] }
      ],
    });

    traverse.clearCache();

    const source = babel.transformFromAst(first.ast, null, {
      plugins: [require("../src/index")],
    }).code;

    const expected = unpad(`
      __d(function a() {
        (function () {
          for (var c in y) {
            y[c];
          }f(() => {
            b();
          });
        })();
        function b() {}
      });
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should NOT mangle functions & classes when keep_fnames is true", () => {
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
    expect(transform(source, {keep_fnames: true})).toBe(expected);
  });
});
