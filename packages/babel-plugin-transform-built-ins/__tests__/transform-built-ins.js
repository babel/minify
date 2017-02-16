jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");
const plugin = require("../src/index");

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe("transform-built-ins", () => {
  it("should transform standard built in methods", () => {
    const source = unpad(`
      Math.max(a, b) + Math.max(b, a)
    `);
    // Jest arranges in alphabetical order, So keeping it as _source
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should transform standard built in properties", () => {
    const source = unpad(`
      function a () {
        return Math.PI + Math.PI
      }
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should take no of occurences in to account", () => {
    const source = unpad(`
      function a() {
        return Math.floor(a) + Math.floor(b) + Math.min(a, b);
      }
      Math.floor(a) + Math.max(a, b);
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should collect and transform no matter any depth", () => {
    const source = unpad(`
      Math.max(a, b) + Math.max(a, b);
      function a (){
        Math.max(b, a);
        return function b() {
          const a = Math.floor(c);
          Math.min(b, a) * Math.floor(b);
        }
      }
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should not transform if its not a built in object", () => {
    const source = unpad(`
      Math.a(2, 1) + Math.a(1, 2);
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should evalaute expressions if applicable and optimize it", () => {
    const source = unpad(`
      const a = Math.max(Math.floor(2), 5);
      let b = 1.8;
      let x = Math.floor(Math.max(a, b));
      foo(x);
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should not evaluate if its has side effecty arguments", () => {
    const source = unpad(`
      Math.max(foo(), 1);
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

  it("should not transform for computed properties", () => {
    const source = unpad(`
      let max = "floor";
      Math[max](1.5);
    `);
    expect({_source: source, expected: transform(source)}).toMatchSnapshot();
  });

});
