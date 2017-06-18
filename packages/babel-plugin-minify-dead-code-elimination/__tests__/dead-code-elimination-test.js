jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");
const deadcode = require("../src/index");
const simplify = require("../../babel-plugin-minify-simplify/src/index");
const thePlugin = require("../../../utils/test-transform")(deadcode);

function transform(code, options, babelOpts) {
  return babel
    .transform(
      code,
      Object.assign(
        {},
        {
          plugins: [[deadcode, options]]
        },
        babelOpts
      )
    )
    .code.trim();
}

function transformWithSimplify(code) {
  return babel.transform(code, {
    plugins: [deadcode, simplify]
  }).code;
}

describe("dce-plugin", () => {
  thePlugin(
    "should remove bindings with no references",
    `
    function foo() {var x = 1;}
  `,
    `
    function foo() {}
  `
  );

  thePlugin(
    "should keep bindings in the global namespace",
    `
    var x = 1;
  `,
    `
    var x = 1;
  `
  );

  thePlugin(
    "should handle impure right-hands",
    `
    function foo() { var x = f(); }
  `,
    `
    function foo() {
      f();
    }
  `
  );

  thePlugin(
    "should remove unused params",
    `
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

    class A {
      foo(p) {
      }
    }
    new A();
  `,
    `
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

    class A {
      foo() {}
    }
    new A();
  `
  );

  thePlugin(
    "should NOT remove params when keepFnArgs is true (preserve fn.length)",
    `
    function foo(p) {
      return 1;
    }
    function bar(q) {
      return q + 1;
    }
    class A {
      foo(p) {
        return p;
      }
      bar(q) {
        return 1;
      }
    }
    foo();
    bar();
    new A();
  `,
    {
      plugins: [[deadcode, { keepFnArgs: true }]]
    }
  );

  thePlugin(
    "should handle all cases of parameter list - and remove unused ones",
    `
    function a(foo, bar, baz) {
      return foo;
    }
    function b(foo, bar, baz) {
      return baz;
    }
    function c(foo, {bar}, baz) {
      return bar;
    }
    function d({foo}, {bar}, baz) {
      return foo;
    }
    function e({foo}, bar = sideEffect(), baz) {
      return foo;
    }
    function e({foo}, bar = {}, baz) {
      return foo;
    }
  `,
    `
    function a(foo) {
      return foo;
    }
    function b(foo, bar, baz) {
      return baz;
    }
    function c(foo, { bar }) {
      return bar;
    }
    function d({ foo }, { bar }) {
      return foo;
    }
    function e({ foo }, bar = sideEffect()) {
      return foo;
    }
    function e({ foo }, bar = {}) {
      return foo;
    }
  `
  );

  thePlugin(
    "should inline binding with one reference",
    `
    function foo() {
      var x = 1;
      console.log(x);
    }
  `,
    `
    function foo() {
      console.log(1);
    }
  `
  );

  // This isn't considered pure. (it should)
  thePlugin(
    "should inline binding with one reference 2",
    `
    function foo() {
      var y = 1, x = { y: y };
      foo.exports = x;
    }
  `,
    `
    function foo() {
      foo.exports = { y: 1 };
    }
  `
  );

  thePlugin(
    "should not inline objects literals in loops",
    `
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
  `
  );

  thePlugin(
    "should not inline object literals in exprs in loops",
    `
    function a(p) {
      var w = p || [];
      f(function (foo) {
        return w.concat(foo);
      });
    }
  `
  );

  thePlugin(
    "should inline objects in if statements",
    `
    function foo() {
      var x = { y: 1 }, y = ['foo'], z = function () {};
      if (wat) foo(x, y, z);
    }
  `,
    `
    function foo() {
      if (wat) foo({ y: 1 }, ['foo'], function () {});
    }
  `
  );

  thePlugin(
    "should not inline objects in functions",
    `
    function foo() {
      var x = { y: 1 },
          y = ['foo'],
          z = function () {};
      f(function () {
        foo(x, y, z);
      });
    }
  `
  );

  thePlugin(
    "should remove side effectless statements",
    `
    function foo() {
      1;
    }
  `,
    `
    function foo() {}
  `
  );

  thePlugin(
    "should work with multiple scopes",
    `
    function x() {
      var i = 1;
      function y() {
        console.log(i);
      }
      y();
      y();
    }
  `,
    `
    function x() {
      function y() {
        console.log(1);
      }
      y();
      y();
    }
  `
  );

  thePlugin("should inline function decl", `
    function foo() {
      function x() {
        return 1;
      }
      x();
    }
  `,
    `
    function foo() {
      (function () {
        return 1;
      })();
    }
  `
  );

  thePlugin(
    "should inline function expressions",
    `
    function foo() {
      var x = function() {
        return 1;
      };
      x();
    }
  `,
    `
    function foo() {
      (function () {
        return 1;
      })();
    }
  `
  );

  thePlugin(
    "should not inline in a different scope",
    `
    function foo() {
      var x = function (a) {
        return a;
      };
      while (1) x(1);
    }
  `
  );

  thePlugin(
    "should handle recursion",
    `
    function baz() {
      var bar = function foo(config) {
        return foo;
      };
      exports.foo = bar;
    }
  `,
    `
    function baz() {
      exports.foo = function foo() {
        return foo;
      };
    }
  `
  );

  thePlugin(
    "should handle recursion 2",
    `
    function baz() {
      var foo = function foo(config) {
        return foo;
      };
      exports.foo = foo;
    }
  `,
    `
    function baz() {
      exports.foo = function foo() {
        return foo;
      };
    }
  `
  );

  thePlugin(
    "should handle mutual recursion",
    `
    function baz() {
      function foo() {
        return bar();
      }
      function bar() {
        return foo();
      }
    }
  `
  );

  thePlugin(
    "should not inline vars with multiple references",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should remove redundant returns",
    `
    function foo() {
      if (a) {
        y();
        return;
      }
    }
  `,
    `
    function foo() {
      if (a) {
        y();
      }
    }
  `
  );

  thePlugin(
    "should remove redundant returns part 2",
    `
    function foo() {
      y();
      return;
    }
  `,
    `
    function foo() {
      y();
    }
  `
  );

  thePlugin(
    "should remove redundant returns (complex)",
    `
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
  `,
    `
    function foo() {
      if (a) {
        y();
        if (b) {}
      }
    }
  `
  );

  thePlugin(
    "should keep needed returns",
    `
    function foo() {
      if (a) {
        y();
        return;
      }
      x();
    }
  `,
    `
    function foo() {
      if (a) {
        y();
        return;
      }
      x();
    }
  `
  );

  thePlugin(
    "should remove code unreachable after return",
    `
    function foo() {
      z();
      return;
      x();
    }
  `,
    `
    function foo() {
      z();
    }
  `
  );

  thePlugin(
    "should be fine with fun decl after return",
    `
    function foo() {
      z();
      z();
      return 22;
      function z() {
        wow();
      }
    }
  `,
    `
    function foo() {
      z();
      z();
      return 22;
      function z() {
        wow();
      }
    }
  `
  );

  thePlugin(
    "should handle returns that were orphaned",
    `
    var a = true;
    function foo() {
      if (a) return;
      x();
    }
  `,
    `
    var a = true;
    function foo() {}
  `
  );

  thePlugin(
    "should handle returns that were orphaned 2",
    `
    var a = true;
    function foo() {
      if (a) return 1;
      x();
    }
  `,
    `
    var a = true;
    function foo() {
      return 1;
    }
  `
  );

  thePlugin(
    "should handle orphaned + redundant returns",
    `
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
  `,
    `
    var x = true;
    function foo() {
      if (b) {
        z();
      }
    }
  `
  );

  thePlugin(
    "should remove functions only called in themselves",
    `
    function foo() {
      function baz() {
        function bar() {
          baz();
        }
        bar();
        bar();
      }
    }
  `,
    `
    function foo() {}
  `
  );

  thePlugin(
    "should remove functions only called in themselves 2",
    `
    function foo() {
      var baz = function () {
        function bar() {
          baz();
        }
        bar();
        bar();
      };
    }
  `,
    `
    function foo() {}
  `
  );

  thePlugin(
    "should remove functions only called in themselves 3",
    `
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
  `,
    `
    function foo() {}
  `
  );

  thePlugin(
    "should remove functions only called in themselves 3",
    `
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
  `,
    `
    (function () {

      (function () {
        console.log('this function was included!');
      })();
    })();
  `
  );

  thePlugin(
    "should remove dead if statements",
    `
    if (1) {
      foo();
    }
    if (false) {
      foo();
    } else {
      bar();
    }
  `,
    `
    foo();

    bar();
  `
  );

  thePlugin(
    "should remove empty if statements block",
    `
    if (a) {
    } else {
      foo();
    }
    if (a) {
      foo();
    } else {

    }
  `,
    `
    if (!a) {
      foo();
    }
    if (a) {
      foo();
    }
  `
  );

  thePlugin(
    "should evaluate conditional expressions",
    `
    true ? a() : b();
  `,
    `
    a();
  `
  );

  thePlugin(
    "should evaluate conditional expressions 2",
    `
    false ? a() : b();
  `,
    `
    b();
  `
  );

  thePlugin(
    "should evaluate conditional expressions 3",
    `
    'foo' ? a() : b();
  `,
    `
    a();
  `
  );

  thePlugin(
    "should evaluate conditional expressions 4",
    `
    null ? a() : b();
  `,
    `
    b();
  `
  );

  thePlugin(
    "should evaluate conditional expressions 5",
    `
    'foo' === 'foo' ? a() : b();
  `,
    `
    a();
  `
  );

  thePlugin(
    "should evaluate conditional expressions 6",
    `
    'foo' !== 'bar' ? a() : b();
  `,
    `
    a();
  `
  );

  thePlugin(
    "should not remove needed expressions",
    `
    var n = 1;
    if (foo) n;
    console.log(n);
  `,
    `
    var n = 1;
    if (foo) ;
    console.log(n);
  `
  );

  thePlugin(
    "should not remove needed expressions",
    `
    function foo(a) {
      var a = a ? a : a;
    }
  `,
    `
    function foo(a) {
      var a = a ? a : a;
    }
  `
  );

  thePlugin(
    "should join the assignment and def",
    `
    var x;
    x = 1;
  `,
    `
    var x = 1;
  `
  );

  thePlugin(
    "should not replace the wrong things",
    `
    function foo() {
      var n = 1;
      wow(n);
      function wat() {
        var n = 2;
        wow(n);
      }
      return wat;
    }
  `,
    `
    function foo() {
      wow(1);

      return function () {
        wow(2);
      };
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

  // TODO: Handle this (blocks that have no semantic meaning).
  thePlugin.skip(
    "should understand extraneous blocks",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should understand closures",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should handle vars in if statements",
    `
    function a() {
      if (x()) {
        var foo = 1;
      }
      bar(foo);
    }
  `,
    `
    function a() {
      if (x()) {
        var foo = 1;
      }
      bar(foo);
    }
  `
  );

  thePlugin(
    "should handle vars in if statements 2",
    `
    function a() {
      if (x()) var foo = 1;
      bar(foo);
    }
  `,
    `
    function a() {
      if (x()) var foo = 1;
      bar(foo);
    }
  `
  );

  thePlugin(
    "should handle vars in for statements",
    `
    function a() {
      for (;;) var foo = 1;
      bar(foo);
    }
  `,
    `
    function a() {
      for (;;) var foo = 1;
      bar(foo);
    }
  `
  );

  thePlugin(
    "should handle for statements 2",
    `
    function a() {
      for (;;) {
        var foo = 1;
        bar(foo);
      }
    }
  `,
    `
    function a() {
      for (;;) {
        bar(1);
      }
    }
  `
  );

  thePlugin(
    "should remove binding and assignment",
    `
    function a() {
      var a, b, c;
      a = 1;
      b = 2;
    }
  `,
    `
    function a() {}
  `
  );

  thePlugin(
    "should nore remove binding and assignment if the value is used",
    `
    function a() {
      var x = 1;
      while (a) wow = x += 1;
    }
  `,
    `
    function a() {
      var x = 1;
      while (a) wow = x += 1;
    }
  `
  );

  thePlugin(
    "should keep side-effectful assignment values",
    `
    function a() {
      var x;
      x = wow();
    }
  `,
    `
    function a() {
      wow();
    }
  `
  );

  thePlugin(
    "should not evaluate this binary expression to truthy",
    `
    function boo() {
      var bar = foo || [];
      if (!bar || baz.length === 0) {
        return 'wow';
      }
    }
  `,
    `
    function boo() {
      var bar = foo || [];
      if (!bar || baz.length === 0) {
        return 'wow';
      }
    }
  `
  );

  thePlugin(
    "eval the following to false",
    `
    function bar () {
      var x = foo || 'boo';
      bar = x === 'wow' ? ' ' + z : '';
    }
  `,
    `
    function bar() {
      var x = foo || 'boo';
      bar = x === 'wow' ? ' ' + z : '';
    }
  `
  );

  thePlugin(
    "should get rid of the constant violations",
    `
    function bar () {
      var x = foo();
      x = bar();
    }
  `,
    `
    function bar() {
      foo();

      bar();
    }
  `
  );

  thePlugin(
    "should remove names from NFE",
    `
    function bar() {
      return function wow() {
        return boo();
      };
    }
  `,
    `
    function bar() {
      return function () {
        return boo();
      };
    }
  `
  );

  thePlugin(
    "should not remove names from NFE when referenced",
    `
    function bar() {
      return function wow() {
        return wow();
      };
    }
  `,
    `
    function bar() {
      return function wow() {
        return wow();
      };
    }
  `
  );

  thePlugin(
    "should remove name from NFE when shadowed",
    `
    function bar() {
      return function wow() {
        var wow = foo;
        wow();
        return wow;
      };
    }
  `,
    `
    function bar() {
      return function () {
        var wow = foo;
        wow();
        return wow;
      };
    }
  `
  );

  // issue#81
  thePlugin(
    "should NOT remove name from NFE when referenced - issue#81",
    `
    (function (require, module, exports) {
      var Hub = function Hub(file, options) {
        (0, _classCallCheck3.default)(this, Hub);
      };
      module.exports = Hub;
    })(require, module, exports);
  `,
    `
    (function (require, module) {
      module.exports = function Hub() {
        (0, _classCallCheck3.default)(this, Hub);
      };
    })(require, module, exports);
  `
  );

  thePlugin(
    "should remove name from NFE when replaced - issue#81",
    `
    (function () {
      var x = function foo() {};
      module.exports = x;
    })();
  `,
    `
    (function () {
      module.exports = function () {};
    })();
  `
  );

  thePlugin(
    "should preserve fn names when keepFnName is true",
    `
    (function () {
      function A() {}
      exports.A = A;
      var B = function B() {};
      exports.B = B;
      onClick(function C() {});
    })();
  `,
    `
    (function () {
      exports.A = function A() {};

      exports.B = function B() {};
      onClick(function C() {});
    })();
  `,
    {
      plugins: [[deadcode, { keepFnName: true }]]
    }
  );

  thePlugin(
    "should preserve class names when keepClassName is true",
    `
    (function () {
      class A {}
      exports.A = A;
      var B = class B {};
      exports.B = B;
      class AA {} new AA()
    })();
  `,
    `
    (function () {
      exports.A = class A {};

      exports.B = class B {};
      new class AA {}();
    })();
  `,
    {
      plugins: [[deadcode, { keepClassName: true }]]
    }
  );

  // NCE = Named Class Expressions
  thePlugin(
    "should remove name from NCE",
    `
    var Foo = class Bar {};
  `,
    `
    var Foo = class {};
  `
  );

  thePlugin(
    "should not remove referenced name from NCE",
    `
    var Foo = class Bar {
      constructor() {
        console.log(Bar);
      }
    };
  `
  );

  // issue#78
  thePlugin(
    "should not replace NCE with void 0 - issue#78",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should handle var decl with same name as class expr name",
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
    "should track purity",
    `
   function x(a) {
     var l = a;
     var x = l
     foo(x);
   }
  `,
    `
    function x(a) {
      foo(a);
    }
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

  thePlugin(
    "should put the var in the for in",
    `
   function x(a) {
     var x;
     wow();
     for (x in a) wow();
   }
  `,
    `
   function x(a) {
     wow();
     for (var x in a) wow();
   }
  `
  );

  thePlugin(
    "should put the var in the for in only when the var is alone",
    `
   function x(a) {
     var x, y;
     wow(y);
     for (x in a) wow(y);
   }
  `,
    `
   function x(a) {
     var x, y;
     wow(y);
     for (x in a) wow(y);
   }
  `
  );

  thePlugin(
    "inlining should check name collision",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "inlining should check name collision for expressions",
    `
    function foo() {
      var a = c + d;
      function x(c, d) {
        return a + c + d;
      }
      x();
      x();
    }
  `,
    `
    function foo() {
      var a = c + d;
      function x(c, d) {
        return a + c + d;
      }
      x();
      x();
    }
  `
  );

  thePlugin(
    "should replace with empty statement if in body position 1",
    `
    function foo() {
      var a = 0;
      while (wat()) a += 1;
    }
  `,
    `
    function foo() {
      while (wat());
    }
  `
  );

  thePlugin(
    "should replace with empty statement if in body position 2",
    `
    function foo() {
      while (wat()) 1;
    }
  `,
    `
    function foo() {
      while (wat());
    }
  `
  );

  thePlugin(
    "should replace with empty statement if in body position 3",
    `
    function foo() {
      while (wat()) var x;
    }
  `,
    `
    function foo() {
      while (wat());
    }
  `
  );

  thePlugin(
    "it should update binding path",
    `
    function foo() {
      var key;
      for (key in o);
      for (key in o2);
    }
  `,
    `
    function foo() {
      for (var key in o);
      for (key in o2);
    }
  `
  );

  thePlugin.skip(
    "it should evaluate and remove falsy code",
    `
    foo(0 && bar());
  `,
    `
    foo(0);
  `
  );

  thePlugin(
    "should not move functions into other scopes",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should preserve vars from the removed block",
    `
    if (0) {var a = foo()}
    if (0) var b = foo();
    if (1) { } else { var c = foo() }
    if (0) var d = bar(); else { }
  `,
    `
    var a;
    var b;
    var c;
    var d;
  `
  );

  thePlugin(
    "should optimize alternate when empty consequent is replaced with alternate",
    `
    if (baz) {
    } else {
      let foo = 'bar';
      function foobar() {}
      console.log('foo' + foo);
    }
  `,
    `
    if (!baz) {
      console.log('foo' + 'bar');
    }
  `
  );

  thePlugin(
    "should transform simple switch statement",
    `
    switch (0) {
      case 0: foo(); break;
      case 1: bar(); break;
    }
  `,
    `
    foo();
  `
  );

  thePlugin(
    "should NOT optimize when one of the cases is not evaluate-able",
    `
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
  `
  );

  thePlugin(
    "should handle cases where there is no break",
    `
    switch (1) {
      case 1: foo();
      case 2: bar();
      case 3: baz(); break;
      case 4: foobarbaz();
    }
  `,
    `
    foo();
    bar();
    baz();
  `
  );

  thePlugin(
    "should handle defaults",
    `
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
  `,
    `
    foo();

    foo();
  `
  );

  thePlugin(
    "should predict break statement within blocks",
    `
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
  `,
    `
    foo();
    var i;

    for (var i in x) {
      break;
    }

    while (true) {
      break;
    }

    foo();
  `
  );

  thePlugin(
    "should bail out when break label is above switch's scope",
    `
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
  `
  );

  thePlugin(
    "should NOT bail out when break label is under switch's scope",
    `
    switch (1) {
      case 1:
        x: while (true) {
          break x;
        }
    }
  `,
    `
    x: while (true) {
      break x;
    }
  `
  );

  thePlugin(
    "should handle nested switch statements",
    `
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
  `,
    `
    foo();

    bar();
  `
  );

  thePlugin(
    "should break correctly when there is a break statement after break",
    `
    switch (0) {
      case 0:
        foo();
        break;
        bar();
        break;
    }
  `,
    `
    foo();
  `
  );

  thePlugin(
    "should break correctly for the correct break statement",
    `
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
  `,
    `
    foo();
  `
  );

  thePlugin(
    "should bail out for runtime evaluated if(x) break",
    `
    switch (0) {
      case 0:
        foo();
        if (a) break;
      case 1:
        bar();
    }
  `
  );

  thePlugin(
    "should NOT bail out for runtime evaluated if(x) break inside loop",
    `
    switch (0) {
      case 0:
        foo();
        while (1) { if (x) break; }
      case 1:
        bar();
    }
  `,
    `
    foo();
    while (1) {
      if (x) break;
    }

    bar();
  `
  );

  thePlugin(
    "should optimize While statements",
    `
    while (false) {
      foo();
    }
    while (true) {
      bar();
    }
    while (x) {
      baz();
    }
  `,
    `
    while (true) {
      bar();
    }
    while (x) {
      baz();
    }
  `
  );

  thePlugin(
    "should optimize For statements",
    `
    for (var i = 0; i < 8; i++) {
      foo();
    }
    for (; true;) {
      bar();
    }
    for (; false;) {
      baz();
    }
  `,
    `
    for (var i = 0; i < 8; i++) {
      foo();
    }
    for (;;) {
      bar();
    }
  `
  );

  thePlugin(
    "should optimize dowhile statements",
    `
    do {
      foo();
    } while (1);
    do {
      bar()
    } while (0);
    do {
      baz();
    } while (a);
  `,
    `
    do {
      foo();
    } while (1);
    {
      bar();
    }
    do {
      baz();
    } while (a);
  `
  );

  thePlugin(
    "should not evaluate to false and remove conditional",
    `
    function foo(obj) {
      return obj && typeof obj === 'object' ? x() : obj;
    }
  `,
    `
    function foo(obj) {
      return obj && typeof obj === 'object' ? x() : obj;
    }
  `
  );

  thePlugin(
    "should extract vars from the removed switch statement",
    `
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
  `,
    `
    var a, b;
    var a, b;

    var a = 1;
    var b = 2;
  `
  );

  thePlugin(
    "should handle side-effecty things in cases",
    `
    let i = 0;
    let bar = () => console.log('foo');
    switch (1) {
      case ++i:
        foo();
        break;
      case bar():
        baz();
    }
  `
  );

  thePlugin(
    "should preserve names in NFEs",
    `
    function method() {
      var removeListeners = function removeListeners() {
        log(removeListeners);
      };
      removeListeners();
    }
  `,
    `
    function method() {
      (function removeListeners() {
        log(removeListeners);
      })();
    }
  `
  );

  // https://github.com/babel/babili/issues/130
  thePlugin(
    "should not convert expression to expression during replace issue#130",
    `
    function outer() {
      const inner = (d) => d.x;
      return inner;
    }
  `,
    `
    function outer() {
      return d => d.x;
    }
  `
  );

  // https://github.com/babel/babili/issues/151
  thePlugin(
    "should fix issue#151 - array patterns and object patterns",
    `
    const me = lyfe => {
      const [swag] = lyfe;
      return swag;
    };
  `
  );

  // https://github.com/babel/babili/issues/151
  thePlugin(
    "should fix issue#151 - array patterns and object patterns 2",
    `
    const me = lyfe => {
      const [swag, yolo] = lyfe;
      return swag && yolo;
    };
  `
  );

  // https://github.com/babel/babili/issues/232
  thePlugin(
    "should fix issue#232 - array patterns and object patterns with non constant init",
    `
    const a = {
      lol: input => {
        const [hello, world] = input.split('|');
        if (hello === 't' || hello === 'top') {
          return 'top';
        }
        return 'bottom';
      }
    };
  `
  );

  // https://github.com/babel/babili/issues/232
  thePlugin(
    "should fix issue#232 - array & object patterns with non-constant init",
    `
    function foo() {
      const { bar1, bar2 } = baz();
      return bar1;
    }
  `
  );

  thePlugin(
    "should preserve variabledeclarations(var) after completion statements",
    `
    function foo() {
      a = 1;
      return a;
      var a;
    }
  `
  );

  thePlugin(
    "should NOT preserve variabledeclarations(let) after completion statements",
    `
    function foo() {
      a = 1;
      b = 2;
      return a + b;
      let a, b;
    }
  `,
    `
    function foo() {
      a = 1;
      b = 2;
      return a + b;
    }
  `
  );

  thePlugin(
    "should not remove var from for..in/for..of statements",
    `
    function foo() {
      for (var i in x) console.log("foo");
      for (var j of y) console.log("foo");
    }
  `
  );

  thePlugin(
    "should not remove var from for..await statements",
    `
    async function foo() {
      for await (var x of y) console.log("bar");
    }
  `,
    {
      parserOpts: {
        plugins: ["asyncGenerators"]
      }
    }
  );

  thePlugin(
    "should remove empty statements when children of block",
    `
    (function () {
      function foo() {};
      function bar() {};
      function baz() {};
      function ban() {};
      function quux() {};
      function cake() {};
    })();
  `,
    `
    (function () {})();
  `
  );

  thePlugin(
    "should NOT remove fn params for setters",
    `
    function foo() {
      var x = {
        set a(b) {}
      };
      class A {
        set c(d) {
          x.a = 5;
        }
      }
      return new A();
    }
  `
  );

  // https://github.com/babel/babili/issues/265
  thePlugin(
    "should not remove return void 0; statement if inside a loop",
    `
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
  `
  );

  // https://github.com/babel/babili/issues/265
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

  thePlugin(
    "should not remove params from functions containing direct eval",
    `
    function a(b, c, d) {
      eval(";");
      return b;
    }
    function b(c, d, e) {
      (1, eval)(";");
      return c;
    }
  `,
    `
    function a(b, c, d) {
      eval(";");
      return b;
    }
    function b(c) {
      (1, eval)(";");
      return c;
    }
  `
  );

  thePlugin(
    "should not remove params/vars from functions containing direct eval",
    `
    function foo(bar, baz) {
      function foox(a, b, c) {
        x.then((data, unused) => {
          let unused1;
          eval(data);
          foox1();
          {
            var unused2;
          }
        });

        function foox1(unused) {
          console.log("foox1");
        }
      }
      function fooy(unused1, unused2) {
        console.log("fooy");
      }
    }
  `,
    `
    function foo(bar, baz) {
      function foox(a, b, c) {
        x.then((data, unused) => {
          let unused1;
          eval(data);
          foox1();
          {
            var unused2;
          }
        });

        function foox1() {
          console.log("foox1");
        }
      }
      function fooy() {
        console.log("fooy");
      }
    }
  `
  );

  thePlugin(
    "should not optimize/remove vars from functions containing direct eval",
    `
    function foo() {
      bar();

      var x = 5;
      return x;

      function bar() {
        eval(";");
        return 5;
      }

      function baz() {
        let x = 10;
        return x;
      }
    }
  `,
    `
    function foo() {
      bar();

      var x = 5;
      return x;

      function bar() {
        eval(";");
        return 5;
      }

      function baz() {
        return 10;
      }
    }
  `
  );

  thePlugin(
    "should impure expressions in confidently evaluated if statements",
    `
    if (a.b(), true) {
      foo();
    }
  `,
    `
    a.b();

    foo();
  `
  );

  thePlugin(
    "should extract all necessary things from if statements",
    `
    if (a.b(), false) {
      var foo = foo1;
      foo();
    } else if (b.c(), true) {
      var bar = bar1;
      bar();
    } else {
      var baz = baz1;
      baz();
    }
  `,
    `
    a.b();
    b.c();

    var bar = bar1;
    bar();
    var baz;
    var foo;
  `
  );

  thePlugin(
    "should not remove vars after return statement",
    `
    function f() {
      return x;
      var x = 1;
    }
  `,
    `
    function f() {
      return void 0;
    }
  `
  );

  thePlugin(
    "should not remove vars after return statement #2",
    `
    var x = 0;
    function f1(){
      function f2(){
        return x;
      };
      return f2();
      var x = 1;
    }
  `,
    `
    var x = 0;
    function f1() {
      return function () {
        return x;
      }();
      var x = 1;
    }
  `
  );

  thePlugin(
    "should not remove vars after return statement #3",
    `
    function foo() {
      bar = x;
      var x = 1;
    }
  `,
    `
    function foo() {
      bar = void 0;
    }
  `
  );

  thePlugin(
    "should deopt for impure tests",
    `
    function foo() {
      do {
        bar();
      } while ((bar(), false));
      for (; bar(), false;) {
        bar();
      }
      while (bar(), false) {
        bar();
      }
    }
  `
  );

  thePlugin(
    "should handle confident do..while with break statements",
    `
    function foo() {
      do {
        if (x) break;
      } while (false);

      do break; while (false);

      bar0: do break; while (false);

      bar1: do break bar1; while (false);

      bar2: do {
        if (y) break;
      } while (false);

      bar3: do {
        if (y) break bar3;
      } while (false);

      bar4: do {
        while (baz()) {
          if (x) break;
        }
      } while (false);

      bar5: do {
        while (baz()) {
          if (x) break bar5;
        }
      } while (false);
    }
  `,
    `
    function foo() {
      do {
        if (x) break;
      } while (false);

      bar1: do break bar1; while (false);

      bar2: do {
        if (y) break;
      } while (false);

      bar3: do {
        if (y) break bar3;
      } while (false);

      bar4: {
        while (baz()) {
          if (x) break;
        }
      }

      bar5: do {
        while (baz()) {
          if (x) break bar5;
        }
      } while (false);
    }
  `
  );

  thePlugin(
    "should handle confident do..while with continue statements",
    `
    function foo() {
      do {
        if (x) continue;
      } while (false);

      do continue; while (false);

      bar0: do continue; while (false);

      bar1: do continue bar1; while (false);

      bar2: do {
        if (y) continue;
      } while (false);

      bar3: do {
        if (y) continue bar3;
      } while (false);

      bar4: do {
        while (baz()) {
          if (x) continue;
        }
      } while (false);

      bar5: do {
        while (baz()) {
          if (x) continue bar5;
        }
      } while (false);
    }
  `,
    `
    function foo() {
      do {
        if (x) continue;
      } while (false);

      do continue; while (false);

      bar0: do continue; while (false);

      bar1: do continue bar1; while (false);

      bar2: do {
        if (y) continue;
      } while (false);

      bar3: do {
        if (y) continue bar3;
      } while (false);

      bar4: {
        while (baz()) {
          if (x) continue;
        }
      }

      bar5: do {
        while (baz()) {
          if (x) continue bar5;
        }
      } while (false);
    }
  `
  );

  thePlugin(
    "should remove unnecessary use strict directives",
    `
    function foo() {
      "use strict";
      function bar() {
        "use strict";
        bar();
      }
      bar.call();
    }
  `,
    `
    function foo() {
      "use strict";

      function bar() {
        bar();
      }
      bar.call();
    }
  `
  );
});
