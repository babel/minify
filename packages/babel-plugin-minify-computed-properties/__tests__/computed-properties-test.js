jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('computed-properties-plugin', () => {
  it('should strip unnecessary property literal qoutes', () => {
    const source = 'var x = { \'foo\': \'bar\' };';
    const expected = 'var x = { foo: \'bar\' };';
    expect(transform(source)).toBe(expected);
  });

  it('should strip unnecessary property literal qoutes for numbers', () => {
    const source = 'var x = { \'1\': \'bar\' };';
    const expected = 'var x = { 1: \'bar\' };';
    expect(transform(source)).toBe(expected);
  });
});
