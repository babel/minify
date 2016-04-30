jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');
const unpad = require('../../../utils/unpad');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('guarded-expressions-plugin', () => {
  it('should flip logical expressions', () => {
    const source = unpad(`
      !x && foo();
    `);

    const expected = unpad(`
      x || foo();
    `);

    expect(transform(source).trim()).toBe(expected.trim());
  });
});
