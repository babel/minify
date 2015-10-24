jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
    blacklist: ['strict'],
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

describe('simplify-plugin', () => {
  it('should turn undefined into void 0', () => {
    const expected = 'void 0;';
    const source = 'undefined;';
    expect(transform(source)).toBe(expected);
  });

  it('should strip unnecessary property literal qoutes', () => {
    const source = `var x = { 'foo': 'bar' };`;
    const expected = `var x = { foo: 'bar' };`;
    expect(transform(source)).toBe(expected);
  });

  it('should turn subscript into dot', () => {
    const source = `foo['bar'];`;
    const expected = `foo.bar;`;
    expect(transform(source)).toBe(expected);
  });

  it('should turn Number(x) to +x', () => {
    const source = `Number(x);`;
    const expected = `+x;`;
    expect(transform(source)).toBe(expected);
  });

  it(`should turn String(x) to x + ''`, () => {
    const source = `String(x);`;
    const expected = `x + "";`;
    expect(transform(source)).toBe(expected);
  });

  it(`!foo && bar -> foo || bar`, () => {
    const source = `!foo && bar;`;
    const expected = `foo || bar;`;
    expect(transform(source)).toBe(expected);
  });

  it('should shorten bool', () => {
    const source = `true; false;`;
    const expected = `!0;!1;`;
    expect(transform(source)).toBe(expected);
  });

  it('should put values first in binary expressions', () => {
    const source = `a === 1;`;
    const expected = `1 === a;`;
    expect(transform(source)).toBe(expected);
  });

  it('should simplify comparison', () => {
    const source = `'function' === typeof a;`;
    const expected = `'function' == typeof a;`;
    expect(transform(source)).toBe(expected);
  });

  it('should flip conditionals', () => {
    const source = `!foo ? 'foo' : 'bar';`;
    const expected = `foo ? 'bar' : 'foo';`;
    expect(transform(source)).toBe(expected);
  });

  it('concat vars in for loops', () => {
    const source = unpad(`
      var i = 0;
      for (var x = 0; x < 10; x++) console.log(i + x);
    `);
    const expected = 'for (var i = 0, x = 0; x < 10; x++) console.log(i + x);';

    expect(transform(source).trim()).toBe(expected);
  });

  it('concat vars', () => {
    const source = unpad(`
      var i = 0;
      var x = 0;
      var y = 0;
    `);
    const expected = unpad(`
      var i = 0,
          x = 0,
          y = 0;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should turn for loop block to a single statement', () => {
    const source = unpad(`
      for (var x = 0; x < 10; x++) {
        console.log(x);
      }
    `);
    const expected = 'for (var x = 0; x < 10; x++) console.log(x);';

    expect(transform(source).trim()).toBe(expected);
  });

  it('should turn block statements to sequence expr', () => {
    const source = unpad(`
      for (var x = 0; x < 10; x++) {
        console.log(x);
        console.log(x);
      }
    `);
    const expected =
      'for (var x = 0; x < 10; x++) console.log(x), console.log(x);';

    expect(transform(source).trim()).toBe(expected);
  });

  it('should turn if to gaurded expression', () => {
    const source = unpad(`
      function foo() {
        if (x) a();
      }
    `);
    const expected = unpad(`
      function foo() {
        x && a();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should turn if statement to conditional', () => {
    const source = unpad(`
      function foo() {
        if (x) a();
        else b();
      }
    `);
    const expected = unpad(`
      function foo() {
        x ? a() : b();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should turn this into a conditional', () => {
    const source = unpad(`
      function foo(a) {
        if (a && a.b != null) {
          if ((a.c--) === 1) {
            delete a.c;
          }
          return a.b;
        }
        return bar(a);
      }
    `);
    const expected = unpad(`
      function foo(a) {
        return a && null != a.b ? (1 == a.c-- && delete a.c, a.b) : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should turn this into a conditional', () => {
    const source = unpad(`
      function foo(a) {
        if (a && a.b != null) {
          if ((a.c--) === 1) {
            delete a.c;
          }
          return a.b;
        }
        return bar(a);
      }
    `);
    const expected = unpad(`
      function foo(a) {
        return a && null != a.b ? (1 == a.c-- && delete a.c, a.b) : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should turn this into a conditional', () => {
    const source = unpad(`
      function foo(a) {
        if (a) {
          return a.b;
        } else {
          return bar(a);
        }
      }
    `);
    const expected = unpad(`
      function foo(a) {
        return a ? a.b : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should turn IIFE to negation', () => {
    const source = unpad(`
      (function() {
        x();
      })();
      y = (function() {
        x();
      })();
    `);
    const expected = unpad(`
      !function () {
        x();
      }();
      y = (function () {
        x();
      })();
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should remove the else block if early return', () => {
    const source = unpad(`
    function foo() {
      if (1) {
        return 2;
      } else {
        lol(1);
        lol(2);
      }
    }
    `);

    const expected = unpad(`
      function foo() {
        if (1) return 2;
        lol(1), lol(2);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge blocks into a return with sequence expr', () => {
    const source = unpad(`
      function foo() {
        y();
        x();
        return 1;
      }
    `);

    // TODO shouldn't print those parens (yuck).
    const expected = unpad(`
      function foo() {
        return (y(), x(), 1);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge blocks into a return with sequence expr', () => {
    const source = unpad(`
      function foo() {
        try {
          x();
        } catch (e) {
          1;
        }
        y();
        return 1;
      }
    `);

    // TODO shouldn't print those parens (yuck).
    const expected = unpad(`
      function foo() {
        try {
          x();
        } catch (e) {
          1;
        }
        return (y(), 1);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge statements into sequence expressions into the init part of for', () => {
    const source = unpad(`
      x();
      y();
      for (; i < 10; i++) z();
    `);

    const expected = unpad(`
      for (x(), y(); i < 10; i++) z();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should merge statements into the init part of for', () => {
    const source = unpad(`
      x();
      y();
      for (z(); i < 10; i++) z();
    `);

    const expected = unpad(`
      for (x(), y(), z(); i < 10; i++) z();
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  xit('should remove empty returns', () => {
     const source = unpad(`
       function foo() {
         lol();
         return;
       }
     `);

     const expected = unpad(`
       function foo() {
         lol();
       }
     `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge if statements with following expressions using void', () => {
     const source = unpad(`
       function foo() {
         if(window.self != window.top) {
           if(__DEV__) {
             console.log('lol', name);
           }
           return;
         }
         lol();
       }
     `);

     const expected = unpad(`
       function foo() {
         return window.self == window.top ? void lol() : void (__DEV__ && console.log('lol', name));
       }
     `);

    expect(transform(source)).toBe(expected);
  });

  it('should not try to merge `if` when there are multiple statements to follow', () => {
     const source = unpad(`
       function foo() {
         if(window.self != window.top) {
           if(__DEV__) {
             console.log('lol', name);
           }
           return;
         }
         lol();
         try { lol() } catch (e) {}
       }
     `);

     const expected = unpad(`
       function foo() {
         if (window.self != window.top) return void (__DEV__ && console.log('lol', name));
         lol();
         try {
           lol();
         } catch (e) {}
       }
     `);

    expect(transform(source)).toBe(expected);
  });

  it('should handle missing return arg when merging if statements', () => {
    const source = unpad(`
      function foo() {
        if (a) {
          return;
        }

        b = true;
      }
    `);

    const expected = unpad(`
      function foo() {
        return a || (b = !0);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

});
