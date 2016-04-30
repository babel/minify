jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('computed-member-expressions-plugin', () => {
  it('should work with string literals', () => {
    const source = 'foo[\'bar\'];';
    const expected = 'foo.bar;';
    expect(transform(source)).toBe(expected);
  });

  it('should work with numbers', () => {
    const source = 'foo[\'1\'];';
    const expected = 'foo[1];';
    expect(transform(source)).toBe(expected);
  });
});
