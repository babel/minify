jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("numeric-literals", () => {
  thePlugin(
    "should shorten properly",
    `
    [10, 100, 1000, 10000, -2, -30000];
    [1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1];
    [0x000001, 0o23420, 0b10011100010000];
  `,
    `
    [10, 100, 1e3, 1e4, -2, -3e4];
    [1e3, -1e4, 1e-5, 1.5e12, 1.23456, .1];
    [1, 1e4, 1e4];
  `
  );

  // TODO: this seems to be specific to how Babel output numbers
  // for some reason it adds + in the beginning
  thePlugin.skip(
    "should have correct signs",
    `
    [+0.000000000001, -0.00000000001];
  `,
    `
    [+1e-12, -1e-11];
  `
  );
});
