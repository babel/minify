jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("flip-comparisons", () => {
  thePlugin(
    "should merge two conditionals if they share the same consequent",
    `
    x === null ? undefined : x === undefined ? undefined : x ? foo(x) : wat();
  `,
    `
    null === x ? undefined : x === undefined ? undefined : x ? foo(x) : wat();
  `
  );

  thePlugin(
    "should put values first in binary expressions",
    `
    a === 1;
  `,
    `
    1 === a;
  `
  );

  thePlugin(
    "should put constants first in binary expressions",
    `
    a === -1;
  `,
    `
    -1 === a;
  `
  );

  thePlugin(
    "should put pures first in binary expressions",
    `
    a === null;

    a === {};

    function foo() {
      if (foo !== null) {
        var bar;
        bar = baz;
      }
      x();
      return x;
    }
  `,
    `
    null === a;

    ({}) === a;

    function foo() {
      if (null !== foo) {
        var bar;
        bar = baz;
      }
      x();
      return x;
    }
  `
  );

  thePlugin(
    "should put constants first in binary expressions",
    `
    x * 100;
    x + 100;
    x - 100;
    x / 100;
    x > 100;
    x === void 0;
  `,
    `
    100 * x;
    x + 100;
    x - 100;
    x / 100;
    100 < x;
    void 0 === x;
  `
  );
});
