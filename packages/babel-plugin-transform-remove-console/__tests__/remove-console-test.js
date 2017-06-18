jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("remove-console-plugin", () => {
  thePlugin(
    "statement-nested",
    `
    function foo() {
      console.log("foo");
      blah();
    }
  `,
    `
    function foo() {
      blah();
    }
  `
  );

  thePlugin(
    "expression-nested",
    `
    function foo() {
      true && console.log("foo");
      blah();
    }
  `,
    `
    function foo() {
      true && void 0;
      blah();
    }
  `
  );

  thePlugin(
    "expression-top-level",
    `
    true && console.log("foo");
    blah();
  `,
    `
    true && void 0;
    blah();
  `
  );

  thePlugin(
    "statement-top-level",
    `
    console.log("foo");
    blah();
  `,
    `
    blah();
  `
  );

  thePlugin(
    "statement no block",
    `
    if (blah) console.log(blah);
    for (;;) console.log(blah);
    for (var blah in []) console.log(blah);
    for (var blah of []) console.log(blah);
    while (blah) console.log(blah);
    do console.log(blah); while (blah);
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

  thePlugin(
    "should remove console.* assignments to other variables",
    `
    const a = console.log;
    a();
    const b = console.log.bind(console);
    b("asdf");
    var x = console.log ? console.log('log') : foo();
    function foo() {
      if (console.error) {
        console.error("Errored");
      }
    }
    console.log.call(console, "foo");
    console.log.apply(null, {});
  `,
    `
    const a = function () {};
    a();
    const b = function () {};
    b("asdf");
    var x = function () {} ? void 0 : foo();
    function foo() {
      if (function () {}) {}
    }
  `
  );

  thePlugin(
    "should NOT remove local bindings of name console",
    `
    function foo(console) {
      console.foo("hi");
      const bar = console.foo.bind(console);
    }
    function bar(a) {
      const { console } = a;
      a.b = console => console.bar("bar");
      if (console.foo.call(console, "bar")) {
        return;
      }
    }
  `
  );

  thePlugin(
    "should convert assigments to no-op",
    `
    function foo() {
      console.foo = function foo() {
        console.log("foo");
      };
      console.error = myConsoleError;
      console.foo();
      console.error("asdf");
    }
  `,
    `
    function foo() {
      console.foo = function () {};
      console.error = function () {};
    }
  `
  );
});
