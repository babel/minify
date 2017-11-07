jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("minify-infinity", () => {
  thePlugin(
    "should convert Infinity to division over 0",
    `
    Infinity;
  `,
    `
    1 / 0;
  `
  );

  thePlugin(
    "should not convert Infinity when it’s a property",
    `
    var x = { Infinity: 0 };
    x.Infinity;
  `
  );

  thePlugin(
    "should not convert Infinity if it’s a assignment expression",
    `
    Infinity = 1;
  `
  );

  thePlugin(
    "should not convert Infinity when it’s destructed",
    `
    ({ Infinity } = 1);
    [Infinity] = foo;
    [...Infinity] = foo;
  `
  );

  thePlugin(
    "should not convert Infinity when as a function params",
    `
    function a(Infinity) {}
    function a(...Infinity) {}
    function a({ Infinity }) {}
  `
  );
});
