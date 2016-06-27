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
    const source = 'var foo;foo === undefined;';
    const expected = 'var foo;foo === void 0;';
    expect(transform(source)).toBe(expected);
  });

  it('should turn undefined into void 0 in a MemberExpression', () => {
    const source = 'var foo;foo === undefined.foo;';
    const expected = 'var foo;foo === (void 0).foo;';
    expect(transform(source)).toBe(expected);
  });
});
