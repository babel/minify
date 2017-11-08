jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("simplify-comparison-operators-plugin", () => {
  thePlugin(
    "should simplify `typeof` comparisons",
    `
    'function' === typeof a;
  `,
    `
    'function' == typeof a;
  `
  );

  thePlugin(
    "should simplify `== null` comparison operations where possible",
    `
    null === null;
    var x = null;
    x === null;
  `,
    `
    null == null;
    var x = null;
    x == null;
  `
  );

  thePlugin(
    "should not simplify comparisons where losing the third = would change the result",
    `
    var x;
    x === null;
    if (wow) x = foo();
    x === null;
  `
  );

  thePlugin(
    "should not simplify comparison if it is already simplified",
    `
    typeof 1 == "number";
  `
  );

  thePlugin(
    "should not simplify comparison if it is not an equality check",
    `
    a > b;
  `
  );
});
