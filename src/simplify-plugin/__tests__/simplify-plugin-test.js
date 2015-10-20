jest.autoMockOff();

const babel = require('babel-core');

function transform(code) {
  return babel.transform(code,  {
    plugins: [require('../index')],
    blacklist: ['strict'],
  }).code;
}

function unpad(str) {
  const lines = str.split('\n');
  const m = lines[1] && lines[1].match(/^\s+/);
  if (!m) {
    return str;
  }
  const spaces = m[0].length;
  return lines.map(
    line => line.slice(spaces)
  ).join('\n').trim();
}

describe('simplify-plugin', () => {
  it('should turn undefined into void 0', () => {
    const expected = 'void 0';
    const source = 'undefined';
    expect(transform(source)).toBe(expected);
  });

  it('should strip unnecessary property literal qoutes', () => {
    const expected = `var x = { foo: 'bar' };`;
    const source = `var x = { 'foo': 'bar' };`;
    expect(transform(source)).toBe(expected);
  });
});
