jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("boolean-plugin", () => {
  thePlugin(
    "should shorten bool",
    `
    true; false;
  `,
    `
    !0;!1;
  `
  );
});
