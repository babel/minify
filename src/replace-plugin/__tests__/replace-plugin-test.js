jest.autoMockOff();

const babel = require('babel-core');

function transform(code, replacements) {
  return babel.transform(code,  {
    plugins: [
      [require('../index'), {replacements}],
    ],
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

describe('replace-plugin', () => {
  it('should replace identifiers', () => {
    const replacements = [
      {
        identifierName: '__DEV__',
        replacement: {
          type: 'numericLiteral',
          value: 0,
        },
      },
    ];

    const source = unpad(`
      if (__DEV__) {
        foo();
      }
      if (!__DEV__) {
        foo();
      }
    `);

    const expected = unpad(`
      if (0) {
        foo();
      }
      if (!0) {
        foo();
      }
    `);

    expect(transform(source, replacements)).toBe(expected);
  });

  it('should only replace actual full identifiers', () => {
    const replacements = [
      {
        identifierName: '__DEV__',
        replacement: {
          type: 'numericLiteral',
          value: 0,
        },
      },
    ];

    const source = unpad(`
      if (__DEV__) {
        foo();
      }
      if (a.__DEV__) {
        foo();
      }
    `);

    const expected = unpad(`
      if (0) {
        foo();
      }
      if (a.__DEV__) {
        foo();
      }
    `);

    expect(transform(source, replacements)).toBe(expected);
  });

  it('should replace with boolean', () => {
    const replacements = [
      {
        identifierName: '__DEV__',
        replacement: {
          type: 'booleanLiteral',
          value: true,
        },
      },
    ];

    const source = unpad(`
      if (__DEV__) {
        foo();
      }
    `);

    const expected = unpad(`
      if (true) {
        foo();
      }
    `);

    expect(transform(source, replacements)).toBe(expected);
  });

  it('should replace member expressions', () => {
    const replacements = [
      {
        identifierName: 'console',
        member: 'log',
        replacement: {
          type: 'identifier',
          value: 'emptyFunction',
        },
      },
    ];

    const source = unpad(`
      console.log('wat');
      (console.log)('wat');
    `);

    const expected = unpad(`
      emptyFunction('wat');
      emptyFunction('wat');
    `);

    expect(transform(source, replacements)).toBe(expected);
  });
});
