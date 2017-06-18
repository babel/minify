jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("simplify-comparison-operators-plugin", () => {
  thePlugin(
    "should simplify comparison",
    `
    'function' === typeof a;
  `,
    `
    'function' == typeof a;
  `
  );

  thePlugin(
    "should simplify comparison operations",
    `
    null === null;
  `,
    `
    null == null;
  `
  );

  thePlugin(
    "should comparison operations 2",
    `
    var x = null;
    x === null;
  `,
    `
    var x = null;
    x == null;
  `
  );

  thePlugin(
    "should not simplify comparison",
    `
    var x;
    x === null;
  `
  );

  thePlugin(
    "should not simplify comparison 2",
    `
    var x;
    if (wow) x = foo();
    x === null;
  `
  );

  thePlugin(
    "should not simplify comparison if already simplified",
    `
    typeof 1 == "number";
  `
  );

  thePlugin(
    "should not simplify comparison if not equality check",
    `
    a > b;
  `
  );
});
