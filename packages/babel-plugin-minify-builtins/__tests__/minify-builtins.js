jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code, {
    plugins: [plugin]
  }).code;
}

describe("minify-builtins", () => {
  it("should minify standard built in methods", () => {
    const source = unpad(
      `
      function c() {
        let a = 10;
        const d = Number.isNaN(a);
        Math.max(a, b) + Math.max(b, a);
        return d && Number.isFinite(a);
      }
    `
    );
    // Jest arranges in alphabetical order, So keeping it as _source
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should minify standard built in properties", () => {
    const source = unpad(
      `
      function a () {
        Number.NAN + Number.NAN;
        return Math.PI + Math.PI + Number.EPSILON + Number.NAN;
      }
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should take no of occurences in to account", () => {
    const source = unpad(
      `
      function a() {
        Math.floor(a) + Math.floor(b) + Math.min(a, b);
      }
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should collect and minify no matter any depth", () => {
    const source = unpad(
      `
      function a (){
        Math.max(b, a);
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
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("shouldn't minify builtins in the program scope to avoid leaking", () => {
    const source = unpad(
      `
      Math.max(c, d)
      function a (){
        Math.max(b, a) + Math.max(c, d);
      }
      Math.max(e, f)
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should minify builtins to method scope for class declarations", () => {
    const source = unpad(
      `
      class Test {
        foo() {
          Math.max(c, d)
          Math.max(c, d)
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
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should minify builtins to function scopes ", () => {
    const source = unpad(
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
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should collect and minify in segments in any depth if there is no LCA", () => {
    const source = unpad(
      `
      function b(){
        Math.floor(as, bb);
        function d(){
          Math.floor(as, bb);
        }
      }
      const a = {
        c : () => {
            Math.floor(bbb);
            Math.floor(bbb);
        },
        d : () => {
            Math.abs(aa);
            Math.abs(aa);
            Math.floor(aa);
            return () => {
              Math.floor(aa);
            }
        }
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
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should evalaute expressions if applicable and optimize it", () => {
    const source = unpad(
      `
      const a = Math.max(Math.floor(2), 5);
      let b = 1.8;
      let x = Math.floor(Math.max(a, b));
      foo(x);
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should not evaluate if its side effecty", () => {
    const source = unpad(
      `
      Math.max(foo(), 1);
      Math.random();
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });

  it("should not minify for computed properties", () => {
    const source = unpad(
      `
      let max = "floor";
      Math[max](1.5);
    `
    );
    expect({ _source: source, expected: transform(source) }).toMatchSnapshot();
  });
});
