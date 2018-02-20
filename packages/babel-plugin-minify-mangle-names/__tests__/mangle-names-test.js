jest.autoMockOff();

const mangler = require("../src/index");
const thePlugin = require("test-transform")(mangler);

describe("mangle-names", () => {
  thePlugin(
    "should NOT mangle name arguments",
    `
      (function () {
        var arguments = void 0;
        (function () {
          console.log(arguments);
        })("argument");
      })();
    `
  );

  thePlugin(
    "should handle eval scopes",
    `
      function eval() {}
      function foo() {
        var bar = 1;
        eval("...");
      }
    `,
    `
      function eval() {}
      function foo() {
        var a = 1;
        eval("...");
      }
    `
  );
});
