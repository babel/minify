jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');
const unpad = require('../../../utils/unpad');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('type-constructors-plugin', () => {
  it('should turn Boolean(x) to !!x', () => {
    const source = 'Boolean(x);';
    const expected = '!!x;';
    expect(transform(source)).toBe(expected);
  });

  it('should turn Number(x) to +x', () => {
    const source = 'Number(x);';
    const expected = '+x;';
    expect(transform(source)).toBe(expected);
  });

  it('should turn String(x) to x + \'\'', () => {
    const source = 'String(x);';
    const expected = 'x + "";';
    expect(transform(source)).toBe(expected);
  });

  it('shouldn\'t change referenced identifiers', () => {
    const source = unpad(`
      (function (Boolean, String, Number) {
        return Boolean(a), String(b), Number(c);
      })(MyBoolean, MyString, MyNumber);
    `);
    const expected = unpad(`
      (function (Boolean, String, Number) {
        return Boolean(a), String(b), Number(c);
      })(MyBoolean, MyString, MyNumber);
    `);
    expect(transform(source)).toBe(expected);
  });
});
