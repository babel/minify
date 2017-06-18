jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("transform-member-expressions-literals-plugin", () => {
  thePlugin(
    "should work with string literals",
    `
    foo['bar'];
  `,
    `
    foo.bar;
  `
  );

  thePlugin(
    "should work with numbers",
    `
    foo['1'];
  `,
    `
    foo[1];
  `
  );

  thePlugin(
    "should not strip necessaary quotes for numeric like things",
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
