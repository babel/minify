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

const comparisonPlugin = require("../../babel-plugin-transform-simplify-comparison-operators/src");
const plugin = require("../src/index");

const thePlugin = require("../../../utils/test-transform")(plugin);

describe("simplify-plugin", () => {
  thePlugin(
    "should flip conditionals",
    `
    !foo ? 'foo' : 'bar';
  `,
    `
    foo ? 'bar' : 'foo';
  `
  );

  thePlugin(
    "should turn a for loop block to a single statement",
    `
    for (var x = 0; x < 10; x++) {
      console.log(x);
    }
  `,
    `
    for (var x = 0; x < 10; x++) console.log(x);
  `
  );

  thePlugin(
    "should turn block statements into a comma expression",
    `
      for (var x = 0; x < 10; x++) {
        console.log(x);
        console.log(x);
      }
    `,
    `
      for (var x = 0; x < 10; x++) console.log(x), console.log(x);
  `
  );

  thePlugin(
    "should merge lines of code into one comma expression where possible",
    `
    x();
    y();
    for (var x = 0; x < 10; x++) {
      var z = foo();
      console.log(z);
      console.log(z);
    }
    a();
    b = 1;
  `,
    `
    x(), y();

    for (var x = 0; x < 10; x++) {
      var z = foo();
      console.log(z), console.log(z);
    }
    a(), b = 1;
  `
  );

  thePlugin(
    "should turn `if` statements into gaurded expressions",
    `
    function foo() {
      if (x) a();
    }
  `,
    `
    function foo() {
      x && a();
    }
  `
  );

  thePlugin(
    "should turn if statements into a ternary",
    `
    function foo() {
      if (x) a();
      else b();
    }
  `,
    `
    function foo() {
      x ? a() : b();
    }
  `
  );

  thePlugin(
    "should minify complex `if` statements",
    `
    function foo(a) {
      if (a && a.b != null) {
        if ((a.c--) === 1) {
          delete a.c;
        }
        return a.b;
      }
      return bar(a);
    }

    function foo2(a) {
      if (a) {
        return a.b;
      } else {
        return bar(a);
      }
    }
  `,
    `
    function foo(a) {
      return a && a.b != null ? (a.c-- === 1 && delete a.c, a.b) : bar(a);
    }

    function foo2(a) {
      return a ? a.b : bar(a);
    }
  `
  );

  thePlugin.skip(
    "should convert (function () {...})() into !function () {}()",
    `
    (function() {
      x();
    })();
    y = function () {
      x();
    }();
  `,
    `
    !function () {
      x();
    }(), y = function () {
      x();
    }();
  `
  );

  thePlugin(
    "should remove the `else` block if there is an early return",
    `
    function foo() {
      if (1) {
        return 2;
      } else {
        lol(1);
        lol(2);
      }
    }
  `,
    `
    function foo() {
      return 1 ? 2 : void (lol(1), lol(2));
    }
  `
  );

  thePlugin(
    "should merge expressions into a comma expression in a `return` statement",
    `
    function foo() {
      y();
      x();
      return 1;
    }
  `,
    `
    function foo() {
      return y(), x(), 1;
    }
  `
  );

  thePlugin(
    "should merge blocks into a `return` statement with a comma expression",
    `
    function foo() {
      try {
        x();
      } catch (e) {
        1;
      }

      y();
      return 1;
    }
  `,
    `
    function foo() {
      try {
        x();
      } catch (e) {
        1;
      }

      return y(), 1;
    }
  `
  );

  // https://github.com/babel/minify/issues/208
  thePlugin(
    "should not regresson #208 by handling empty blocks when merging lines into sequences",
    `
    !function () {
      var x;
      { }
      alert(x);
    }()
  `,
    `
    !function () {
      var x;
      alert(x);
    }();
  `
  );

  thePlugin(
    "should merge expressions into the init part of a `for` loop",
    `
    function foo() {
      x();
      y();
      for (; i < 10; i++) z();
    }
  `,
    `
    function foo() {
      for (x(), y(); i < 10; i++) z();
    }
  `
  );

  thePlugin(
    "should merge statements into the init part of a `for` loop even when there are other expressions there",
    `
    function foo() {
      x();
      y();
      for (z(); i < 10; i++) z();
    }
  `,
    `
    function foo() {
      for (x(), y(), z(); i < 10; i++) z();
    }
  `
  );

  thePlugin(
    "should remove empty `return` statements",
    `
     function foo() {
       lol();
       return;
     }
   `,
    `
     function foo() {
       lol();
     }
   `
  );

  thePlugin(
    "should merge if statements with following expressions using void",
    `
   function foo() {
     if(window.self != window.top) {
       if(__DEV__) {
         console.log('lol', name);
       }
       return;
     }
     lol();
   }
 `,
    `
   function foo() {
     return window.self == window.top ? void lol() : void (__DEV__ && console.log('lol', name));
   }
 `
  );

  thePlugin(
    "should not try to merge `if` when there are multiple statements to follow",
    `
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
   `,
    `
     function foo() {
       if (window.self != window.top) return void (__DEV__ && console.log('lol', name));
       lol();

       try {
         lol();
       } catch (e) {}
     }
   `
  );

  thePlugin(
    "should handle missing return arg when merging if statements",
    `
    function foo() {
      if (a) {
        return;
      }

      return wow;
    }
  `,
    `
    function foo() {
      return a ? void 0 : wow;
    }
  `
  );

  thePlugin(
    "should handle returns with no args",
    `
    function foo(a) {
      if (a && a.b != null) {
        if ((a.c--) === 1) {
          return;
        }
        return a.b;
      }
      return bar(a);
    }
  `,
    `
    function foo(a) {
      return a && a.b != null ? a.c-- === 1 ? void 0 : a.b : bar(a);
    }
  `
  );

  thePlugin(
    "should convert whiles to fors",
    `
    function foo(a) {
      while(true) {
        bar();
      }
    }
  `,
    `
    function foo(a) {
      for (; true;) bar();
    }
  `
  );

  thePlugin(
    "should convert whiles to fors and merge vars",
    `
    function foo() {
      let bar = baz;
      while(true) {
        bar();
      }
    }
  `,
    `
    function foo() {
      for (let bar = baz; true;) bar();
    }
  `
  );

  // https://github.com/babel/minify/issues/198
  thePlugin(
    "should convert while->for and NOT merge let/const if any is refereced outside the loop",
    `
    function foo() {
      let a,
          { b } = x;
      while (true) {
        bar(a, b);
      }
      return [a, b];
    }
  `,
    `
    function foo() {
      let a,
          { b } = x;

      for (; true;) bar(a, b);

      return [a, b];
    }
  `
  );

  thePlugin(
    "should convert while->for and merge var even if any is refereced outside the loop",
    `
    function foo() {
      var a = 1;
      while (true) {
        bar(a);
      }
      return a;
    }
  `,
    `
    function foo() {
      for (var a = 1; true;) bar(a);

      return a;
    }
  `
  );

  thePlugin(
    "should combine returns",
    `
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
  `,
    `
    function foo() {
      if (!(a && a.b && a.b.c && a.b.c())) for (; true;) wat();
    }
  `
  );

  thePlugin(
    "should convert early returns to negated if blocks",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should remove early return when no other statements",
    `
    function foo() {
      wow();
      if (x) {
        return;
      }
    }
  `,
    `
    function foo() {
      wow();
      x;
    }
  `
  );

  thePlugin(
    "earlyReturnTransform: it shouldn't error on shorthand arrow functions",
    `
    const f = () => a;
  `,
    `
    const f = () => a;
  `
  );

  // TODO merge var z into the init part of for.
  thePlugin(
    "should merge function blocks into sequence expressions",
    `
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
  `,
    `
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
  `
  );

  thePlugin(
    "should merge function blocks into sequence expressions (part 2)",
    `
    function bar() {
      var z;
      c();
      for (z in { a: 1}) x(z);
      z();
    }
  `,
    `
    function bar() {
      var z;

      for (z in c(), { a: 1 }) x(z);
      z();
    }
  `
  );

  thePlugin(
    "should merge if statements when there is no alternate",
    `
    if (a) {
      if (b) {
        throw 'wow';
      }
    }
  `,
    `
    if (a && b) throw 'wow';
  `
  );

  thePlugin(
    "should not merge if statements if changes semantics",
    // FIXME: for some reason, the inner `if` statement gets indented 4 spaces.
    `
    function foo() {
      if (a) {
          if (b()) return false;
      } else if (c()) return true;
    }
  `
  );

  thePlugin(
    "should merge if/return statements",
    `
    function foo() {
      if (a) return b;
      if (c) return d;
      return e;
    }
  `,
    `
    function foo() {
      return a ? b : c ? d : e;
    }
  `
  );

  thePlugin(
    "should merge if/return statements 2",
    `
    function foo() {
      if (bar) return;
      if (far) return;
      if (faz) return;
1
      return e;
    }
  `,
    `
    function foo() {
      return bar || far || faz ? void 0 : e;
    }
  `
  );

  thePlugin(
    "should merge return statements with expression in between",
    `
    function foo() {
      if (a) return b;
      c = d;
      return z;
    }
  `,
    `
    function foo() {
      return a ? b : (c = d, z);
    }
  `
  );

  thePlugin(
    "should hoist functions",
    `
    function foo() {
      a();
      function bar() {}
      b();
    }
  `,
    `
    function foo() {
      function bar() {}
      a(), b();
    }
  `
  );

  thePlugin(
    "should not return inside a loop",
    `
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
  `,
    `
    function foo() {
      for (; 1;) {
        if (a === null) return void b();
        a(), b();
      }
    }
  `
  );

  thePlugin(
    "should make if with one return into a conditional",
    `
    function foo() {
      if (b) {
        return foo;
      } else {
        a();
        b();
      }
    }
  `,
    `
    function foo() {
      return b ? foo : void (a(), b());
    }
  `
  );

  thePlugin(
    "should make if with one return into a conditional 2",
    `
    function foo() {
      if (b) {
        foo();
      } else {
        return bar;
      }
    }
  `,
    `
    function foo() {
      return b ? void foo() : bar;
    }
  `
  );

  thePlugin(
    "should make if with one return into a conditional 3",
    `
    function foo() {
      if (b) {
        foo();
      } else {
        return;
      }
    }
  `,
    `
    function foo() {
      b && foo();
    }
  `
  );

  thePlugin(
    "should make if with one return into a conditional 4",
    `
    function foo() {
      if (b) {
        return;
      } else {
        foo();
      }
    }
  `,
    `
    function foo() {
      b || foo();
    }
  `
  );

  thePlugin(
    "should not merge if",
    `
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
 `,
    `
    if (x) try {
        foo();
      } catch (e) {} else if (y) if (a) bar();else if (b) baz();else for (;;) 1;
  `
  );

  it("should merge expressions into if statements test");
  it("should understand continue statements");

  thePlugin(
    "should handle do while statements",
    `
    do {
      foo();
    } while (1);
 `,
    `
    do foo(); while (1);
  `
  );

  thePlugin(
    "should handle multiple interplays of if statements and returns",
    `
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
 `,
    `
    function lawl() {
      var a = 1;
      return b ? c : a ? void bar() : d ? g ? (this['s'] = morebutts, wat) : boo : (haha(), butts);
    }
  `
  );

  thePlugin(
    "should handle empty blocks in if statements",
    `
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
  `,
    `
    a || foo(), a ? foo() : b, a;
  `
  );

  thePlugin(
    "re-arrange conditionals for assignment",
    `
    var x;
    if (a) {
      x = foo;
    } else if (b) {
      x = bar;
    } else {
      x = baz;
    }
  `,
    `
    var x;
    x = a ? foo : b ? bar : baz;
  `
  );

  thePlugin(
    "should bail on re-arranging conditionals for assignment",
    `
    var x;
    if (a) {
      x = foo;
    } else if (b) {
      x = bar;
    } else {
      y = baz;
    }
  `,
    `
    var x;
    a ? x = foo : b ? x = bar : y = baz;
  `
  );

  thePlugin(
    "should bail on re-arranging conditionals for assignment",
    `
    var x;
    if (a) {
      x = foo;
    } else if (b) {
      x = bar;
    } else {
      baz();
    }
  `,
    `
    var x;
    a ? x = foo : b ? x = bar : baz();
  `
  );

  thePlugin(
    "re-arranging conditionals for assignment member exprs",
    `
    if (a) {
      x.b = foo;
    } else if (b) {
      x.b = bar;
    } else {
      x.b = baz;
    }
  `,
    `
    x.b = a ? foo : b ? bar : baz;
  `
  );

  thePlugin(
    "re-arranging conditionals for assignment with operators",
    `
    if (a) {
      x.b += foo;
    } else if (b) {
      x.b += bar;
    } else {
      x.b += baz;
    }
  `,
    `
    x.b += a ? foo : b ? bar : baz;
  `
  );

  thePlugin(
    "should bail on different operators",
    `
    if (a) {
      x.b += foo;
    } else if (b) {
      x.b -= bar;
    } else {
      x.b += baz;
    }
  `,
    `
    a ? x.b += foo : b ? x.b -= bar : x.b += baz;
  `
  );

  thePlugin(
    "should bail on different member exprs",
    `
    if (a) {
      this.a = 1;
    } else {
      this.b = 2;
    }
  `,
    `
    a ? this.a = 1 : this.b = 2;
  `
  );

  thePlugin(
    "should turn continue into negated if",
    `
    for (var p in foo) {
      if (p) continue;
      bar();
    }
  `,
    `
    for (var p in foo) p || bar();
  `
  );

  thePlugin(
    "should flip logical expressions",
    `
    !x && foo();
    if (!(null == r)) for (;;);
  `,
    `
    if (!x && foo(), null != r) for (;;);
  `
  );

  thePlugin(
    "should flip logical expressions 2",
    `
    if (!(1 !== foo || !bar)) for (;;);
  `,
    `
    if (1 === foo && bar) for (;;);
  `
  );

  thePlugin(
    "should combine to a single return statement",
    `
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
  `,
    `
    function foo() {
      return foo ? (bar(foo), foo) : baz ? (bar(baz), baz) : wat ? (bar(wat), wat) : void 0;
    }
  `
  );

  thePlugin(
    "should inline break condition in for test",
    `
    for (i = 1; i <= j; i++) {
      if (bar) break;
    }
  `,
    `
    for (i = 1; i <= j && !bar; i++);
  `
  );

  thePlugin(
    "should inline break condition in for test 2",
    `
    for (i = 1; i <= j; i++) {
      foo();
      if (bar) break;
    }
  `,
    `
    for (i = 1; i <= j && (foo(), !bar); i++);
  `
  );

  thePlugin(
    "should inline break condition in for test 3",
    `
    for (i = 1; i <= j; i++) {
      if (bar) {
        break;
      } else {
        wat();
        if (x) throw 1
      }
    }
  `,
    `
    for (i = 1; i <= j && !bar; i++) if (wat(), x) throw 1;
  `
  );

  // TODO: see `!!` below.
  thePlugin(
    "should inline break condition in for test 4",
    `
    for (i = 1; i <= j; i++) {
      if (bar) {
        wat();
        if (x) throw 1;
      } else {
        break;
      }
    }
  `,
    `
    for (i = 1; i <= j && !!bar; i++) if (wat(), x) throw 1;
  `
  );

  // TODO: only apply ! unary to last in seq expr
  thePlugin(
    "should inline break condition in for test 5",
    `
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
  `,
    `
    for (i = 1; i <= j && (foo(), !bar); i++) {
      if (wat(), x) throw 1;
      hi();
    }
  `
  );

  thePlugin(
    "should merge conditional returns into test",
    `
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
  `,
    `
    function foo() {
      x && (delete x.x, bar()) || (bar ? x() : y());
    }
  `
  );

  thePlugin(
    "should bail on mrege conditional return into test",
    `
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
  `,
    `
    function foo() {
      return x && (delete x.x, bar()) ? 2 : void (bar ? x() : y());
    }
  `
  );

  thePlugin(
    "should merge conditional return into test 2",
    `
    function foo() {
      if (x) {
        delete x.x;
        if (bar()) return;
      }
    }
  `,
    `
    function foo() {
      x && (delete x.x, bar());
    }
  `
  );

  thePlugin(
    "should handle return argument",
    `
    function foo() {
      if (x) {
        delete x.x;
        if (bar()) return x;
      }
    }
  `,
    `
    function foo() {
      if (x && (delete x.x, bar())) return x;
    }
  `
  );

  thePlugin(
    "should bail on conditional return into test",
    `
    function foo() {
      if (x) {
        var f = wow;
        delete x.x;
        if (bar()) return;
      }
    }
  `,
    `
    function foo() {
      if (x) {
        var f = wow;

        if (delete x.x, bar()) return;
      }
    }
  `
  );

  thePlugin(
    "should recombine after continue merging",
    `
    for (;;) {
      a = b;
      if (!foo) continue;
      bar = foo;
    }
  `,
    `
    for (;;) a = b, foo && (bar = foo);
  `
  );

  thePlugin(
    "should not assume undefined",
    `
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
  `,
    `
    function foo() {
      if (foo) {
        if (bar) return false;
        if (baz) return false;
      }
      return true;
    }
  `
  );

  thePlugin(
    "should keep directives",
    `
    function a() {
      'use strict';
      foo();
    }
  `,
    `
    function a() {
      'use strict';

      foo();
    }
  `
  );

  thePlugin(
    "should handle continue in nested if",
    `
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
  `,
    `
    function wow() {
      for (;;) foo && bar || wat();
    }
  `
  );

  thePlugin(
    "should convert gaurded nots to ors",
    `
    x();
    if (!foo.bar) foo.bar = wat;
  `,
    `
    x(), !foo.bar && (foo.bar = wat);
  `
  );

  thePlugin(
    "should convert gaurded nots to ors",
    `
    if (!foo && foo !== bar) {
      wow();
      such();
    }
  `,
    `
    !foo && foo !== bar && (wow(), such());
  `
  );

  thePlugin(
    "should put the empty vars first",
    `
    var x = 1, y, z = 2, zx, a;
  `,
    `
    var y,
        zx,
        a,
        x = 1,
        z = 2;
  `
  );

  thePlugin(
    "function expression in sequennce doesnt need parens",
    `
    x, (function() {})();
  `,
    `
    x, function () {}();
  `
  );

  thePlugin(
    "should turn early return else block into statement",
    `
    function x() {
      for (;;) {
        x();
        if (foo) return 1;
        else y();
      }
    }
  `,
    `
    function x() {
      for (;;) {
        if (x(), foo) return 1;
        y();
      }
    }
  `
  );

  thePlugin(
    "should remove block",
    `
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
  `,
    `
    function x() {
      if (!a) wat();else if (b) for (;;) a && b();
    }
  `
  );

  // TODO
  thePlugin(
    "should merge things into throw statement seq expr",
    `
    function x() {
      z();
      throw y;
    }
  `,
    `
    function x() {
      throw z(), y;
    }
  `
  );

  // TODO:
  // Fix indenting
  thePlugin(
    "should negate early return if",
    `
    function x() {
      if (!bar) return;
      var x = foo;
      if (!foo) return
      if (y)
        throw y;
    }
  `,
    `
    function x() {
      if (bar) {
          var x = foo;
          if (foo && y) throw y;
        }
    }
  `
  );

  thePlugin(
    "should not negate early return if",
    `
    function x() {
      var x = foo;
      if (hi) {
        var y = z;
        if (!foo) return;
        if (x) throw y;
      }
      x();
    }
  `,
    `
    function x() {
      var x = foo;
      if (hi) {
        var y = z;
        if (!foo) return;
        if (x) throw y;
      }
      x();
    }
  `
  );

  thePlugin(
    "switch if to avoid blocking",
    `
    function x() {
      if (a) {
        if (b) for (;;) wow();
      } else c();
    }
  `,
    `
    function x() {
      if (!a) c();else if (b) for (;;) wow();
    }
  `
  );

  thePlugin(
    "should remove last break statement in switch",
    `
    switch (foo) {
      case 'foo':
        throw bar();
        break;
      case 'bar':
        wow();
        break;
    }
  `,
    `
    switch (foo) {
      case 'foo':
        throw bar();
        break;
      case 'bar':
        wow();

    }
  `
  );

  thePlugin(
    "should not remove last break statement if it contains a label",
    `
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
  `,
    `
    loop: for (; foo;) {
      switch (bar) {
        case 47:
      }
      switch (baz) {
        default:
          break loop;
      }
    }
  `
  );

  thePlugin(
    "should convert consequents in switch into sequence expressions",
    `
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
  `,
    `
    function bar() {
      switch (foo) {
        case 'foo':
          bar(), foo();

          break;
        case 'bar':
          return wow(), wo;

      }
    }
  `
  );

  thePlugin(
    "should convert switch statements to returns",
    `
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
  `,
    `
    function bar() {
      return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : 0;
    }
  `
  );

  thePlugin(
    "should convert switch statements with next return as default to returns",
    `
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
  `,
    `
    function bar() {
      return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : 0;
    }
  `
  );

  thePlugin(
    "if last statement in function should consider the default return a void",
    `
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
  `,
    `
    function bar() {
      return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : void 0;
    }
  `
  );

  /* eslint-disable max-len */
  thePlugin(
    "should convert switch statements w/ fallthrough to return",
    `
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
  `,
    `
    function bar() {
      return foo === 'foo' ? 1 : foo === foo.bar || foo === wow ? (wow(), 3) : foo === boo ? 4 : foo === baz || foo === wat ? 5 : 0;
    }
  `
  );
  /* eslint-enable max-len */

  thePlugin(
    "should convert non-return switch to conditionals",
    `
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
  `,
    `
    function bar() {
      foo === 'foo' ? foo() : foo === foo.bar ? (wow(), wat()) : foo === shh || foo === wow ? baa() : meh();
    }
  `
  );

  thePlugin(
    "should put sequence in switch test",
    `
    function bar() {
      wow();
      switch (foo) {
        case 'foo':
          throw x();
          break;
      }
    }
  `,
    `
    function bar() {
      switch (wow(), foo) {
        case 'foo':
          throw x();

      }
    }
  `
  );

  thePlugin(
    "should put sequence in if test",
    `
    function bar() {
      wow();
      if (foo) {
        throw x();
      }
    }
  `,
    `
    function bar() {
      if (wow(), foo) throw x();
    }
  `
  );

  thePlugin(
    "should convert non-return switch to conditionals",
    `
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
  `,
    `
    function bar() {
      foo === 'foo' ? foo() : foo === foo.bar ? (wow(), wat()) : foo === shh || foo === wow ? baa() : meh();
    }
  `
  );

  thePlugin(
    "should not change type",
    `
    function x(a) {
      return !!a;
    }
  `
  );

  thePlugin(
    "should not change type",
    `
    function x(a, b) {
      a = a || b;
      return b === a || !a;
    }
  `,
    `
    function x(a, b) {
      return a = a || b, b === a || !a;
    }
  `
  );

  thePlugin(
    "should apply unary to only the last element of a sequence expr",
    `
    !(a, b, c);
  `,
    `
    a, b, !c;
  `
  );

  thePlugin(
    "should apply unary to both sides of the conditional",
    `
    !(a ? b : c);
  `,
    `
    a ? !b : !c;
  `
  );

  thePlugin(
    "should flip alt and cons if condition is unary",
    `
    !(!a && b) ? b : c
  `,
    `
    !a && b ? c : b;
  `
  );

  thePlugin(
    "should merge previous expressions in the for loop right",
    `
    function foo() {
      x = 1;
      a();
      for (var a in b) wow();
    }
  `,
    `
    function foo() {
      for (var a in x = 1, a(), b) wow();
    }
  `
  );

  thePlugin(
    "should convert empty blocks to empty statements",
    `
    function foo() {
      for (i in p) {}
      for (; ;) {}
      switch(1) {}
      try { a } catch(e) {}
    }
  `,
    `
    function foo() {
      for (i in p);
      for (;;);
      switch (1) {}
      try {
        a;
      } catch (e) {}
    }
  `
  );

  thePlugin(
    "should flip binary expressions",
    `
    if (!(!a && b == a && !b && b < a)) for(;;) a();
  `,
    `
    if (a || b != a || b || !(b < a)) for (;;) a();
  `
  );

  // From UglifyJS
  thePlugin(
    "should simplify common conditional expression patterns",
    `
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
  `,
    `
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
  `
  );

  // From UglifyJS
  thePlugin.inEachLine(
    "should simplify logical expression of the following forms of && by compressing to the right",
    `
    a = true && foo
    a = 1 && console.log("asdf")
    a = 4 * 2 && foo()
    a = 10 == 10 && foo() + bar()
    a = "foo" && foo()
    a = 1 + "a" && foo / 10
    a = -1 && 5 << foo
    a = 6 && 10
    a = !NaN && foo()
  `,
    `
    a = foo;
    a = console.log("asdf");
    a = foo();
    a = foo() + bar();
    a = foo();
    a = foo / 10;
    a = 5 << foo;
    a = 10;
    a = foo();
  `
  );

  thePlugin.inEachLine(
    "should simplify logical expression of the following forms of && by compressing to the left",
    `
    a = false && bar
    a = NaN && console.log("a")
    a = 0 && bar()
    a = undefined && foo(bar)
    a = 3 * 3 - 9 && bar(foo)
    a = 9 == 10 && foo()
    a = !"string" && foo % bar
    a = 0 && 7
  `,
    `
    a = false;
    a = NaN;
    a = 0;
    a = undefined;
    a = 0;
    a = false;
    a = false;
    a = 0;
  `
  );
  thePlugin.inEachLine(
    "should not simplify invalid logical expression of the following forms of &&",
    `
    a = foo() && true;
    a = console.log && 3 + 8;
    a = foo + bar + 5 && "a";
    a = 4 << foo && -1.5;
    a = bar() && false;
    a = foo() && 0;
    a = bar() && NaN;
    a = foo() && null;
  `
  );

  thePlugin.inEachLine(
    "should simplify logical expression of the following forms of || by compressing to the left",
    `
    a = true     || condition;
    a = 1        || console.log("a");
    a = 2 * 3    || 2 * condition;
    a = 5 == 5   || condition + 3;
    a = "string" || 4 - condition;
    a = 5 + ""   || condition / 5;
    a = -4.5     || 6 << condition;
    a = 6        || 7;
  `,
    `
    a = true;
    a = 1;
    a = 6;
    a = true;
    a = "string";
    a = "5";
    a = -4.5;
    a = 6;
  `
  );

  thePlugin.inEachLine(
    "should simplify logical expression of the following forms of || by compressing to the right",
    `
    a = false     || condition;
    a = 0         || console.log("b");
    a = NaN       || console.log("c");
    a = undefined || 2 * condition;
    a = null      || condition + 3;
    a = 2 * 3 - 6 || 4 - condition;
    a = 10 == 7   || condition / 5;
    a = !"string" || 6 % condition;
    a = null      || 7;
  `,
    `
    a = condition;
    a = console.log("b");
    a = console.log("c");
    a = 2 * condition;
    a = condition + 3;
    a = 4 - condition;
    a = condition / 5;
    a = 6 % condition;
    a = 7;
  `
  );

  thePlugin.inEachLine(
    "should not simplify invald logical expression of the following forms of || by compressing to the right",
    `
    a = condition || true;
    a = console.log("a") || 2;
    a = 4 - condition || "string";
    a = 6 << condition || -4.5;
    a = condition || false;
    a = console.log("b") || NaN;
    a = console.log("c") || 0;
    a = 2 * condition || undefined;
    a = condition + 3 || null;
  `
  );

  thePlugin.inEachLine(
    "should transform complex logical expressions",
    `
    a = true && 1 && foo
    a = 1 && 4 * 2 && console.log("asdf")
    a = 4 * 2 && NaN && foo()
    a = 10 == 11 || undefined && foo() + bar() && bar()
    a = -1 && undefined || 5 << foo
  `,
    `
    a = foo;
    a = console.log("asdf");
    a = NaN;
    a = undefined;
    a = 5 << foo;
  `
  );

  // https://github.com/babel/minify/issues/115
  thePlugin(
    "should transform impure conditional statements correctly - issue#115",
    `
    (function () {
      a = x ? true : false;
      c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
    })();
  `,
    `
    (function () {
      a = !!x, c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
    })();
  `
  );

  thePlugin(
    "should require block for single block scoped declaration in if/else",
    `
    if (false) {
      let { a } = foo();
    } else if (true) {
      const x = bar();
    } else {
      function baz() {}
    }
  `
  );

  thePlugin.inEachLine(
    "should simplify assignments",
    `
    x = x + 1;
    x = x - 1;
    x = x * 1;
    x = x % 1;
    x = x << 1;
    x = x >> 1;
    x = x >>> 1;
    x = x & 1;
    x = x | 1;
    x = x ^ 1;
    x = x / 1;
    x = x ** 1;
  `,
    `
    ++x;
    --x;
    x *= 1;
    x %= 1;
    x <<= 1;
    x >>= 1;
    x >>>= 1;
    x &= 1;
    x |= 1;
    x ^= 1;
    x /= 1;
    x **= 1;
  `
  );

  thePlugin.inEachLine(
    "should not simplify assignments when it is not an equal operator",
    `
    x += x + 1;
    x -= x - 1;
    x *= x * 1;
    x %= x % 1;
    x <<= x << 1;
    x >>= x >> 1;
    x >>>= x >>> 1
    x &= x & 1;
    x |= x | 1;
    x ^= x ^ 1;
    x /= x / 1;
    x **= x ** 1;
  `,
    `
    x += x + 1;
    x -= x - 1;
    x *= x * 1;
    x %= x % 1;
    x <<= x << 1;
    x >>= x >> 1;
    x >>>= x >>> 1;
    x &= x & 1;
    x |= x | 1;
    x ^= x ^ 1;
    x /= x / 1;
    x **= x ** 1;
  `
  );

  thePlugin.inEachLine(
    "should not simplify assignments further when it is not an equal operator",
    `
    x = x + (x >> 1);
    x = x - (x >> 1);
    x = x * (x >> 1);
    x = x % (x >> 1);
    x = x << (x >> 1);
    x = x >> (x >> 1);
    x = x >>> (x >> 1);
    x = x & (x >> 1);
    x = x | (x >> 1);
    x = x ^ (x >> 1);
    x = x / (x >> 1);
    x = x ** (x >> 1);
  `,
    `
    x += x >> 1;
    x -= x >> 1;
    x *= x >> 1;
    x %= x >> 1;
    x <<= x >> 1;
    x >>= x >> 1;
    x >>>= x >> 1;
    x &= x >> 1;
    x |= x >> 1;
    x ^= x >> 1;
    x /= x >> 1;
    x **= x >> 1;
  `
  );

  thePlugin.inEachLine(
    "should simplify assignments 2",
    `
    foo = foo + bar;
    foo = foo * function(){};
    foo += 123;
    foo = 1 + foo;
    x = x = x + 1;
    foo = foo + bar + baz;
  `,
    `
    foo += bar;
    foo *= function () {};
    foo += 123;
    foo = 1 + foo;
    x = ++x;
    foo = foo + bar + baz;
  `
  );

  // TODO: foo[void 0] = foo[void 0] + 1;
  thePlugin.inEachLine(
    "should simplify assignments w. member expressions",
    `
    foo.bar = foo.bar + 1;
    foo.bar = foo.bar + 2;
    foo["x"] = foo[x] + 2;
    foo[x] = foo[x] + 2;
    foo[x] = foo["x"] + 2;
    foo["x"] = foo["x"] + 2;
    foo[1] = foo["1"] + 2;
    foo["bar"] = foo["bar"] + 2;
    foo[bar()] = foo[bar()] + 2;
    foo[""] = foo[""] + 2;
    foo[2] = foo[2] + 2;
    foo[{}] = foo[{}] + 1;
    foo[function(){}] = foo[function(){}] + 1;
    foo[false] = foo[false] + 1;
    foo.bar.baz = foo.bar.baz + 321;
    this.hello = this.hello + 1;
    foo[null] = foo[null] + 1;
    foo[undefined] = foo[undefined] + 1;
    foo.bar = foo.bar || {};
  `,
    `
    ++foo.bar;
    foo.bar += 2;
    foo["x"] = foo[x] + 2;
    foo[x] += 2;
    foo[x] = foo["x"] + 2;
    foo["x"] += 2;
    foo[1] += 2;
    foo["bar"] += 2;
    foo[bar()] = foo[bar()] + 2;
    foo[""] += 2;
    foo[2] += 2;
    foo[{}] = foo[{}] + 1;
    foo[function () {}] = foo[function () {}] + 1;
    ++foo[false];
    foo.bar.baz += 321;
    ++this.hello;
    ++foo[null];
    ++foo[undefined];
    foo.bar = foo.bar || {};
  `
  );

  thePlugin(
    "should simplify assignments w. super",
    `
    class Foo {
      foo() {
        super.foo = super.foo + 1;
      }
    };
  `,
    `
    class Foo {
      foo() {
        ++super.foo;
      }
    };
  `
  );

  thePlugin(
    "should not simplify assignments w. template literals",
    `
    foo[\`x\`] = foo[\`x\`] + 1;
  `
  );

  // TODO:
  // Fix indenting
  thePlugin(
    "should consider hoisted definitions in if_return",
    `
    function foo() {
      bar();
      if(x) return;
      const {a}=b;
      function bar () {
        baz();
        bar();
      }
    }
  `,
    `
    function foo() {
      function bar() {
        baz(), bar();
      }

      if (bar(), !x) {
          const { a } = b;
        }
    }
  `
  );

  thePlugin(
    "should optimize if..else..returns",
    `
    function foo() {
      if (a) {
        if (x) return;
        else return x;
      }
      const b = 1;
      return "doesn't matter if this is reached or not";
    }
  `,
    `
    function foo() {
      if (a) return x ? void 0 : x;
      const b = 1;
      return "doesn't matter if this is reached or not";
    }
  `
  );

  thePlugin(
    "should fix issue#281 with if..return",
    `
    function foo() {
      if (x)
        return;
      function bar() {}
      bar(a);
    }
  `,
    `
    function foo() {
      function bar() {}
      x || bar(a);
    }
  `
  );

  thePlugin(
    "should fix issue#323 with != and !==",
    `
    function foo() {
      var x, y;
      y = o[x];
      foo(y !== undefined);
    }
  `,
    `
    function foo() {
      var x, y;
      y = o[x], foo(y !== undefined);
    }
  `,
    {
      plugins: [plugin, comparisonPlugin]
    }
  );

  thePlugin(
    "should fix issue#423 with fallthrough in default case",
    `
    function foo(bar) {
      switch (bar) {
        case 'a':
          return 1;
        case 'b':
        default:
          return 4;
        case 'c':
          return 3;
      }
    }
  `,
    `
    function foo(bar) {
      return bar === 'a' ? 1 : bar === 'c' ? 3 : 4;
    }
  `
  );

  thePlugin(
    "should convert multiple fallthrough in switch to conditional expression",
    `
    function foo(bar) {
      switch (bar) {
        case 'a':
        case 'b':
          return 1;
        case 'd':
        default:
          return 4;
        case 'c':
          return 3;
      }
    }
  `,
    `
    function foo(bar) {
      return bar === 'a' || bar === 'b' ? 1 : bar === 'c' ? 3 : 4;
    }
  `
  );

  thePlugin(
    "should fix#455 and deopt when scope tree is not updated",
    `
    function foo(param) {
      if (param === null) return;
      let thingA = param.a;
      let thingB = param.b;
      if (!thingA && !thingB) return;
      let thingC = param.c;
    }
  `,
    `
    function foo(param) {
      if (param !== null) {
          let thingA = param.a;
          let thingB = param.b;
          if (thingA || thingB) {
              let thingC = param.c;
            }
        }
    }
  `
  );

  thePlugin(
    "should convert simple arrow block to expression",
    `
    const a = () => {return (3, 4);};
    const b = () => {return 3;};
  `,
    `
    const a = () => (3, 4);
    const b = () => 3;
  `
  );

  thePlugin(
    "should NOT convert empty arrow block to expression",
    `
    const a = () => {};
    const b = () => {return;};
  `,
    `
    const a = () => {};
    const b = () => {};
  `
  );

  thePlugin(
    "should NOT remove block for early continue transforms - fix issue#560",
    `
      function foo() {
        while (true) {
          const {x} = a;
          const {y} = b;
        }
      }
    `,
    `
      function foo() {
        for (; true;) {
          const { x } = a;
          const { y } = b;
        }
      }
    `
  );

  // TODO: issue-637
  thePlugin(
    "should NOT remove else block when ",
    `
      function test(a) {
        const clash = () => {};
        if (a) {
          return clash();
        } else {
          const clash = () => {};
          return clash();
        }
      }
    `,
    `
      function test(a) {
        const clash = () => {};
        if (a) return clash();else {
          const clash = () => {};
          return clash();
        }
      }
    `
  );
});
