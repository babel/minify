jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
  }).code;
}

describe('mangle-names', () => {
  it('should mangle names', () => {
    const expected = unpad(`
      function foo() {
        var o = 1;
        if (o) {
          console.log(o);
        }
      }
    `);
    const source = unpad(`
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should handle name collisions', () => {
    const expected = unpad(`
      function foo() {
        var o = 2;
        var n = 1;
        if (n) {
          console.log(n + o);
        }
      }
    `);
    const source = unpad(`
      function foo() {
        var x = 2;
        var xxx = 1;
        if (xxx) {
          console.log(xxx + x);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should be fine with shadowing', () => {
    const expected = unpad(`
      var o = 1;
      function foo() {
        var o = 1;
        if (o) {
          console.log(o);
        }
      }
    `);
    const source = unpad(`
      var o = 1;
      function foo() {
        var xxx = 1;
        if (xxx) {
          console.log(xxx);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should not shadow outer references', () => {
    const expected = unpad(`
      function bar() {
        function i(n, c, f) {
          o(n, c, f);
        }

        function o() {}
      }
    `);
    const source = unpad(`
      function bar() {
        function foo(a, b, c) {
          lol(a,b,c);
        }

        function lol() {}
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should mangle args', () => {
    const expected = unpad(`
      function foo(o) {
        if (o) {
          console.log(o);
        }
      }
    `);
    const source = unpad(`
      function foo(xxx) {
        if (xxx) {
          console.log(xxx);
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });
});

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
