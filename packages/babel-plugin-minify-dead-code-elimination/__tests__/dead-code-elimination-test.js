jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");

function transform(code, options) {
  return babel.transform(code,  {
    plugins: [[require("../src/index"), options]],
  }).code.trim();
}

describe("dce-plugin", () => {
  it("should remove bindings with no references", () => {
    const source = "function foo() {var x = 1;}";
    const expected = "function foo() {}";
    expect(transform(source)).toBe(expected);
  });

  it("should keep bindings in the global namespace ", () => {
    const source = "var x = 1;";
    const expected = "var x = 1;";
    expect(transform(source)).toBe(expected);
  });

  it("should handle impure right-hands", () => {
    const source = "function foo() { var x = f(); }";
    const expected = unpad(`
      function foo() {
        f();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not remove params (preserve fn.length)", () => {
    const source = unpad(`
      _(function bar(p) {
        return 1;
      });
      function foo(w) {
        return 1;
      }
      foo();
      foo();
      var bar = function (a) {
        return a;
      };
      bar();
      bar();
    `);

    const expected = unpad(`
      _(function () {
        return 1;
      });
      function foo() {
        return 1;
      }
      foo();
      foo();
      var bar = function (a) {
        return a;
      };
      bar();
      bar();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should inline binding with one reference", () => {
    const source = unpad(`
      function foo() {
        var x = 1;
        console.log(x);
      }
    `);
    const expected = unpad(`
      function foo() {
        console.log(1);
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  // This isn't considered pure. (it should)
  it("should inline binding with one reference 2", () => {
    const source = unpad(`
      function foo() {
        var y = 1, x = { y: y };
        foo.exports = x;
      }
    `);
    const expected = unpad(`
      function foo() {
        foo.exports = { y: 1 };
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should not inline objects literals in loops", () => {
    const source = unpad(`
      function foo() {
        var x = { y: 1 };
        while (true) foo(x);
        var y = { y: 1 };
        for (;;) foo(y);
        var z = ['foo'];
        while (true) foo(z);
        var bar = function () {};
        while (true) foo(bar);
      }
    `);
    const expected = unpad(`
      function foo() {
        var x = { y: 1 };
        while (true) foo(x);
        var y = { y: 1 };
        for (;;) foo(y);
        var z = ['foo'];
        while (true) foo(z);
        var bar = function () {};
        while (true) foo(bar);
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should not inline object literals in exprs in loops", () => {
    const source = unpad(`
      function a(p) {
        var w = p || [];
        f(function (foo) {
          return w.concat(foo);
        });
      }
    `);

    const expected = unpad(`
      function a(p) {
        var w = p || [];
        f(function (foo) {
          return w.concat(foo);
        });
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should inline objects in if statements", () => {
    const source = unpad(`
      function foo() {
        var x = { y: 1 }, y = ['foo'], z = function () {};
        if (wat) foo(x, y, z);
      }
    `);
    const expected = unpad(`
      function foo() {
        if (wat) foo({ y: 1 }, ['foo'], function () {});
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should not inline objects in functions", () => {
    const source = unpad(`
      function foo() {
        var x = { y: 1 },
            y = ['foo'],
            z = function () {};
        f(function () {
          foo(x, y , z);
        });
      }
    `);
    const expected = unpad(`
      function foo() {
        var x = { y: 1 },
            y = ['foo'],
            z = function () {};
        f(function () {
          foo(x, y, z);
        });
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove side effectless statements", () => {
    const source = unpad(`
      function foo() {
        1;
      }
    `);
    const expected = unpad(`
      function foo() {}
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should work with multiple scopes", () => {
    const source = unpad(`
      function x() {
        var i = 1;
        function y() {
          console.log(i);
        }
        y();
        y();
      }
    `);
    const expected = unpad(`
      function x() {
        function y() {
          console.log(1);
        }
        y();
        y();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should inline function decl", () => {
    const source = unpad(`
      function foo() {
        function x() {
          return 1;
        }
        x();
      }
    `);
    const expected = unpad(`
      function foo() {
        (function () {
          return 1;
        })();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should inline function expressions", () => {
    const source = unpad(`
      function foo() {
        var x = function() {
          return 1;
        };
        x();
      }
    `);
    const expected = unpad(`
      function foo() {
        (function () {
          return 1;
        })();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should not inline in a different scope", () => {
    const source = unpad(`
      function foo() {
        var x = function (a) {
          return a;
        };
        while (1) x(1);
      }
    `);
    const expected = unpad(`
      function foo() {
        var x = function (a) {
          return a;
        };
        while (1) x(1);
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should handle recursion", () => {
    const source = unpad(`
      function baz() {
        var bar = function foo(config) {
          return foo;
        };
        exports.foo = bar;
      }
    `);
    const expected = unpad(`
      function baz() {
        exports.foo = function foo(config) {
          return foo;
        };
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should handle recursion 2", () => {
    const source = unpad(`
      function baz() {
        var foo = function foo(config) {
          return foo;
        };
        exports.foo = foo;
      }
    `);
    const expected = unpad(`
      function baz() {
        exports.foo = function foo(config) {
          return foo;
        };
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });


  it("should handle mutual recursion", () => {
    const source = unpad(`
      function baz() {
        function foo() {
          return bar();
        }
        function bar() {
          return foo();
        }
      }
    `);
    const expected = unpad(`
      function baz() {
        function foo() {
          return bar();
        }
        function bar() {
          return foo();
        }
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should not inline vars with multiple references", () => {
    const source = unpad(`
      function foo() {
        var x = function() {
         if (!y) {
            y = 1;
         }
        };
        x();
        x();
        var y = null;
      }
    `);

    const expected = unpad(`
      function foo() {
        var x = function () {
          if (!y) {
            y = 1;
          }
        };
        x();
        x();
        var y = null;
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove redundant returns" , () => {
    const source = unpad(`
      function foo() {
        if (a) {
          y();
          return;
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        if (a) {
          y();
        }
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove redundant returns part 2" , () => {
    const source = unpad(`
      function foo() {
        y();
        return;
      }
    `);
    const expected = unpad(`
      function foo() {
        y();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove redundant returns (complex)" , () => {
    const source = unpad(`
      function foo() {
        if (a) {
          y();
          if (b) {
            return;
          }
          return;
        }
        return;
      }
    `);
    const expected = unpad(`
      function foo() {
        if (a) {
          y();
          if (b) {}
        }
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should keep needed returns" , () => {
    const source = unpad(`
      function foo() {
        if (a) {
          y();
          return;
        }
        x();
      }
    `);
    const expected = unpad(`
      function foo() {
        if (a) {
          y();
          return;
        }
        x();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove code unreachable after return", () => {
    const source = unpad(`
      function foo() {
        z();
        return;
        x();
      }
    `);
    const expected = unpad(`
      function foo() {
        z();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should be fine with fun decl after return", () => {
    const source = unpad(`
      function foo() {
        z();
        z();
        return 22;
        function z() {
          wow();
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        z();
        z();
        return 22;
        function z() {
          wow();
        }
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should handle returns that were orphaned", () => {
    const source = unpad(`
      var a = true;
      function foo() {
        if (a) return;
        x();
      }
    `);
    const expected = unpad(`
      var a = true;
      function foo() {}
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should handle returns that were orphaned 2", () => {
    const source = unpad(`
      var a = true;
      function foo() {
        if (a) return 1;
        x();
      }
    `);
    const expected = unpad(`
      var a = true;
      function foo() {
        return 1;
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should handle orphaned + redundant returns" , () => {
    const source = unpad(`
      var x = true;
      function foo() {
        if (b) {
          if (x) {
            z();
            return;
          }
          y();
        }
      }
    `);
    const expected = unpad(`
      var x = true;
      function foo() {
        if (b) {
          z();
        }
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove functions only called in themselves", () => {
    const source = unpad(`
      function foo() {
        function baz() {
          function bar() {
            baz();
          }
          bar();
          bar();
        }
      }
    `);
    const expected = "function foo() {}";

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove functions only called in themselves 2", () => {
    const source = unpad(`
      function foo() {
        var baz = function () {
          function bar() {
            baz();
          }
          bar();
          bar();
        };
      }
    `);
    const expected = "function foo() {}";

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove functions only called in themselves 3", () => {
    const source = unpad(`
      function foo() {
        function boo() {}
        function baz() {
          function bar() {
            baz();
          }
          bar();
          bar();
          boo();
        }
      }
    `);
    const expected = "function foo() {}";

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove functions only called in themselves 3", () => {
    const source = unpad(`
      (function () {
        function foo () {
          console.log( 'this function was included!' );
        }

        function bar () {
          console.log( 'this function was not' );
          baz();
        }

        function baz () {
          console.log( 'neither was this' );
        }

        foo();
      })();
    `);
    const expected = unpad(`
      (function () {

        (function () {
          console.log('this function was included!');
        })();
      })();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove dead if statements", () => {
    const source = unpad(`
      if (1) {
        foo();
      }
      if (false) {
        foo();
      } else {
        bar();
      }
    `);
    const expected = unpad(`
      foo();

      bar();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it("should remove empty if statements block", () => {
    const source = unpad(`
      if (a) {
      } else {
        foo();
      }
      if (a) {
        foo();
      } else {

      }
    `);
    const expected = unpad(`
      if (!a) {
        foo();
      }
      if (a) {
        foo();
      }
    `);
    expect(transform(source).trim()).toBe(expected);
  });

  it("should evaluate conditional expressions", () => {
    const source = "true ? a() : b();";
    const expected = "a();";
    expect(transform(source).trim()).toBe(expected);
  });

  it("should evaluate conditional expressions 2", () => {
    const source = "false ? a() : b();";
    const expected = "b();";
    expect(transform(source).trim()).toBe(expected);
  });

  it("should not remove needed expressions", () => {
    const source = unpad(`
      var n = 1;
      if (foo) n;
      console.log(n);
    `);
    const expected = unpad(`
      var n = 1;
      if (foo) ;
      console.log(n);
    `);
    expect(transform(source).trim()).toBe(expected);
  });

  it("should not remove needed expressions", () => {
    const source = unpad(`
      function foo(a) {
        var a = a ? a : a;
      }
    `);
    const expected = unpad(`
      function foo(a) {
        var a = a ? a : a;
      }
    `);
    expect(transform(source).trim()).toBe(expected);
  });

  it("should join the assignment and def", () => {
    const source = unpad(`
      var x;
      x = 1;
    `);

    const expected = unpad(`
      var x = 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not replace the wrong things", () => {
    const source = unpad(`
      function foo() {
        var n = 1;
        wow(n);
        function wat() {
          var n = 2;
          wow(n);
        }
        return wat;
      }
    `);

    const expected = unpad(`
      function foo() {
        wow(1);

        return function () {
          wow(2);
        };
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle case blocks ", () => {
    const source = unpad(`
      function a() {
        switch (foo) {
          case 6:
            return bar;
            break;
        }
      }
    `);

    const expected = unpad(`
      function a() {
        switch (foo) {
          case 6:
            return bar;
            break;
        }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  // TODO: Handle this (blocks that have no semantic meaning).
  xit("should understand extraneous blocks", () => {
    const source = unpad(`
      function a() {
        var f = 25;
        function b() {
          {
            var f = "wow";
          }
          function c() {
            f.bar();
          }
          c();
          c();
        }
        function d() {
          bar(f);
        }
        d();
        d();
        b();
        b();
      }
    `);

    const expected = unpad(`
      function a() {
        function b() {
          {}
          function c() {
            "wow".bar();
          }
          c();
          c();
        }
        function d() {
          bar(25);
        }
        d();
        d();
        b();
        b();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should understand closures", () => {
    const source = unpad(`
      function a() {
        var f = 25;
        function b() {
          var f = "wow";
          function c() {
            f.bar();
          }
          c();
          c();
        }
        function d() {
          bar(f);
        }
        d();
        d();
        b();
        b();
      }
    `);

    const expected = unpad(`
      function a() {
        function b() {
          function c() {
            "wow".bar();
          }
          c();
          c();
        }
        function d() {
          bar(25);
        }
        d();
        d();
        b();
        b();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle vars in if statements", () => {
    const source = unpad(`
      function a() {
        if (x()) {
          var foo = 1;
        }
        bar(foo);
      }
    `);

    const expected = unpad(`
      function a() {
        if (x()) {
          var foo = 1;
        }
        bar(foo);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle vars in if statements 2", () => {
    const source = unpad(`
      function a() {
        if (x()) var foo = 1;
        bar(foo);
      }
    `);

    const expected = unpad(`
      function a() {
        if (x()) var foo = 1;
        bar(foo);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle vars in for statements", () => {
    const source = unpad(`
      function a() {
        for (;;) var foo = 1;
        bar(foo);
      }
    `);

    const expected = unpad(`
      function a() {
        for (;;) var foo = 1;
        bar(foo);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle for statements 2", () => {
    const source = unpad(`
      function a() {
        for (;;) {
          var foo = 1;
          bar(foo);
        }
      }
    `);

    const expected = unpad(`
      function a() {
        for (;;) {
          bar(1);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove binding and assignment", () => {
    const source = unpad(`
      function a() {
        var a, b, c;
        a = 1;
        b = 2;
      }
    `);

    const expected = unpad(`
      function a() {}
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should nore remove binding and assignment if the value is used", () => {
    const source = unpad(`
      function a() {
        var x = 1;
        while (a) wow = x += 1;
      }
    `);

    const expected = unpad(`
      function a() {
        var x = 1;
        while (a) wow = x += 1;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should keep side-effectful assignment values", () => {
    const source = unpad(`
      function a() {
        var x;
        x = wow();
      }
    `);

    const expected = unpad(`
      function a() {
        wow();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not evaluate this binary expression to truthy", () => {
    const source = unpad(`
      function boo() {
        var bar = foo || [];
        if (!bar || baz.length === 0) {
          return 'wow';
        }
      }
    `);

    const expected = unpad(`
      function boo() {
        var bar = foo || [];
        if (!bar || baz.length === 0) {
          return 'wow';
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("eval the following to false", () => {
    const source = unpad(`
      function bar () {
        var x = foo || 'boo';
        bar = x === 'wow' ? ' ' + z : '';
      }
    `);

    const expected = unpad(`
      function bar() {
        var x = foo || 'boo';
        bar = x === 'wow' ? ' ' + z : '';
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should get rid of the constant violations", () => {
    const source = unpad(`
      function bar () {
        var x = foo();
        x = bar();
      }
    `);

    const expected = unpad(`
      function bar() {
        foo();

        bar();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove names from NFE", () => {
    const source = unpad(`
      function bar() {
        return function wow() {
          return boo();
        };
      }
    `);

    const expected = unpad(`
      function bar() {
        return function () {
          return boo();
        };
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not remove names from NFE when referenced", () => {
    const source = unpad(`
      function bar() {
        return function wow() {
          return wow();
        };
      }
    `);

    const expected = unpad(`
      function bar() {
        return function wow() {
          return wow();
        };
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove name from NFE when shadowed", () => {
    const source = unpad(`
      function bar() {
        return function wow() {
          var wow = foo;
          wow();
          return wow;
        };
      }
    `);

    const expected = unpad(`
      function bar() {
        return function () {
          var wow = foo;
          wow();
          return wow;
        };
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  // issue#81
  it("should NOT remove name from NFE when referenced - issue#81", () => {
    const source = unpad(`
      (function (require, module, exports) {
        var Hub = function Hub(file, options) {
          (0, _classCallCheck3.default)(this, Hub);
        };
        module.exports = Hub;
      })(require, module, exports);
    `);
    const expected = unpad(`
      (function (require, module, exports) {
        module.exports = function Hub(file, options) {
          (0, _classCallCheck3.default)(this, Hub);
        };
      })(require, module, exports);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should remove name from NFE when replaced - issue#81", () => {
    const source = unpad(`
      (function () {
        var x = function foo() {};
        module.exports = x;
      })();
    `);
    const expected = unpad(`
      (function () {
        module.exports = function () {};
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should preserve fn/class names when keepFnames is true", () => {
    const source = unpad(`
      (function () {
        function A() {}
        exports.A = A;
        var B = class B {};
        exports.B = B;
        onClick(function C() {});
      })();
    `);
    const expected = unpad(`
      (function () {
        exports.A = function A() {};

        exports.B = class B {};
        onClick(function C() {});
      })();
    `);
    expect(transform(source, { keepFnames: true })).toBe(expected);
  });

  // NCE = Named Class Expressions
  it("should remove name from NCE", () => {
    const source = unpad(`
      var Foo = class Bar {};
    `);
    const expected = unpad(`
      var Foo = class {};
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not remove referenced name from NCE", () => {
    const source = unpad(`
      var Foo = class Bar {
        constructor() {
          console.log(Bar);
        }
      };
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  // issue#78
  it("should not replace NCE with void 0 - issue#78", () => {
    const source = unpad(`
      (function() {
        var B = class A {
          constructor(x) {
            console.log(x);
          }
        }
        self.addEventListener(function (event) {
          new B(event);
        });
      })();
    `);
    const expected = unpad(`
    (function () {
      var B = class {
        constructor(x) {
          console.log(x);
        }
      };
      self.addEventListener(function (event) {
        new B(event);
      });
    })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle var decl with same name as class expr name", () => {
    const source = unpad(`
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
    `);
    const expected = unpad(`
      (function () {
        exports.A = class A {
          constructor() {
            this.class = A;
          }
        };
        exports.B = class {};
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should track purity", () => {
    const source = unpad(`
     function x(a) {
       var l = a;
       var x = l
       foo(x);
     }
    `);

    const expected = unpad(`
      function x(a) {
        foo(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should latch on to exisiting vars", () => {
    const source = unpad(`
     function x(a) {
       if (a) {
         var x = a.wat;
         foo(x);
       }
       var z = a.foo, b = b.bar;
       return z + b;
     }
    `);

    const expected = unpad(`
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
    `);

    expect(transform(source, { optimizeRawSize: true })).toBe(expected);
  });

  it("should put the var in the for in", () => {
    const source = unpad(`
     function x(a) {
       var x;
       wow();
       for (x in a) wow();
     }
    `);

    const expected = unpad(`
     function x(a) {
       wow();
       for (var x in a) wow();
     }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should put the var in the for in only when the var is alone", () => {
    const source = unpad(`
     function x(a) {
       var x, y;
       wow(y);
       for (x in a) wow(y);
     }
    `);

    const expected = unpad(`
     function x(a) {
       var x, y;
       wow(y);
       for (x in a) wow(y);
     }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("inlining should check name collision", () => {
    const source = unpad(`
     function foo() {
       var a = 1;
       var b = a;
       function x(a) {
         return a + b;
       }
       x();
       x();
       return a;
     }
  `);

    const expected = unpad(`
      function foo() {
        var a = 1;
        var b = a;
        function x(a) {
          return a + b;
        }
        x();
        x();
        return a;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("inlining should check name collision for expressions", () => {
    const source = unpad(`
     function foo() {
       var a = c + d;
       function x(c, d) {
         return a;
       }
       x();
       x();
     }
  `);

    const expected = unpad(`
      function foo() {
        var a = c + d;
        function x(c, d) {
          return a;
        }
        x();
        x();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should replace with empty statement if in body position 1", () => {
    const source = unpad(`
      function foo() {
        var a = 0;
        while (wat()) a += 1;
      }
    `);

    const expected = unpad(`
      function foo() {
        while (wat());
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should replace with empty statement if in body position 2", () => {
    const source = unpad(`
      function foo() {
        while (wat()) 1;
      }
    `);

    const expected = unpad(`
      function foo() {
        while (wat());
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should replace with empty statement if in body position 3", () => {
    const source = unpad(`
      function foo() {
        while (wat()) var x;
      }
    `);

    const expected = unpad(`
      function foo() {
        while (wat());
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("it should update binding path", () => {
    const source = unpad(`
      function foo() {
        var key;
        for (key in o);
        for (key in o2);
      }
    `);

    const expected = unpad(`
      function foo() {
        for (var key in o);
        for (key in o2);
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  xit("it should evaluate and remove falsy code", () => {
    const source = unpad(`
      foo(0 && bar());
    `);
    const expected = unpad(`
      foo(0);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not move functions into other scopes", () => {
    const source = unpad(`
      function foo() {
        var a = 1;
        var bar = { x: {z: a, v: a} };
        var wow = { x: 1 };
        var baz = { x: function() {} };
        var boo = { x: { y: function () {} } };

        function moo() {
          var a = 2;
          maa(wow, bar, baz, boo, a, a);
        }

        return moo;
      }
    `);

    const expected = unpad(`
      function foo() {
        var a = 1;
        var bar = { x: { z: a, v: a } };
        var wow = { x: 1 };
        var baz = { x: function () {} };
        var boo = { x: { y: function () {} } };

        return function () {
          var a = 2;
          maa(wow, bar, baz, boo, a, a);
        };
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should preserve vars from the removed block", () => {
    const source = unpad(`
      if (0) {var a = foo()}
      if (0) var b = foo();
      if (1) { } else { var c = foo() }
      if (0) var d = bar(); else { }
    `);
    const expected = unpad(`
      var a;
      var b;
      var c;
      var d;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should optimize alternate when empty consequent is replaced with alternate", () => {
    const source = unpad(`
      if (baz) {
      } else {
        let foo = 'bar';
        function foobar() {}
        console.log('foo' + foo);
      }
    `);
    const expected = unpad(`
      if (!baz) {
        console.log('foo' + 'bar');
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should transform simple switch statement", () => {
    const source = unpad(`
      switch (0) {
        case 0: foo(); break;
        case 1: bar(); break;
      }
    `);
    const expected = unpad(`
      foo();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should NOT optimize when one of the cases is not evaluate-able", () => {
    const source = unpad(`
      switch (a) {
        case 1:
          break;
      }
      switch (100) {
        default:
          foo();
        case a:
          foo();
          break;
      }
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should handle cases where there is no break", () => {
    const source = unpad(`
      switch (1) {
        case 1: foo();
        case 2: bar();
        case 3: baz(); break;
        case 4: foobarbaz();
      }
    `);
    const expected = unpad(`
      foo();
      bar();
      baz();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle defaults", () => {
    const source = unpad(`
      switch (10) {
        default:
          foo();
          break;
        case 1:
          bar();
          break;
        case 2:
          baz();
      }
      switch (5) {
        case 1:
          baz();
          break;
        case 2:
          bar();
          break;
        default:
          foo();
      }
    `);
    const expected = unpad(`
      foo();

      foo();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should predict break statement within blocks", () => {
    const source = unpad(`
      switch (1) {
        case 1:
          foo();
          if (true) break;
        case 2:
          bar();
      }
      switch (1) {
        case 1:
          for(var i in x) { break }
        case 2:
          while(true) { break }
        case 3:
          foo();
      }
    `);

    const expected = unpad(`
      foo();
      var i;

      for (var i in x) {
        break;
      }

      while (true) {
        break;
      }

      foo();
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should bail out when break label is above switch's scope", () => {
    const source = unpad(`
      x: switch (1) {
        case 1:
          break x;
      }
      y: switch (0) {
        case 0:
          while (true) {
            break y;
          }
      }
      z: switch (2) {
        case 2:
          {
            break z;
          }
      }
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should NOT bail out when break label is under switch's scope", () => {
    const source = unpad(`
      switch (1) {
        case 1:
          x: while (true) {
            break x;
          }
      }
    `);
    const expected = unpad(`
      x: while (true) {
        break x;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle nested switch statements", () => {
    const source = unpad(`
      switch (1) {
        case 1:
          foo();
          switch (2) {
            case 2:
              bar();
              break;
          }
          break;
        case 2:
          baz();
      }
    `);
    const expected = unpad(`
      foo();

      bar();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should break correctly when there is a break statement after break", () => {
    const source = unpad(`
      switch (0) {
        case 0:
          foo();
          break;
          bar();
          break;
      }
    `);
    const expected = unpad(`
      foo();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should break correctly for the correct break statement", () => {
    const source = unpad(`
      switch (0) {
        case 0:
          foo();
          {
            if (true) break;
            bar();
            if (a) break;
          }
        case 1:
          baz();
      }
    `);
    const expected = unpad(`
      foo();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should bail out for runtime evaluated if(x) break", () => {
    const source = unpad(`
      switch (0) {
        case 0:
          foo();
          if (a) break;
        case 1:
          bar();
      }
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should NOT bail out for runtime evaluated if(x) break inside loop", () => {
    const source = unpad(`
      switch (0) {
        case 0:
          foo();
          while (1) { if (x) break; }
        case 1:
          bar();
      }
    `);
    const expected = unpad(`
      foo();
      while (1) {
        if (x) break;
      }

      bar();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should optimize While statements", () => {
    const source = unpad(`
      while (false) {
        foo();
      }
      while (true) {
        bar();
      }
      while (x) {
        baz();
      }
    `);
    const expected = unpad(`
      while (true) {
        bar();
      }
      while (x) {
        baz();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should optimize For statements", () => {
    const source = unpad(`
      for (var i = 0; i < 8; i++) {
        foo();
      }
      for (; true;) {
        bar();
      }
      for (; false;) {
        baz();
      }
    `);
    const expected = unpad(`
      for (var i = 0; i < 8; i++) {
        foo();
      }
      for (;;) {
        bar();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should optimize dowhile statements", () => {
    const source = unpad(`
      do {
        foo();
      } while (1);
      do {
        bar()
      } while (0);
      do {
        baz();
      } while (a);
    `);
    const expected = unpad(`
      do {
        foo();
      } while (1);
      {
        bar();
      }
      do {
        baz();
      } while (a);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not evaluate to false and remove conditional", () => {
    const source = unpad(`
      function foo(obj) {
        return obj && typeof obj === 'object' ? x() : obj;
      }
    `);
    const expected = unpad(`
      function foo(obj) {
        return obj && typeof obj === 'object' ? x() : obj;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should extract vars from the removed switch statement", () => {
    const source = unpad(`
      switch (0) {
        case 1:
          var a = 5;
          var b = 6;
      }
      switch (0) {
        default:
          var a = 1;
          var b = 2;
      }
    `);
    const expected = unpad(`
      var a, b;
      var a, b;

      var a = 1;
      var b = 2;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle side-effecty things in cases", () => {
    const source = unpad(`
      let i = 0;
      let bar = () => console.log('foo');
      switch (1) {
        case ++i:
          foo();
          break;
        case bar():
          baz();
      }
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should preserve names in NFEs", () => {
    const source = unpad(`
      function method() {
        var removeListeners = function removeListeners() {
          log(removeListeners);
        };
        removeListeners();
      }
    `);

    const expected = unpad(`
      function method() {
        (function removeListeners() {
          log(removeListeners);
        })();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/130
  it("should not convert expression to expression during replace issue#130", () => {
    const source = unpad(`
      function outer() {
        const inner = (d) => d.x;
        return inner;
      }
    `);
    const expected = unpad(`
      function outer() {
        return d => d.x;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/151
  it("should fix issue#151 - array patterns and object patterns", () => {
    const source = unpad(`
      const me = lyfe => {
        const [swag] = lyfe;
        return swag;
      };
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/151
  it("should fix issue#151 - array patterns and object patterns 2", () => {
    const source = unpad(`
      const me = lyfe => {
        const [swag, yolo] = lyfe;
        return swag && yolo;
      };
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should preserve variabledeclarations(var) after completion statements", () => {
    const source = unpad(`
      function foo() {
        a = 1;
        return a;
        var a;
      }
    `);

    const expected = source;

    expect(transform(source)).toBe(expected);
  });

  it("should NOT preserve variabledeclarations(let) after completion statements", () => {
    const source = unpad(`
      function foo() {
        a = 1;
        b = 2;
        return a + b;
        let a, b;
      }
    `);

    const expected = unpad(`
      function foo() {
        a = 1;
        b = 2;
        return a + b;
      }
    `);

    expect(transform(source)).toBe(expected);
  });
});
