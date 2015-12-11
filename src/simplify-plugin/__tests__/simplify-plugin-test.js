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

  it('should strip unnecessary property literal qoutes for numbers', () => {
    const source = `var x = { '1': 'bar' };`;
    const expected = `var x = { 1: 'bar' };`;
    expect(transform(source)).toBe(expected);
  });

  it('should turn subscript into dot', () => {
    const source = `foo['1'];`;
    const expected = `foo[1];`;
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

  it('should shorten bool', () => {
    const source = `true; false;`;
    const expected = `!0, !1;`;
    expect(transform(source)).toBe(expected);
  });

  it('should put values first in binary expressions', () => {
    const source = `a === 1;`;
    const expected = `1 === a;`;
    expect(transform(source)).toBe(expected);
  });

  it('should put pures first in binary expressions', () => {
    const source = `a === -1;`;
    const expected = `-1 === a;`;
    expect(transform(source)).toBe(expected);
  });

  it('should put pures first in binary expressions 2', () => {
    const source = `a === null;`;
    const expected = `null === a;`;
    expect(transform(source)).toBe(expected);
  });

  it('should put pures first in binary expressions 3', () => {
    const source = unpad(`
      function foo() {
        if (foo !== null) {
          var bar;
          bar = baz;
        }
        x();
        return x;
      }
    `);
    const expected = unpad(`
      function foo() {
        if (null !== foo) {
            var bar;
            bar = baz;
          }
        return x(), x;
      }
    `);
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
      var j = 0;
      for (var x = 0; x < 10; x++) console.log(i + x);
    `);
    const expected = 'for (var i = 0, j = 0, x = 0; x < 10; x++) console.log(i + x);';

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

  it('should the program into as much sequence exprs', () => {
    const source = unpad(`
      x();
      y();
      for (var x = 0; x < 10; x++) {
        var z = foo();
        console.log(z);
        console.log(z);
      }
      a();
      b = 1;
    `);
    const expected = unpad(`
      x(), y();

      for (var x = 0; x < 10; x++) {
        var z = foo();
        console.log(z), console.log(z);
      }
      a(), b = 1;
    `);
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

  xit('should turn IIFE to negation', () => {
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
      }(), y = (function () {
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
        return 1 ? 2 : void (lol(1), lol(2));
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

    const expected = unpad(`
      function foo() {
        return y(), x(), 1;
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

    const expected = unpad(`
      function foo() {
        try {
          x();
        } catch (e) {
          1;
        }
        return y(), 1;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge expressions into the init part of for', () => {
    const source = unpad(`
      function foo() {
        x();
        y();
        for (; i < 10; i++) z();
      }
    `);

    const expected = unpad(`
      function foo() {
        for (x(), y(); i < 10; i++) z();
      }
    `);

    expect(transform(source).trim()).toBe(expected);
  });

  it('should merge statements into the init part of for even when there are others', () => {
    const source = unpad(`
      function foo() {
        x();
        y();
        for (z(); i < 10; i++) z();
      }
    `);

    const expected = unpad(`
      function foo() {
        for (x(), y(), z(); i < 10; i++) z();
      }
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

        return wow;
      }
    `);

    const expected = unpad(`
      function foo() {
        return a ? void 0 : wow;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should handle returns with no args', () => {
    const source = unpad(`
      function foo(a) {
        if (a && a.b != null) {
          if ((a.c--) === 1) {
            return;
          }
          return a.b;
        }
        return bar(a);
      }
    `);
    const expected = unpad(`
      function foo(a) {
        return a && null != a.b ? 1 == a.c-- ? void 0 : a.b : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should convert whiles to fors', () => {
    const source = unpad(`
      function foo(a) {
        while(true) {
          bar();
        }
      }
    `);
    const expected = unpad(`
      function foo(a) {
        for (; !0;) bar();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should convert whiles to fors and merge vars', () => {
    const source = unpad(`
      function foo(a) {
        var bar = baz;
        while(true) {
          bar();
        }
      }
    `);
    const expected = unpad(`
      function foo(a) {
        for (var bar = baz; !0;) bar();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should combine returns', () => {
    const source = unpad(`
      function foo() {
        if (a) {
          if (a.b) {
            if(a.b.c) {
              if(a.b.c()){
                return;
              }
            }
          }
        }
        for (; true;) wat();
      }
   `);

    const expected = unpad(`
      function foo() {
        if (!(a && a.b && a.b.c && a.b.c())) for (; !0;) wat();
      }
   `);

    expect(transform(source)).toBe(expected);
  });

  it('should convert early returns to negated if blocks', () => {
     const source = unpad(`
      function foo(a) {
        if (lol) return;
        doThings();
        doOtherThings();
      }
      function bar(a) {
        if (lol) {
          return;
        }
        try {
          doThings();
        } catch (e) {
          doOtherThings();
        }
      }
      function baz() {
        while (wow) if (lol) return;
        boo();
      }
    `);
    const expected = unpad(`
      function foo(a) {
        lol || (doThings(), doOtherThings());
      }
      function bar(a) {
        if (!lol) try {
          doThings();
        } catch (e) {
          doOtherThings();
        }
      }
      function baz() {
        for (; wow;) if (lol) return;

        boo();
      }

    `);
    expect(transform(source)).toBe(expected);
  });


  it('should remove early return when no other statements', () => {
    const source = unpad(`
      function foo() {
        wow();
        if (x) {
          return;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        wow();
      }
    `);
    expect(transform(source)).toBe(expected);
  });
  it('should merge function blocks into sequence expressions', () => {
    const source = unpad(`
      function foo() {
        a();
        var x = bar();
        b(x);
        this.d = x;
      }
      function bar() {
        x();
        while (x) {
          if (x) x();
        }
        try { y(); } catch (e) {}
        var z = x();
        z();
        while (a) b();
        c();
        z();
      }
    `);

    // TODO merge var z into the init part of for.
    const expected = unpad(`
      function foo() {
        a();

        var x = bar();
        b(x), this.d = x;
      }
      function bar() {
        for (x(); x;) x && x();

        try {
          y();
        } catch (e) {}
        var z = x();

        for (z(); a;) b();

        c(), z();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge function blocks into sequence expressions (part 2)', () => {
    const source = unpad(`
      function bar() {
        var z;
        c();
        for (z in { a: 1}) x(z);
        z();
      }
    `);

    const expected = unpad(`
      function bar() {
        var z;
        c();

        for (z in { a: 1 }) x(z);
        z();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge if statements when there is no alternate', () => {
    const source = unpad(`
      if (a) {
        if (b) {
          throw 'wow';
        }
      }
    `);

    const expected = unpad(`
      if (a && b) throw 'wow';
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should not merge if statements if changes semantics', () => {
    const source = unpad(`
      function foo() {
        if (a) {
          if (b()) return false;
        } else if (c()) return true;
      }
    `);

    const expected = unpad(`
      function foo() {
        if (a) {
            if (b()) return !1;
        } else if (c()) return !0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge if/return statements', () => {
    const source = unpad(`
      function foo() {
        if (a) return b;
        if (c) return d;
        return e;
      }
    `);

    const expected = unpad(`
      function foo() {
        return a ? b : c ? d : e;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge if/return statements 2', () => {
    const source = unpad(`
      function foo() {
        if (bar) return;
        if (far) return;
        if (faz) return;

        return e;
      }
    `);

    const expected = unpad(`
      function foo() {
        return bar || far || faz ? void 0 : e;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge return statements with expression in between', () => {
    const source = unpad(`
      function foo() {
        if (a) return b;
        c = d;
        return z;
      }
    `);

    const expected = unpad(`
      function foo() {
        return a ? b : (c = d, z);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should hoist functions', () => {
    const source = unpad(`
      function foo() {
        a();
        function bar() {}
        b();
      }
    `);

    const expected = unpad(`
      function foo() {
        function bar() {}
        a(), b();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should not return inside a loop', () => {
    const source = unpad(`
      function foo() {
        while(1) {
          if (a === null) {
            b();
            return;
          }
          a();
          b();
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        for (; 1;) {
          if (null === a) return void b();
          a(), b();
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });


  it('should make if with one return into a conditional', () => {
    const source = unpad(`
      function foo() {
        if (b) {
          return foo;
        } else {
          a();
          b();
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        return b ? foo : void (a(), b());
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should make if with one return into a conditional 2', () => {
    const source = unpad(`
      function foo() {
        if (b) {
          foo();
        } else {
          return bar;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        return b ? void foo() : bar;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should make if with one return into a conditional 3', () => {
    const source = unpad(`
      function foo() {
        if (b) {
          foo();
        } else {
          return;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        return b && void foo();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should make if with one return into a conditional 4', () => {
    const source = unpad(`
      function foo() {
        if (b) {
          return;
        } else {
          foo();
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        return b || void foo();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should not merge if', () => {
    const source = unpad(`
      if (x) {
        try {
          foo();
        } catch (e) {}
      } else if (y) {
        if (a) {
          bar();
        } else if (b) {
          baz();
        } else {
          for (;;) 1;
        }
      }
   `);

    const expected = unpad(`
      if (x) try {
          foo();
        } catch (e) {} else if (y) if (a) bar();else if (b) baz();else for (;;) 1;
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should merge expressions into if statements test');
  it('should understand continue statements');

  it('should handle do while statements', () => {
    const source = unpad(`
      do {
        foo();
      } while (1);
   `);

    const expected = unpad(`
      do foo(); while (1);
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should handle multiple interplays of if statements and returns', () => {
    const source = unpad(`
      function lawl() {
        var a = 1;
        if (b) {
          return c;
        }

        if (a) {
          bar();
          return;
        }

        if (d) {
          if (g) {
            this['s'] = morebutts;
            return wat;
          }
          return boo;
        }

        haha();
        return butts;
      }
   `);

    const expected = unpad(`
      function lawl() {
        var a = 1;
        return b ? c : a ? void bar() : d ? g ? (this.s = morebutts, wat) : boo : (haha(), butts);
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should handle empty blocks in if statements', () => {
    const source = unpad(`
      if (a) {
      } else {
        foo();
      }

      if (a) {
        foo();
      } else if (b) {
      }

      if (a) {
      } else {
      }
    `);

    const expected = unpad(`
      a || foo(), a ? foo() : b, a;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('re-arrange conditionals for assignment', () => {
    const source = unpad(`
      var x;
      if (a) {
        x = foo;
      } else if (b) {
        x = bar;
      } else {
        x = baz;
      }
    `);

    const expected = unpad(`
      var x;
      x = a ? foo : b ? bar : baz;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should bail on re-arranging conditionals for assignment', () => {
    const source = unpad(`
      var x;
      if (a) {
        x = foo;
      } else if (b) {
        x = bar;
      } else {
        y = baz;
      }
    `);

    const expected = unpad(`
      var x;
      a ? x = foo : b ? x = bar : y = baz;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should bail on re-arranging conditionals for assignment', () => {
    const source = unpad(`
      var x;
      if (a) {
        x = foo;
      } else if (b) {
        x = bar;
      } else {
        baz();
      }
    `);

    const expected = unpad(`
      var x;
      a ? x = foo : b ? x = bar : baz();
    `);

    expect(transform(source)).toBe(expected);
  });

  it('re-arranging conditionals for assignment member exprs', () => {
    const source = unpad(`
      if (a) {
        x.b = foo;
      } else if (b) {
        x.b = bar;
      } else {
        x.b = baz;
      }
    `);

    const expected = unpad(`
      x.b = a ? foo : b ? bar : baz;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('re-arranging conditionals for assignment with operators', () => {
    const source = unpad(`
      if (a) {
        x.b += foo;
      } else if (b) {
        x.b += bar;
      } else {
        x.b += baz;
      }
    `);

    const expected = unpad(`
      x.b += a ? foo : b ? bar : baz;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should bail on different operators', () => {
    const source = unpad(`
      if (a) {
        x.b += foo;
      } else if (b) {
        x.b -= bar;
      } else {
        x.b += baz;
      }
    `);

    const expected = unpad(`
      a ? x.b += foo : b ? x.b -= bar : x.b += baz;
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should turn continue into negated if', () => {
    const source = unpad(`
      for (var p in foo) {
        if (p) continue;
        bar();
      }
    `);

    const expected = unpad(`
      for (var p in foo) p || bar();
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should flip logical expressions', () => {
    const source = unpad(`
      !x && foo();
      if (!(null == r)) for (;;);
    `);

    const expected = unpad(`
      x || foo();

      if (null != r) for (;;);
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should combine to a single return statement', () => {
    const source = unpad(`
      function foo() {
        if (foo) {
          bar(foo);
          return foo;
        } else if (baz) {
          bar(baz);
          return baz;
        } else if (wat) {
          bar(wat);
          return wat;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        return foo ? (bar(foo), foo) : baz ? (bar(baz), baz) : wat ? (bar(wat), wat) : void 0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should combine to a single return statement 2', () => {
    const source = unpad(`
      function foo() {
        var v = x.y;
        if (v === x) return;
        if (v && V) {
          if (x && y) return;
          if (!c && b) return;
        }
        return e;
      }
    `);

    const expected = unpad(`
      function foo() {
        var v = x.y;
        return v === x ? void 0 : v && V ? (x && y || !c && b, void 0) : e;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should inline break condition in for test', () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        if (bar) break;
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && bar; i++);
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should inline break condition in for test 2', () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        foo();
        if (bar) break;
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && (foo(), bar); i++);
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should inline break condition in for test 3', () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        if (bar) {
          break;
        } else {
          wat();
          if (x) throw 1
        }
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && bar; i++) {
        wat();

        if (x) throw 1;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should inline break condition in for test 4', () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        if (bar) {
          wat();
          if (x) throw 1;
        } else {
          break;
        }
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && !bar; i++) {
        wat();

        if (x) throw 1;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should inline break condition in for test 5', () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        foo();
        if (bar) {
          break;
        } else {
          wat();
          if (x) throw 1
        }
        hi();
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && (foo(), bar); i++) {
        wat();

        if (x) throw 1;
        hi();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge conditional returns into test', () => {
    const source = unpad(`
      function foo() {
        if (x) {
          delete x.x;
          if (bar()) return;
        }

        if (bar) {
          x();
        } else {
          y();
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        x && (delete x.x, bar()) || (bar ? x() : y());
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it('should merge conditional return into test', () => {
    const source = unpad(`
      function foo() {
        if (x) {
          delete x.x;
          if (bar()) return;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        x && (delete x.x, bar());
      }
    `);

    expect(transform(source)).toBe(expected);
  });
});
