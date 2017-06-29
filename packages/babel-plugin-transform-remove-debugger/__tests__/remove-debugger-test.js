jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("remove-debugger-plugin", () => {
  thePlugin(
    "should remove `debugger` statements",
    `
    debugger;
  `,
    `
  `
  );

  thePlugin(
    "should not remove non-`debugger` statements on the same line as the `debugger` statement",
    `
    debugger; 1;
  `,
    `
    1;
  `
  );

  thePlugin(
    "should add an empty block (`{}`) when the `debugger` statement was the only child of the block",
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
