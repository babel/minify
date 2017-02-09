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
      Math.max(2, 1) + Math.max(1, 2)
    `);
    const expected = unpad(`
      var _temp = Math.max;
      _temp(2, 1) + _temp(1, 2);
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
        return Math.floor(1) + Math.floor(2) + Math.min(1, 2);
      }
      Math.floor(2, 1) + Math.sum(1, 2);
    `);
    const expected = unpad(`
      var _temp = Math.floor;
      function a() {
        return _temp(1) + _temp(2) + Math.min(1, 2);
      }
      _temp(2, 1) + Math.sum(1, 2);
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should collect and transform no matter any depth", () => {
    const source = unpad(`
      Math.max(2, 1) + Math.max(1, 2);
      function a (){
        Math.max(2, 1);
        return function b() {
          const a = Math.floor(1);
          Math.min(2, 1) * Math.floor(2);
        }
      }
    `);
    const expected = unpad(`
      var _temp2 = Math.floor;
      var _temp = Math.max;
      _temp(2, 1) + _temp(1, 2);
      function a() {
        _temp(2, 1);
        return function b() {
          const a = _temp2(1);
          Math.min(2, 1) * _temp2(2);
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

});
