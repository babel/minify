jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('type-constructors-plugin', () => {
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
});
