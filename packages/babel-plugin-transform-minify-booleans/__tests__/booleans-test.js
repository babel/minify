jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("boolean-plugin", () => {
  thePlugin(
    "should shorten `true` and `false` to `!0` and `!1`, repsectively",
    `
    true; false;
  `,
    `
    !0;!1;
  `
  );
});
