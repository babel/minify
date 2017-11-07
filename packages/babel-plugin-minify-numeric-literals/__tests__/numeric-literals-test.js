jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("numeric-literals", () => {
  thePlugin(
    "should shorten integer literals correctly",
    `
    [1, 10, 100, 1000, 10000, -1, -10, -100, -1000, -10000];
    [0x1, 0xa, 0x64, 0x3e8, 0xfffffff, -0x1, -0xa, -0x64, -0x3e8, -0xfffffff];
    [0o1, 0o12, 0o144, 0o1750, -0o1, -0o12, -0o144, -0o1750];
    [0b1, 0b1010, 0b1100100, 0b1111101000, -0b1, -0b1010, -0b1100100, -0b1111101000]
  `,
    `
    [1, 10, 100, 1e3, 1e4, -1, -10, -100, -1e3, -1e4];
    [1, 10, 100, 1e3, 0xfffffff, -1, -10, -100, -1e3, -0xfffffff];
    [1, 10, 100, 1e3, -1, -10, -100, -1e3];
    [1, 10, 100, 1e3, -1, -10, -100, -1e3];
  `
  );

  thePlugin(
    "should shorten floats correctly",
    `
    [.123456, 1.23456, 12.3456, -0.123456, -1.23456, -12.3456];
    [0.10, 0.010, 0.0010];
  `,
    `
    [.123456, 1.23456, 12.3456, -.123456, -1.23456, -12.3456];
    [.1, .01, .001];
  `
  );

  thePlugin(
    "should shorten existing exponential literals correctly",
    `
    [1e1, 1e2, 1.5e3, -1e1, -1e2, -1.5e3, 1e-1, 1e-2, 1.5e-3, 1e-4];
    [1.5e4, 15e-2, 1.5e-4];
  `,
    `
    [10, 1e2, 1500, -10, -1e2, -1500, .1, .01, .0015, 1e-4];
    [15e3, .15, 15e-5];
  `
  );

  thePlugin(
    "should represent literals in exponential form when optimal",
    `
    [123000, 12345600000];
  `,
    `
    [123e3, 123456e5];
  `
  );

  // TODO: this seems to be specific to how Babel output numbers
  // for some reason it adds + in the beginning
  thePlugin.skip(
    "should handle extreme float resolution correctly",
    `
    [+0.000000000001, -0.00000000001];
  `,
    `
    [+1e-12, -1e-11];
  `
  );
});
