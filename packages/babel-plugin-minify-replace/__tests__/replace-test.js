jest.autoMockOff();

const replacer = require("../src/index");

const theTester = require("../../../utils/test-transform")(replacer);
function thePlugin(name, source, expected, ...replacements) {
  if (typeof expected === "object") {
    replacements.unshift(expected);
    expected = source;
  }
  theTester(name, source, expected, {
    plugins: [[replacer, { replacements }]]
  });
}
thePlugin.skip = theTester.skip();

describe("replace-plugin", () => {
  thePlugin(
    "should replace identifiers",
    `
    if (__DEV__) {
      foo();
    }
    if (!__DEV__) {
      foo();
    }
  `,
    `
    if (0) {
      foo();
    }
    if (!0) {
      foo();
    }
  `,
    {
      identifierName: "__DEV__",
      replacement: {
        type: "numericLiteral",
        value: 0
      }
    }
  );

  thePlugin(
    "should only replace actual full identifiers",
    `
    if (__DEV__) {
      foo();
    }
    if (a.__DEV__) {
      foo();
    }
  `,
    `
    if (0) {
      foo();
    }
    if (a.__DEV__) {
      foo();
    }
  `,
    {
      identifierName: "__DEV__",
      replacement: {
        type: "numericLiteral",
        value: 0
      }
    }
  );

  thePlugin(
    "should replace with boolean",
    `
    if (__DEV__) {
      foo();
    }
  `,
    `
    if (true) {
      foo();
    }
  `,
    {
      identifierName: "__DEV__",
      replacement: {
        type: "booleanLiteral",
        value: true
      }
    }
  );

  thePlugin(
    "should replace member expressions",
    `
    console.log('wat');
    (console.log)('wat');
  `,
    `
    emptyFunction('wat');
    emptyFunction('wat');
  `,
    {
      identifierName: "console",
      member: "log",
      replacement: {
        type: "identifier",
        value: "emptyFunction"
      }
    }
  );

  thePlugin(
    "should replace multiple member expressions",
    `
    console.log('wat');
    (console.log)('wat');
    console.error('wat');
  `,
    `
    emptyFunction('wat');
    emptyFunction('wat');
    emptyFunction('wat');
  `,
    {
      identifierName: "console",
      member: "log",
      replacement: {
        type: "identifier",
        value: "emptyFunction"
      }
    },
    {
      identifierName: "console",
      member: "error",
      replacement: {
        type: "identifier",
        value: "emptyFunction"
      }
    }
  );
});
