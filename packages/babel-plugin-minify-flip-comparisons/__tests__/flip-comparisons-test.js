jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');
const unpad = require('../../../utils/unpad');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('boolean-plugin', () => {
  it('should put values first in binary expressions', () => {
    const source = 'a === 1;';
    const expected = '1 === a;';
    expect(transform(source)).toBe(expected);
  });

  it('should put constants first in binary expressions', () => {
    const source = 'a === -1;';
    const expected = '-1 === a;';
    expect(transform(source)).toBe(expected);
  });

  it('should put pures first in binary expressions 2', () => {
    const source = 'a === null;';
    const expected = 'null === a;';
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
        x();
        return x;
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it('should put pures first in binary expressions 2', () => {
    const source = 'a === {};';
    const expected = '({}) === a;';
    expect(transform(source)).toBe(expected);
  });

  it('should put constants first', () => {
    const source = unpad(`
      x * 100;
      x + 100;
      x - 100;
      x / 100;
      x > 100;
      x === void 0;
    `);

    const expected = unpad(`
      100 * x;
      x + 100;
      x - 100;
      x / 100;
      100 < x;
      void 0 === x;
    `);

    expect(transform(source)).toBe(expected);
  });
});
