jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("transform-regexp-constructors-plugin", () => {
  thePlugin(
    "should not duplicate forward-slash escapes",
    String.raw`
    var x = new RegExp('\\/');
  `,
    String.raw`
    var x = /\//;
  `
  );

  thePlugin(
    "should transform `\n` properly",
    String.raw`
    var x = new RegExp('\\n');
  `,
    String.raw`
    var x = /\n/;
  `
  );

  thePlugin(
    "should transform unicode newlines properly",
    String.raw`
    var x = new RegExp('\u2028\u2029');
  `,
    String.raw`
    var x = /\u2028\u2029/;
  `
  );

  thePlugin(
    "should transform RegExp constructors with string literals",
    `
    var x = new RegExp('ab+c');
  `,
    `
    var x = /ab+c/;
  `
  );

  thePlugin(
    "should transform RegExp calls with string literals",
    `
    var x = RegExp('ab+c');
  `,
    `
    var x = /ab+c/;
  `
  );

  thePlugin(
    "should transform RegExp constructors with flags",
    `
    var x = new RegExp('ab+c', 'gimuy');
  `,
    `
    var x = /ab+c/gimuy;
  `
  );

  thePlugin(
    "should transform RegExp escapes",
    String.raw`
    var x = new RegExp('\\w+\\s');
  `,
    String.raw`
    var x = /\w+\s/;
  `
  );

  thePlugin(
    "should not transform RegExp constructors with expressions",
    `
    var x = new RegExp(foo(), 'g');
  `
  );

  thePlugin(
    "should transform RegExp constructor with no arguments into `/(?:)/`",
    `
    var x = new RegExp();
  `,
    `
    var x = /(?:)/;
  `
  );

  thePlugin(
    "should transform RegExp constructor with an empty string argument into `/(?:)/`",
    `
    var x = new RegExp('');
  `,
    `
    var x = /(?:)/;
  `
  );

  thePlugin(
    "should resolve expressions and const references in the constructor",
    String.raw`
    const foo = "ab+";
    const bar = "c\\w";
    const flags = "g";
    const ret = new RegExp(foo + bar + "d", flags);
  `,
    String.raw`
    const foo = "ab+";
    const bar = "c\\w";
    const flags = "g";
    const ret = /ab+c\wd/g;
  `
  );

  thePlugin(
    "should prettify special whitespaces",
    String.raw`
    var x = new RegExp('\b\f\v\t\r\n\n');
  `,
    String.raw`
    var x = /[\b]\f\v	\r\n\n/;
  `
  );

  thePlugin(
    "should escape forward slashes",
    String.raw`
    var x = new RegExp('/x/');
  `,
    String.raw`
    var x = /\/x\//;
  `
  );
});
