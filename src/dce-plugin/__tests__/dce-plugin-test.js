jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
  }).code;
}

function unpad(str) {
  const lines = str.split('\n');
  const m = lines[1] && lines[1].match(/^\s+/);
  if (!m) {
    return str;
  }
  const spaces = m[0].length;
  return lines.map(
    line => line.slice(spaces)
  ).join('\n').trim();
}

describe('dce-plugin', () => {
  it('should remove bindings with no references', () => {
    const source = 'function foo() {var x = 1;}';
    const expected = 'function foo() {}';
    expect(transform(source)).toBe(expected);
  });

  it('should keep bindings in the global namespace ', () => {
    const source = 'var x = 1;';
    const expected = 'var x = 1;';
    expect(transform(source)).toBe(expected);
  });

  it('should handle impure right-hands', () => {
    const source = 'function foo() { var x = f(); }';
    const expected = unpad(`
      function foo() {
        f();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should not remove params (preserve fn.length)', () => {
    const expected = unpad(`
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

    expect(transform(source)).toBe(expected);
  });

  it('should inline binding with one reference', () => {
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

  it('should remove side effectless statements', () => {
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

  it('should work with multiple scopes', () => {
    const expected = unpad(`
      function x() {
        function y() {
          console.log(1);
        }
        y();
        y();
      }
    `);
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

    expect(transform(source).trim()).toBe(expected);
  });

  it('should inline function decl', () => {
    const expected = unpad(`
      function foo() {
        (function x() {
          return 1;
        })();
      }
    `);
    const source = unpad(`
      function foo() {
        function x() {
          return 1;
        }
        x();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should inline function expressions', () => {
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

  it('should not inline in a different scope', () => {
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

  it('should handle recursion', () => {
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

  it('should handle recursion 2', () => {
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


  it('should handle mutual recursion', () => {
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

  it('should not inline vars with multiple references', () => {
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

  it('should remove redundant returns' , () => {
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

  it('should remove redundant returns part 2' , () => {
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

  it('should remove redundant returns (complex)' , () => {
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

  it('should keep needed returns' , () => {
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

  it('should remove code unreachable after return', () => {
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

  it('should handle returns that were orphaned', () => {
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

  it('should handle returns that were orphaned 2', () => {
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

  it('should handle orphaned + redundant returns' , () => {
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

  it('should remove functions only called in themselves', () => {
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
    const expected = 'function foo() {}';

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove functions only called in themselves 2', () => {
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
    const expected = 'function foo() {}';

    expect(transform(source).trim()).toBe(expected);
  });

  // This fails now because it needs multiple passses or something.
  xit('should remove functions only called in themselves 3', () => {
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
    const expected = 'function foo() {}';

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove dead if statements', () => {
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

  it('should remove empty if statements block', () => {
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

  it('should evaluate conditional expressions', () => {
    const source = 'true ? a() : b();';
    const expected = 'a();';
    expect(transform(source).trim()).toBe(expected);
  });

  it('should evaluate conditional expressions 2', () => {
    const source = 'false ? a() : b();';
    const expected = 'b();';
    expect(transform(source).trim()).toBe(expected);
  });
});
