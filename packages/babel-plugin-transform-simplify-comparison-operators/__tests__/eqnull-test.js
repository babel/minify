jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("simplify-comparison-operators-plugin", () => {
  thePlugin("should shorten `x == undefined`", `
    x == undefined;
  `, `
    x == null;
  `);

  thePlugin("should shorten `x == void 0`", `
    x == void 0;
  `, `
    x == null;
  `);

  thePlugin("should not shorten `x === undefined`", `
    x === undefined;
  `);
});
