/**
 * This file also contains code from UglifyJS, which is BSD Licensed.
 *
 * UglifyJS is Copyright 2012-2013 (c) Mihai Bazon <mihai.bazon@gmail.com>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *     * Redistributions of source code must retain the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
 * THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const comparisonPlugin = require("../../babel-plugin-transform-simplify-comparison-operators/src");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("simplify-plugin", () => {
  it("should flip conditionals", () => {
    const source = "!foo ? 'foo' : 'bar';";
    const expected = "foo ? 'bar' : 'foo';";
    expect(transform(source)).toBe(expected);
  });

  it("should turn for loop block to a single statement", () => {
    const source = unpad(`
      for (var x = 0; x < 10; x++) {
        console.log(x);
      }
    `);
    const expected = "for (var x = 0; x < 10; x++) console.log(x);";

    expect(transform(source).trim()).toBe(expected);
  });

  it("should turn block statements to sequence expr", () => {
    const source = unpad(`
      for (var x = 0; x < 10; x++) {
        console.log(x);
        console.log(x);
      }
    `);
    const expected =
      "for (var x = 0; x < 10; x++) console.log(x), console.log(x);";

    expect(transform(source).trim()).toBe(expected);
  });

  it("should the program into as much sequence exprs", () => {
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


  it("should turn if to gaurded expression", () => {
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

  it("should turn if statement to conditional", () => {
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

  it("should turn this into a conditional", () => {
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
        return a && a.b != null ? (a.c-- === 1 && delete a.c, a.b) : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should turn this into a conditional", () => {
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
        return a && a.b != null ? (a.c-- === 1 && delete a.c, a.b) : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should turn this into a conditional", () => {
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

  xit("should turn IIFE to negation", () => {
    const source = unpad(`
      (function() {
        x();
      })();
      y = function () {
        x();
      }();
    `);
    const expected = unpad(`
      !function () {
        x();
      }(), y = function () {
        x();
      }();
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove the else block if early return", () => {
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

  it("should merge blocks into a return with sequence expr", () => {
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

  it("should merge blocks into a return with sequence expr", () => {
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

  // https://github.com/babel/babili/issues/208
  it("should handle empty blocks when merging to sequences", () => {
    const source = unpad(`
      !function () {
        var x;
        { }
        alert(x);
      }()
    `);
    const expected = unpad(`
      !function () {
        var x;
        alert(x);
      }();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should merge expressions into the init part of for", () => {
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

  it("should merge statements into the init part of for even when there are others", () => {
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

  it("should remove empty returns", () => {
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

  it("should merge if statements with following expressions using void", () => {
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

  it("should not try to merge `if` when there are multiple statements to follow", () => {
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

  it("should handle missing return arg when merging if statements", () => {
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

  it("should handle returns with no args", () => {
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
        return a && a.b != null ? a.c-- === 1 ? void 0 : a.b : bar(a);
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert whiles to fors", () => {
    const source = unpad(`
      function foo(a) {
        while(true) {
          bar();
        }
      }
    `);
    const expected = unpad(`
      function foo(a) {
        for (; true;) bar();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert whiles to fors and merge vars", () => {
    const source = unpad(`
      function foo() {
        let bar = baz;
        while(true) {
          bar();
        }
      }
    `);
    const expected = unpad(`
      function foo() {
        for (let bar = baz; true;) bar();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  // https://github.com/babel/babili/issues/198
  it("should convert while->for and NOT merge let/const if any is refereced outside the loop", () => {
    const source = unpad(`
      function foo() {
        let a,
            { b } = x;
        while (true) {
          bar(a, b);
        }
        return [a, b];
      }
    `);
    const expected = unpad(`
      function foo() {
        let a,
            { b } = x;

        for (; true;) bar(a, b);

        return [a, b];
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should convert while->for and merge var even if any is refereced outside the loop", () => {
    const source = unpad(`
      function foo() {
        var a = 1;
        while (true) {
          bar(a);
        }
        return a;
      }
    `);
    const expected = unpad(`
      function foo() {
        for (var a = 1; true;) bar(a);

        return a;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should combine returns", () => {
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
        if (!(a && a.b && a.b.c && a.b.c())) for (; true;) wat();
      }
   `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert early returns to negated if blocks", () => {
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


  it("should remove early return when no other statements", () => {
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
        x;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("earlyReturnTransform: it shouldn't error on shorthand arrow functions", () => {
    const source = unpad(`
      const f = () => a;
    `);
    const expected = unpad(`
      const f = () => a;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should merge function blocks into sequence expressions", () => {
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

  it("should merge function blocks into sequence expressions (part 2)", () => {
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

        for (z in c(), { a: 1 }) x(z);
        z();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should merge if statements when there is no alternate", () => {
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

  it("should not merge if statements if changes semantics", () => {
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
            if (b()) return false;
        } else if (c()) return true;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should merge if/return statements", () => {
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

  it("should merge if/return statements 2", () => {
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

  it("should merge return statements with expression in between", () => {
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

  it("should hoist functions", () => {
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

  it("should not return inside a loop", () => {
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
          if (a === null) return void b();
          a(), b();
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });


  it("should make if with one return into a conditional", () => {
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

  it("should make if with one return into a conditional 2", () => {
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

  it("should make if with one return into a conditional 3", () => {
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
        b && foo();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should make if with one return into a conditional 4", () => {
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
        b || foo();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not merge if", () => {
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

  it("should merge expressions into if statements test");
  it("should understand continue statements");

  it("should handle do while statements", () => {
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

  it("should handle multiple interplays of if statements and returns", () => {
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
        return b ? c : a ? void bar() : d ? g ? (this['s'] = morebutts, wat) : boo : (haha(), butts);
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle empty blocks in if statements", () => {
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

  it("re-arrange conditionals for assignment", () => {
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

  it("should bail on re-arranging conditionals for assignment", () => {
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

  it("should bail on re-arranging conditionals for assignment", () => {
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

  it("re-arranging conditionals for assignment member exprs", () => {
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

  it("re-arranging conditionals for assignment with operators", () => {
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

  it("should bail on different operators", () => {
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

  it("should bail on different member exprs", () => {
    const source = unpad(`
      if (a) {
        this.a = 1;
      } else {
        this.b = 2;
      }
    `);

    const expected = unpad(`
      a ? this.a = 1 : this.b = 2;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should turn continue into negated if", () => {
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

  it("should flip logical expressions", () => {
    const source = unpad(`
      !x && foo();
      if (!(null == r)) for (;;);
    `);

    const expected = unpad(`
      if (!x && foo(), null != r) for (;;);
    `);

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should flip logical expressions 2", () => {
    const source = unpad(`
      if (!(1 !== foo || !bar)) for (;;);
    `);

    const expected = unpad(`
      if (1 === foo && bar) for (;;);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should combine to a single return statement", () => {
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

  it("should inline break condition in for test", () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        if (bar) break;
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && !bar; i++);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should inline break condition in for test 2", () => {
    const source = unpad(`
      for (i = 1; i <= j; i++) {
        foo();
        if (bar) break;
      }
    `);

    const expected = unpad(`
      for (i = 1; i <= j && (foo(), !bar); i++);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should inline break condition in for test 3", () => {
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
      for (i = 1; i <= j && !bar; i++) if (wat(), x) throw 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should inline break condition in for test 4", () => {
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

    // TODO: see `!!` below.
    const expected = unpad(`
      for (i = 1; i <= j && !!bar; i++) if (wat(), x) throw 1;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should inline break condition in for test 5", () => {
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

    // TODO: only apply ! unary to last in seq expr
    const expected = unpad(`
      for (i = 1; i <= j && (foo(), !bar); i++) {
        if (wat(), x) throw 1;
        hi();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should merge conditional returns into test", () => {
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

  it("should bail on mrege conditional return into test", () => {
    const source = unpad(`
      function foo() {
        if (x) {
          delete x.x;
          if (bar()) return 2;
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
        return x && (delete x.x, bar()) ? 2 : void (bar ? x() : y());
      }
    `);

    expect(transform(source)).toBe(expected);
  });


  it("should merge conditional return into test 2", () => {
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

  it("should handle return argument", () => {
    const source = unpad(`
      function foo() {
        if (x) {
          delete x.x;
          if (bar()) return x;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        if (x && (delete x.x, bar())) return x;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should bail on conditional return into test", () => {
    const source = unpad(`
      function foo() {
        if (x) {
          var f = wow;
          delete x.x;
          if (bar()) return;
        }
      }
    `);

    const expected = unpad(`
      function foo() {
        if (x) {
          var f = wow;

          if (delete x.x, bar()) return;
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should recombine after continue merging", () => {
    const source = unpad(`
      for (;;) {
        a = b;
        if (!foo) continue;
        bar = foo;
      }
    `);

    const expected = unpad(`
      for (;;) a = b, foo && (bar = foo);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not assume undefined", () => {
    const source = unpad(`
      function foo() {
        if (foo) {
          if (bar) {
            return false;
          }
          if (baz) {
            return false;
          }
        }
        return true;
      }
    `);

    const expected = unpad(`
      function foo() {
        if (foo) {
          if (bar) return false;
          if (baz) return false;
        }
        return true;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should keep directives", () => {
    const source = unpad(`
      function a() {
        'use strict';
        foo();
      }
    `);

    const expected = unpad(`
      function a() {
        'use strict';

        foo();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should handle continue in nested if", () => {
    const source = unpad(`
      function wow() {
        for(;;) {
          if (foo) {
            if (bar) {
              continue;
            }
          }
          wat();
        }
      }
    `);

    const expected = unpad(`
      function wow() {
        for (;;) foo && bar || wat();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert gaurded nots to ors", () => {
    const source = unpad(`
      x();
      if (!foo.bar) foo.bar = wat;
    `);

    const expected = unpad(`
      x(), !foo.bar && (foo.bar = wat);
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert gaurded nots to ors", () => {
    const source = unpad(`
      if (!foo && foo !== bar) {
        wow();
        such();
      }
    `);

    const expected = unpad(`
      !foo && foo !== bar && (wow(), such());
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should put the empty vars first", () => {
    const source = unpad(`
      var x = 1, y, z = 2, zx, a;
    `);

    const expected = unpad(`
      var y,
          zx,
          a,
          x = 1,
          z = 2;
    `);

    expect(transform(source)).toBe(expected);
  });

  it("function expression in sequennce doesnt need parens", () => {
    const source = unpad(`
      x, (function() {})();
    `);

    const expected = unpad(`
      x, function () {}();
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should turn early return else block into statement", () => {
    const source = unpad(`
      function x() {
        for (;;) {
          x();
          if (foo) return 1;
          else y();
        }
      }
    `);

    const expected = unpad(`
      function x() {
        for (;;) {
          if (x(), foo) return 1;
          y();
        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove block", () => {
    const source = unpad(`
      function x() {
        if (a) {
          if (b) {
            for(;;) {
              if (a) b();
            }
          }
        } else {
          wat();
        }
      }
    `);

    const expected = unpad(`
      function x() {
        if (!a) wat();else if (b) for (;;) a && b();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  // TODO
  it("should merge things into throw statement seq expr", () => {
    const source = unpad(`
      function x() {
        z();
        throw y;
      }
    `);

    const expected = unpad(`
      function x() {
        throw z(), y;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should negate early return if", () => {
    const source = unpad(`
      function x() {
        if (!bar) return;
        var x = foo;
        if (!foo) return
        if (y)
          throw y;
      }
    `);

    // TODO:
    // Fix indenting
    const expected = unpad(`
      function x() {
        if (bar) {
            var x = foo;
            if (foo && y) throw y;
          }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not negate early return if", () => {
    const source = unpad(`
      function x() {
        var x = foo;
        if (hi) {
          var y = z;
          if (!foo) return;
          if (x) throw y;
        }
        x();
      }
    `);

    const expected = unpad(`
      function x() {
        var x = foo;
        if (hi) {
          var y = z;
          if (!foo) return;
          if (x) throw y;
        }
        x();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("switch if to avoid blocking", () => {
    const source = unpad(`
      function x() {
        if (a) {
          if (b) for (;;) wow();
        } else c();
      }
    `);

    const expected = unpad(`
      function x() {
        if (!a) c();else if (b) for (;;) wow();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should remove last break statement in switch", () => {
    const source = unpad(`
     switch (foo) {
       case 'foo':
         throw bar();
         break;
       case 'bar':
         wow();
         break;
     }
    `);

    const expected = unpad(`
     switch (foo) {
       case 'foo':
         throw bar();
         break;
       case 'bar':
         wow();

     }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not remove last break statement if it contains a label", () => {
    const source = unpad(`
      loop: while (foo) {
        switch (bar) {
          case 47:
            break;
        }
        switch (baz) {
          default:
            break loop;
        }
      }
    `);
    const expected = unpad(`
      loop: for (; foo;) {
        switch (bar) {
          case 47:
        }
        switch (baz) {
          default:
            break loop;
        }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should convert consequents in switch into sequence expressions", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            bar();
            foo();
            break;
          case 'bar':
            wow();
            return wo;
            break;
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            bar(), foo();

            break;
          case 'bar':
            return wow(), wo;

        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert switch statements to returns", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            return 1;
          case foo.bar:
            return 2;
          case wow:
            wow();
            return 3;
          default:
            return 0;
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : 0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert switch statements with next return as default to returns", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            return 1;
          case foo.bar:
            return 2;
          case wow:
            wow();
            return 3;
        }
        return 0;
      }
    `);

    const expected = unpad(`
      function bar() {
        return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : 0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("if last statement in function should consider the default return a void", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            return 1;
          case foo.bar:
            return 2;
          case wow:
            wow();
            return 3;
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : void 0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert switch statements w/ fallthrough to return", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            return 1;
          case foo.bar:
          case wow:
            wow();
            return 3;
          case boo:
            return 4;
          case baz:
          case wat:
            return 5;
          default:
            return 0;
        }
      }
    `);

    /*eslint max-len: 0 */
    const expected = unpad(`
      function bar() {
        return foo === 'foo' ? 1 : foo === foo.bar || foo === wow ? (wow(), 3) : foo === boo ? 4 : foo === baz || foo === wat ? 5 : 0;
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert non-return switch to conditionals", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            foo();
            break;
          case foo.bar:
            wow();
            wat();
            break;
          case shh:
          case wow:
            baa();
            break;
          default:
            meh();
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        foo === 'foo' ? foo() : foo === foo.bar ? (wow(), wat()) : foo === shh || foo === wow ? baa() : meh();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should put sequence in switch test", () => {
    const source = unpad(`
      function bar() {
        wow();
        switch (foo) {
          case 'foo':
            throw x();
            break;
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        switch (wow(), foo) {
          case 'foo':
            throw x();

        }
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should put sequence in if test", () => {
    const source = unpad(`
      function bar() {
        wow();
        if (foo) {
          throw x();
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        if (wow(), foo) throw x();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should convert non-return switch to conditionals", () => {
    const source = unpad(`
      function bar() {
        switch (foo) {
          case 'foo':
            foo();
            break;
          case foo.bar:
            wow();
            wat();
            break;
          case shh:
          case wow:
            baa();
            break;
          default:
            meh();
        }
      }
    `);

    const expected = unpad(`
      function bar() {
        foo === 'foo' ? foo() : foo === foo.bar ? (wow(), wat()) : foo === shh || foo === wow ? baa() : meh();
      }
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not change type", () => {
    const source = unpad(`
      function x(a) {
        return !!a;
      }
    `);

    const expected = unpad(`
      function x(a) {
        return !!a;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not change type", () => {
    const source = unpad(`
      function x(a, b) {
        a = a || b;
        return b === a || !a;
      }
    `);

    const expected = unpad(`
      function x(a, b) {
        return a = a || b, b === a || !a;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should apply unary to only the last element of a sequence expr", () => {
    const source = unpad(`
      !(a, b, c);
    `);

    const expected = unpad(`
      a, b, !c;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should apply unary to both sides of the conditional", () => {
    const source = unpad(`
      !(a ? b : c);
    `);

    const expected = unpad(`
      a ? !b : !c;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should flip alt and cons if condition is unary", () => {
    const source = unpad(`
      !(!a && b) ? b : c
    `);

    const expected = unpad(`
      !a && b ? c : b;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should merge previous expressions in the for loop right", () => {
    const source = unpad(`
      function foo() {
        x = 1;
        a();
        for (var a in b) wow();
      }
    `);

    const expected = unpad(`
      function foo() {
        for (var a in x = 1, a(), b) wow();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should convert empty blocks to empty statements", () => {
    const source = unpad(`
      function foo() {
        for (i in p) {}
        for (; ;) {}
        switch(1) {}
        try { a } catch(e) {}
      }
    `);

    const expected = unpad(`
      function foo() {
        for (i in p);
        for (;;);
        switch (1) {}
        try {
          a;
        } catch (e) {}
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should flip binary expressions", () => {
    const source = unpad(`
      if (!(!a && b == a && !b && b < a)) for(;;) a();
    `);

    const expected = unpad(`
      if (a || b != a || b || !(b < a)) for (;;) a();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should simplify common conditional expression patterns", () => {
    // From UglifyJS
    const source = unpad(`
      function f1() { return a == b ? true : x; }
      function f2() { return a == b ? false : x; }
      function f3() { return a < b ? !0 : x; }
      function f4() { return a < b ? !1 : x; }
      function f5() { return c ? !0 : x; }
      function f6() { return c ? false : x; }
      function f7() { return !c ? true : x; }
      function f8() { return !c ? !1 : x; }
      function g1() { return a == b ? x : true; }
      function g2() { return a == b ? x : false; }
      function g3() { return a < b ? x : !0; }
      function g4() { return a < b ? x : !1; }
      function g5() { return c ? x : true; }
      function g6() { return c ? x : !1; }
      function g7() { return !c ? x : !0; }
      function g8() { return !c ? x : false; }
    `);
    const expected = unpad(`
      function f1() {
        return !(a != b) || x;
      }
      function f2() {
        return a != b && x;
      }
      function f3() {
        return !!(a < b) || x;
      }
      function f4() {
        return !(a < b) && x;
      }
      function f5() {
        return !!c || x;
      }
      function f6() {
        return !c && x;
      }
      function f7() {
        return !c || x;
      }
      function f8() {
        return !!c && x;
      }
      function g1() {
        return a != b || x;
      }
      function g2() {
        return !(a != b) && x;
      }
      function g3() {
        return !(a < b) || x;
      }
      function g4() {
        return !!(a < b) && x;
      }
      function g5() {
        return !c || x;
      }
      function g6() {
        return !!c && x;
      }
      function g7() {
        return !!c || x;
      }
      function g8() {
        return !c && x;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  // From UglifyJS
  it("should simplify logical expression of the following forms of &&", () => {
    // compress to right
    let sources = unpad(`
      a = true && foo
      a = 1 && console.log("asdf")
      a = 4 * 2 && foo()
      a = 10 == 10 && foo() + bar()
      a = "foo" && foo()
      a = 1 + "a" && foo / 10
      a = -1 && 5 << foo
      a = 6 && 10
      a = !NaN && foo()
    `).split("\n");

    let expected = unpad(`
      a = foo;
      a = console.log("asdf");
      a = foo();
      a = foo() + bar();
      a = foo();
      a = foo / 10;
      a = 5 << foo;
      a = 10;
      a = foo();
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(expected);

    // compress to left
    sources = unpad(`
      a = false && bar
      a = NaN && console.log("a")
      a = 0 && bar()
      a = undefined && foo(bar)
      a = 3 * 3 - 9 && bar(foo)
      a = 9 == 10 && foo()
      a = !"string" && foo % bar
      a = 0 && 7
    `).split("\n");

    expected = unpad(`
      a = false;
      a = NaN;
      a = 0;
      a = undefined;
      a = 0;
      a = false;
      a = false;
      a = 0;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(expected);

    // don't compress
    sources = unpad(`
      a = foo() && true;
      a = console.log && 3 + 8;
      a = foo + bar + 5 && "a";
      a = 4 << foo && -1.5;
      a = bar() && false;
      a = foo() && 0;
      a = bar() && NaN;
      a = foo() && null;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(sources);
  });

  it("should simplify logical expression of the following forms of ||", () => {
    // compress to left
    let sources = unpad(`
      a = true     || condition;
      a = 1        || console.log("a");
      a = 2 * 3    || 2 * condition;
      a = 5 == 5   || condition + 3;
      a = "string" || 4 - condition;
      a = 5 + ""   || condition / 5;
      a = -4.5     || 6 << condition;
      a = 6        || 7;
    `).split("\n");

    let expected = unpad(`
      a = true;
      a = 1;
      a = 6;
      a = true;
      a = "string";
      a = "5";
      a = -4.5;
      a = 6;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(expected);

    sources = unpad(`
      a = false     || condition;
      a = 0         || console.log("b");
      a = NaN       || console.log("c");
      a = undefined || 2 * condition;
      a = null      || condition + 3;
      a = 2 * 3 - 6 || 4 - condition;
      a = 10 == 7   || condition / 5;
      a = !"string" || 6 % condition;
      a = null      || 7;
    `).split("\n");

    expected = unpad(`
      a = condition;
      a = console.log("b");
      a = console.log("c");
      a = 2 * condition;
      a = condition + 3;
      a = 4 - condition;
      a = condition / 5;
      a = 6 % condition;
      a = 7;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(expected);

    // don't compress
    sources = unpad(`
      a = condition || true;
      a = console.log("a") || 2;
      a = 4 - condition || "string";
      a = 6 << condition || -4.5;
      a = condition || false;
      a = console.log("b") || NaN;
      a = console.log("c") || 0;
      a = 2 * condition || undefined;
      a = condition + 3 || null;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(sources);
  });

  it("should transform complex logical expressions", () => {
    const sources = unpad(`
      a = true && 1 && foo
      a = 1 && 4 * 2 && console.log("asdf")
      a = 4 * 2 && NaN && foo()
      a = 10 == 11 || undefined && foo() + bar() && bar()
      a = -1 && undefined || 5 << foo
    `).split("\n");

    const expected = unpad(`
      a = foo;
      a = console.log("asdf");
      a = NaN;
      a = undefined;
      a = 5 << foo;
    `).split("\n");

    expect(sources.map((s) => transform(s))).toEqual(expected);
  });

  // https://github.com/babel/babili/issues/115
  it("should transform impure conditional statements correctly - issue#115", () => {
    const source = unpad(`
      (function () {
        a = x ? true : false;
        c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
      })();
    `);
    const expected = unpad(`
      (function () {
        a = !!x, c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
      })();
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should require block for single block scoped declaration in if/else", () => {
    const source = unpad(`
      if (false) {
        let { a } = foo();
      } else if (true) {
        const x = bar();
      } else {
        function baz() {}
      }
    `);
    const expected = source;
    expect(transform(source)).toBe(expected);
  });

  it("should simplify assignments", () => {

    const source = unpad(`
      x = x + 1,
      x = x - 1,
      x = x * 1,
      x = x % 1,
      x = x << 1,
      x = x >> 1,
      x = x >>> 1,
      x = x & 1,
      x = x | 1,
      x = x ^ 1,
      x = x / 1,
      x = x ** 1;
    `);
    const expected = unpad(`
      ++x,
      --x,
      x *= 1,
      x %= 1,
      x <<= 1,
      x >>= 1,
      x >>>= 1,
      x &= 1,
      x |= 1,
      x ^= 1,
      x /= 1,
      x **= 1;
    `).replace(/\s+/g, " ");

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify assignments when it is not an equal operator", () => {

    const source = unpad(`
      x += x + 1,
      x -= x - 1,
      x *= x * 1,
      x %= x % 1,
      x <<= x << 1,
      x >>= x >> 1,
      x >>>= x >>> 1,
      x &= x & 1,
      x |= x | 1,
      x ^= x ^ 1,
      x /= x / 1,
      x **= x ** 1;
    `);
    const expected = unpad(`
      x += x + 1,
      x -= x - 1,
      x *= x * 1,
      x %= x % 1,
      x <<= x << 1,
      x >>= x >> 1,
      x >>>= x >>> 1,
      x &= x & 1,
      x |= x | 1,
      x ^= x ^ 1,
      x /= x / 1,
      x **= x ** 1;
    `).replace(/\s+/g, " ");

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify assignments further when it is not an equal operator", () => {

    const source = unpad(`
      x = x + (x >> 1),
      x = x - (x >> 1),
      x = x * (x >> 1),
      x = x % (x >> 1),
      x = x << (x >> 1),
      x = x >> (x >> 1),
      x = x >>> (x >> 1),
      x = x & (x >> 1),
      x = x | (x >> 1),
      x = x ^ (x >> 1),
      x = x / (x >> 1),
      x = x ** (x >> 1);
    `);
    const expected = unpad(`
      x += x >> 1,
      x -= x >> 1,
      x *= x >> 1,
      x %= x >> 1,
      x <<= x >> 1,
      x >>= x >> 1,
      x >>>= x >> 1,
      x &= x >> 1,
      x |= x >> 1,
      x ^= x >> 1,
      x /= x >> 1,
      x **= x >> 1;
    `).replace(/\s+/g, " ");

    expect(transform(source)).toBe(expected);
  });

  it("should simplify assignments 2", () => {

    const source = unpad(`
      foo = foo + bar,
      foo = foo * function(){},
      foo += 123,
      foo = 1 + foo,
      x = x = x + 1,
      foo = foo + bar + baz
    `);
    const expected = unpad(`
      foo += bar,
      foo *= function () {},
      foo += 123,
      foo = 1 + foo,
      x = ++x,
      foo = foo + bar + baz;
    `).replace(/\s+/g, " ");

    expect(transform(source)).toBe(expected);
  });

  it("should simplify assignments w. member expressions", () => {

    const source = unpad(`
      foo.bar = foo.bar + 1,
      foo.bar = foo.bar + 2,
      foo["x"] = foo[x] + 2,
      foo[x] = foo[x] + 2,
      foo[x] = foo["x"] + 2,
      foo["x"] = foo["x"] + 2,
      foo[1] = foo["1"] + 2,
      foo["bar"] = foo["bar"] + 2,
      foo[bar()] = foo[bar()] + 2,
      foo[""] = foo[""] + 2,
      foo[2] = foo[2] + 2,
      foo[{}] = foo[{}] + 1,
      foo[function(){}] = foo[function(){}] + 1,
      foo[false] = foo[false] + 1,
      foo.bar.baz = foo.bar.baz + 321,
      this.hello = this.hello + 1,
      foo[null] = foo[null] + 1,
      foo[undefined] = foo[undefined] + 1,
      foo.bar = foo.bar || {};
    `);
    // TODO: foo[void 0] = foo[void 0] + 1;
    const expected = unpad(`
      ++foo.bar,
      foo.bar += 2,
      foo["x"] = foo[x] + 2,
      foo[x] += 2,
      foo[x] = foo["x"] + 2,
      foo["x"] += 2,
      foo[1] += 2,
      foo["bar"] += 2,
      foo[bar()] = foo[bar()] + 2,
      foo[""] += 2,
      foo[2] += 2,
      foo[{}] = foo[{}] + 1,
      foo[function () {}] = foo[function () {}] + 1,
      ++foo[false],
      foo.bar.baz += 321,
      ++this.hello,
      ++foo[null],
      ++foo[undefined],
      foo.bar = foo.bar || {};
    `).replace(/\s+/g, " ");

    expect(transform(source)).toBe(expected);
  });

  it("should simplify assignments w. super", () => {

    const source = unpad(`
      class Foo {
        foo() {
          super.foo = super.foo + 1;
        }
      };
    `);
    const expected = unpad(`
      class Foo {
        foo() {
          ++super.foo;
        }
      };
    `);

    expect(transform(source)).toBe(expected);
  });

  it("should not simplify assignments w. template literals", () => {

    const source = unpad("foo[`x`] = foo[`x`] + 1;");

    expect(transform(source)).toBe(source);
  });

  it("should consider hoisted definitions in if_return", () => {
    const source = unpad(`
      function foo() {
        bar();
        if(x) return;
        const {a}=b;
        function bar () {
          baz();
          bar();
        }
      }
    `);
    // TODO:
    // Fix indenting
    const expected = unpad(`
      function foo() {
        function bar() {
          baz(), bar();
        }

        if (bar(), !x) {
            const { a } = b;
          }
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should optimize if..else..returns", () => {
    const source = unpad(`
      function foo() {
        if (a) {
          if (x) return;
          else return x;
        }
        const b = 1;
        return "doesn't matter if this is reached or not";
      }
    `);
    const expected = unpad(`
      function foo() {
        if (a) return x ? void 0 : x;
        const b = 1;
        return "doesn't matter if this is reached or not";
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix issue#281 with if..return", () => {
    const source = unpad(`
      function foo() {
        if (x)
          return;
        function bar() {}
        bar(a);
      }
    `);
    const expected = unpad(`
      function foo() {
        function bar() {}
        x || bar(a);
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix issue#323 with != and !==", () => {
    const source = unpad(`
      function foo() {
        var x, y;
        y = o[x];
        foo(y !== undefined);
      }
    `);
    const expected = unpad(`
      function foo() {
        var x, y;
        y = o[x], foo(y !== undefined);
      }
    `);
    function transform(code) {
      return babel.transform(code,  {
        plugins: [
          plugin,
          comparisonPlugin
        ],
      }).code;
    }
    expect(transform(source)).toBe(expected);
  });
});
