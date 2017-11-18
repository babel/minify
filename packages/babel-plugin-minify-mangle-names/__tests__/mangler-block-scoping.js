jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("unpad");
const traverse = require("babel-traverse").default;

describe("mangler with block-scoping", () => {
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

    (traverse.clearCache || traverse.cache.clear)();

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

    (traverse.clearCache || traverse.cache.clear)();

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

    (traverse.clearCache || traverse.cache.clear)();

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
});
