jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('boolean-plugin', () => {
  it('should shorten bool', () => {
    const source = 'true; false;';
    const expected = '!0;!1;';
    expect(transform(source)).toBe(expected);
  });
});
