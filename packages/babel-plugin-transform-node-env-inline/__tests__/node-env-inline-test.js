jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("node-env-inline-plugin", () => {
  let prev;
  beforeAll(() => {
    prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
  });

  thePlugin(
    "should inline checks for `process.env.NODE_ENV = 'foo'`",
    `
    process.env.NODE_ENV === "development";
  `,
    `
    true;
  `
  );

  afterAll(() => {
    process.env.NODE_ENV = prev;
  });
});
