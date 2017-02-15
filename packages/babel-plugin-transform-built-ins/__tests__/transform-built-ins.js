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
    const expected = unpad(`
      var _temp = Math.max;
      _temp(a, b) + _temp(b, a);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should transform standard built in properties", () => {
    const source = unpad(`
      function a () {
        return Math.PI + Math.PI
      }
    `);
    const expected = unpad(`
      var _temp = Math.PI;
      function a() {
        return _temp + _temp;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should take no of occurences in to account", () => {
    const source = unpad(`
      function a() {
        return Math.floor(a) + Math.floor(b) + Math.min(a, b);
      }
      Math.floor(a) + Math.max(a, b);
    `);
    const expected = unpad(`
      var _temp = Math.floor;
      function a() {
        return _temp(a) + _temp(b) + Math.min(a, b);
      }
      _temp(a) + Math.max(a, b);
    `);
    expect(transform(source)).toBe(expected);
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
    const expected = unpad(`
      var _temp2 = Math.floor;
      var _temp = Math.max;
      _temp(a, b) + _temp(a, b);
      function a() {
        _temp(b, a);
        return function b() {
          const a = _temp2(c);
          Math.min(b, a) * _temp2(b);
        };
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should not transform if its not a built in object", () => {
    const source = unpad(`
      Math.a(2, 1) + Math.a(1, 2);
    `);
    expect(transform(source)).toBe(source);
  });

  it("should evalaute expressions if applicable and optimize it", () => {
    const source = unpad(`
      const a = Math.max(Math.floor(2), 5);
      let b = 1.8;
      let x = Math.floor(Math.max(a, b));
      foo(x);
    `);

    const expected = unpad(`
      const a = 5;
      let b = 1.8;
      let x = 5;
      foo(x);
    `);
    expect(transform(source)).toBe(expected);
  });

});
