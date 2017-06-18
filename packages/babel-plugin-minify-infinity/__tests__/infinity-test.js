jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("boolean-plugin", () => {
  thePlugin(
    "should convert infinity to division over 0",
    `
    Infinity;
  `,
    `
    1 / 0;
  `
  );

  thePlugin(
    "should not convert infinity when its a property",
    `
    var x = { Infinity: 0 };
    x.Infinity;
  `
  );

  thePlugin(
    "should not convert infinity if its a assignment expression",
    `
    Infinity = 1;
  `
  );

  thePlugin(
    "should not convert infinity when its destructed",
    `
    ({ Infinity } = 1);
    [Infinity] = foo;
    [...Infinity] = foo;
  `
  );

  thePlugin(
    "should not convert infinity when as a function params",
    `
    function a(Infinity) {}
    function a(...Infinity) {}
    function a({ Infinity }) {}
  `
  );
});
