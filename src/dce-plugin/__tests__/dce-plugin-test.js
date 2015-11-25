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
    const expected = '';
    const source = 'var x = 1;';
    expect(transform(source)).toBe(expected);
  });

  it('should handle impure right-hands', () => {
    const expected = 'f();';
    const source = 'var x = f();';
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
    const expected = 'console.log(1);';
    const source = unpad(`
      var x = 1;
      console.log(x);
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove side effectless statements', () => {
    const expected = unpad(`
      function x() {}
      x();
      x();
    `);
    const source = unpad(`
      function x() {
        1;
      }
      x();
      x();
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
      x();
      x();
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
      x();
      x();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should inline function decl', () => {
    const expected = unpad(`
      (function x() {
        return 1;
      })();
    `);
    const source = unpad(`
      function x() {
        return 1;
      }
      x();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should inline function expressions', () => {
    const expected = unpad(`
      (function () {
        return 1;
      })();
    `);
    const source = unpad(`
      var x = function() {
        return 1;
      };
      x();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should not inline in a different scope', () => {
    const expected = unpad(`
      var x = function (a) {
        return a;
      };
      while (1) x(1);
    `);
    const source = unpad(`
      var x = function (a) {
        return a;
      };
      while (1) x(1);
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should handle mutual recursion', () => {
    const expected = unpad(`
      function foo() {
        return bar();
      }
      function bar() {
        return foo();
      }
    `);
    const source = unpad(`
      function foo() {
        return bar();
      }
      function bar() {
        return foo();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should not inline vars with multiple references', () => {
    const expected = unpad(`
      var x = function () {
        if (!y) {
          y = 1;
        }
      };
      x();
      x();
      var y = null;
    `);
    const source = unpad(`
      var x = function() {
        if (!y) {
          y = 1;
        }
      };
      x();
      x();
      var y = null;
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove redundant returns' , () => {
    const source = unpad(`
      function foo() {
        if (1) {
          y();
          return;
        }
      }
      foo();
      foo();
    `);
    const expected = unpad(`
      function foo() {
        if (1) {
          y();
        }
      }
      foo();
      foo();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove redundant returns part 2' , () => {
    const source = unpad(`
      function foo() {
        y();
        return;
      }
      foo();
      foo();
    `);
    const expected = unpad(`
      function foo() {
        y();
      }
      foo();
      foo();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should remove redundant returns (complex)' , () => {
    const source = unpad(`
      function foo() {
        if (1) {
          y();
          if (b) {
            return;
          }
          return;
        }
        return;
      }
      foo();
      foo();
    `);
    const expected = unpad(`
      function foo() {
        if (1) {
          y();
          if (b) {}
        }
      }
      foo();
      foo();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should keep needed returns' , () => {
    const source = unpad(`
      function foo() {
        if (1) {
          y();
          return;
        }
        x();
      }
      foo();
      foo();
    `);
    const expected = unpad(`
      function foo() {
        if (1) {
          y();
          return;
        }
        x();
      }
      foo();
      foo();
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
      foo();
      foo();
    `);
    const expected = unpad(`
      function foo() {
        z();
      }
      foo();
      foo();
    `);

    expect(transform(source).trim()).toBe(expected);
  });
});
