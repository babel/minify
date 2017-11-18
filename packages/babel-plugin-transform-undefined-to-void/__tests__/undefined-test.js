jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("undefined-plugin", () => {
  thePlugin(
    "should turn `undefined` into `void 0`",
    `
    var foo;foo === undefined;
  `,
    `
    var foo;foo === void 0;
  `
  );

  thePlugin(
    "should turn `undefined` into `void 0` in a MemberExpression",
    `
    var foo;foo === undefined.foo;
  `,
    `
    var foo;foo === (void 0).foo;
  `
  );
});
