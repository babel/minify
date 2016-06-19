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

  it('should simplify falsy logical expressions', function() {
    let source = unpad(`
      alert(0 && new Foo());
    `);
    let expected = unpad(`
      alert(0);
    `);
    expect(transform(source)).toBe(expected);

    source = unpad(`
      if (0 && something()) for(;;);
    `);
    expected = unpad(`
      if (0) for (;;);
    `);
    expect(transform(source)).toBe(expected);

    source = unpad(`
      alert(false && new Foo());
    `);
    expected = unpad(`
      alert(false);
    `);
    expect(transform(source)).toBe(expected);

    source = unpad(`
      alert(undefined && new Foo());
    `);
    expected = unpad(`
      alert(undefined);
    `);
    expect(transform(source)).toBe(expected);

    source = unpad(`
      alert(null && new Foo());
    `);
    expected = unpad(`
      alert(null);
    `);
    expect(transform(source)).toBe(expected);

    source = unpad(`
      alert("" && new Foo());
    `);
    expected = unpad(`
      alert("");
    `);
    expect(transform(source)).toBe(expected);
  });
});
