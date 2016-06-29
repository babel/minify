jest.autoMockOff();

const babel = require('babel-core');
const plugin = require('../src/index');
const unpad = require('../../../utils/unpad');

function transform(code) {
  return babel.transform(code,  {
    plugins: [plugin],
  }).code;
}

describe('remove-console-plugin', () => {
  it('statement-nested', () => {
    const source = unpad(`
      function foo() {
        console.log("foo");
        blah();
      }
    `);

    const expected = unpad(`
      function foo() {
        blah();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it('expression-nested', () => {
    const source = unpad(`
      function foo() {
        true && console.log("foo");
        blah();
      }
    `);

    const expected = unpad(`
      function foo() {
        true;
        blah();
      }
    `);
    expect(transform(source)).toBe(expected);
  });

  it('expression-top-level', () => {
    const source = unpad(`
      true && console.log("foo");
      blah();
    `);

    const expected = unpad(`
      true;
      blah();
    `);
    expect(transform(source)).toBe(expected);
  });

  it('statement-top-level', () => {
    const source = unpad(`
      console.log("foo");
      blah();
    `);

    const expected = unpad(`
      blah();
    `);
    expect(transform(source).trim()).toBe(expected);
  });
});
