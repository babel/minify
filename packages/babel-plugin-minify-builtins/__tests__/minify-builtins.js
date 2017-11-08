jest.autoMockOff();

const thePlugin = require("test-transform").snapshot(require("../src/index"));

describe("minify-builtins", () => {
  thePlugin(
    "should minify standard built in methods",
    `
    function c() {
      let a = 10;
      const d = Number.isNaN(a);
      Math.max(a, b) + Math.max(b, a);
      return d && Number.isFinite(a);
    }
  `
  );

  thePlugin(
    "should minify standard built in properties",
    `
    function a () {
      Number.NAN + Number.NAN;
      return Math.PI + Math.PI + Number.EPSILON + Number.NAN;
    }
  `
  );

  thePlugin(
    "should take no of occurences in to account",
    `
    function a() {
      Math.floor(a) + Math.floor(b) + Math.min(a, b);
    }
  `
  );

  thePlugin(
    "should collect and minify no matter any depth",
    `
    function a (){
      Math.max(c, a);
      const b = () => {
        const a = Math.floor(c);
        Math.min(b, a) * Math.floor(b);
        function c() {
          Math.floor(c) + Math.min(b, a)
        }
      }
    }
  `
  );

  thePlugin(
    "shouldn't minify builtins in the program scope to avoid leaking",
    `
    Math.max(c, d)
    function a (){
      Math.max(b, a) + Math.max(c, d);
    }
    Math.max(e, f)
  `
  );

  thePlugin(
    "should minify builtins to method scope for class declarations",
    `
    class Test {
      foo() {
        Math.max(a, d)
        Math.max(a, d)
        const c = function() {
          Math.max(c, d)
          Math.floor(m);
          Math.floor(m);
        }
      }
      bar() {
        Math.min(c, d)
        Math.min(c, d)
      }
    }
  `
  );

  thePlugin(
    "should minify builtins to function scopes ",
    `
    var a = () => {
      Math.floor(b);
      Math.floor(b);
      c: () => {
        Math.floor(d);
        Math.max(2,1);
      }
    }
    A.b("asdas", function() {
      Math.floor(d) + Math.max(d,e);
      Math.max(e,d);
    })
    A.b("asdas1", function() {
      Math.floor(d) + Math.floor(d,e);
      Math.max(e,d);
    })
  `
  );

  thePlugin(
    "should collect and minify in segments in any depth if there is no LCA",
    `
    function b(){
      Math.floor(as, bb);
      function d(){
        Math.floor(as, bb);
      }
    }
    const a = {
      c : () => Math.floor(bbb) + Math.floor(bbb) ,
      d : () => {
          Math.abs(aa);
          Math.abs(aa);
          Math.floor(aa);
          return () => {
            Math.floor(aa);
          }
      },
      e : () => Math.abs(aa) + Math.abs(aa)
    };
    class A {
      constructor() {
        let a = Math.floor(b,c) + Math.floor(b,c);
      }
      c() {
          Math.floor(asdas);
          Math.floor(dasda);
      }
      d() {
        var a = Math.floor;
          a(aa, bb);
          Math.floor(aa, bb);
      }
    };
    new A()
  `
  );

  thePlugin(
    "should evalaute expressions if applicable and optimize it",
    `
    const a = Math.max(Math.floor(2), 5);
    let b = 1.8;
    let x = Math.floor(Math.max(a, b));
    foo(x);
  `
  );

  thePlugin(
    "should not evaluate if its side effecty",
    `
    Math.max(foo(), 1);
    Math.random();
  `
  );

  thePlugin(
    "should not minify for computed properties",
    `
    let max = "floor";
    Math[max](1.5);
  `
  );

  thePlugin(
    "should not minify for arrow fn without block statment",
    `
    const a = () => Math.floor(b) + Math.floor(b);
  `
  );
});
