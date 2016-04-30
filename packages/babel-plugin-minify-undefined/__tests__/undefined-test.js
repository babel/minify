jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('undefined-plugin', () => {
  it('should turn undefined into void 0', () => {
    const source = 'undefined;';
    const expected = 'void 0;';
    expect(transform(source)).toBe(expected);
  });
});
