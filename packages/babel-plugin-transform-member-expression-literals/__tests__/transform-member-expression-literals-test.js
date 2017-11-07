jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("transform-member-expressions-literals-plugin", () => {
  thePlugin(
    "should minify string literals to dot notation",
    `
    foo['bar'];
  `,
    `
    foo.bar;
  `
  );

  thePlugin(
    "should minify numbers as strings to actual numbers",
    `
    foo['1'];
  `,
    `
    foo[1];
  `
  );

  thePlugin(
    "should not strip necessaary quotes for numbers with leading zeroes",
    `
    data['00'] = 5;
  `
  );

  thePlugin(
    "should not transform invalid identifiers",
    `
      foo["default"];
      foo["import"];
    `
  );

  thePlugin(
    "should not transform non-string properties",
    `
    foo[a];
  `
  );

  thePlugin(
    "should not transform literals that are not computed",
    `
    foo.bar;
  `
  );
});
