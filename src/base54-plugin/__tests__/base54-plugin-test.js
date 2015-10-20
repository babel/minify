jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
    blacklist: ['strict'],
  }).code;
}

describe('base54', () => {
  it('should mangle names', () => {
    const expected = unpad(`
      function foo() {
        var x = 1;
        if (x) {
          console.log(x);
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
        var x = 1;
        if (x) {
          console.log(x + o);
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
      var x = 1;
      function foo() {
        var x = 1;
        if (x) {
          console.log(x);
        }
      }
    `);
    const source = unpad(`
      var x = 1;
      function foo() {
        var xxx = 1;
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
