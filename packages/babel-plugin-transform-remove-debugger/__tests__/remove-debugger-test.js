jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("remove-debugger-plugin", () => {
  thePlugin(
    "should remove debugger",
    `
    debugger;
  `,
    `
  `
  );

  thePlugin(
    "should remove debugger only",
    `
    debugger; 1;
  `,
    `
    1;
  `
  );

  thePlugin(
    "statement no block",
    `
    if (blah) debugger;
    for (;;) debugger;
    for (var blah in []) debugger;
    for (var blah of []) debugger;
    while (blah) debugger;
    do debugger; while (blah);
  `,
    `
    if (blah) {}
    for (;;) {}
    for (var blah in []) {}
    for (var blah of []) {}
    while (blah) {}
    do {} while (blah);
  `
  );
});
