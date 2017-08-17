jest.autoMockOff();

const envInliner = require("../src/index");
const thePlugin = require("../../../utils/test-transform")(envInliner);

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

  thePlugin(
    "should inline environment variables in the include when provided",
    `
    process.env.NODE_ENV
  `,
    `
    "development";
  `,
    {
      plugins: [[envInliner, { include: ["NODE_ENV"] }]]
    }
  );

  thePlugin(
    "should not inline environment variables if not present in the include when provided",
    `
    process.env.NODE_ENV;
  `,
    {
      plugins: [[envInliner, { include: ["CI"] }]]
    }
  );

  thePlugin(
    "should not inline environment variables if present in the exclude",
    `
      process.env.NODE_ENV;
    `,
    {
      plugins: [[envInliner, { exclude: ["NODE_ENV"] }]]
    }
  );

  afterAll(() => {
    process.env.NODE_ENV = prev;
  });
});
