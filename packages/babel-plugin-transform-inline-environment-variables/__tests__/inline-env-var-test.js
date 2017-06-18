jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("inline-env-plugin", () => {
  let prev;
  beforeAll(() => {
    prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
  });

  thePlugin(
    "should inline environment variables",
    `
    process.env.NODE_ENV
  `,
    `
    "development";
  `
  );

  afterAll(() => {
    process.env.NODE_ENV = prev;
  });
});
