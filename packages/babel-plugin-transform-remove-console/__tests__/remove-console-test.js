jest.autoMockOff();

const babel = require("babel-core");
const plugin = require("../src/index");
const unpad = require("../../../utils/unpad");
const thePlugin = require("../../../utils/test-transform")(plugin);

describe("remove-console-plugin", () => {
  thePlugin(
    "should remove `console.*` calls in nested statements",
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
    "should remove `console.*` calls in nested expressions",
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
    "should remove `console.*` calls in top-level expressions",
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
    "should remove `console.*` calls in top-level statements",
    `
    console.log("foo");
    blah();
  `,
    `
    blah();
  `
  );

  thePlugin(
    "should remove `console.*` calls in statements not surrounded by a block",
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
    "should remove `console.*` assignments to other variables and replace them with empty functions",
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
    "should NOT remove local bindings of the name `console`",
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
    "should convert assigments from `console` functions to a no-op",
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

describe("remove-console-plugin with excludes argument", () => {
  const options = {
    exclude: ["error", "info"]
  };

  it("should not remove excluded options", () => {
    const source = unpad(
      `
      function foo() {
        console.log("foo");
        console.error("bar");
        blah();
        console.info("blah");
      }
    `
    );
    const output = unpad(
      `
      function foo() {
        console.error("bar");
        blah();
        console.info("blah");
      }
    `
    );
    expect(
      babel.transform(source, {
        plugins: [[plugin, options]]
      }).code
    ).toBe(output);
  });
  it("should not remove bound excluded options", () => {
    const source = unpad(
      `
      function foo() {
        const a = console.log;
        a();
        const b = console.error.bind(console);
        b("asdf");
        blah();
      }
    `
    );
    const output = unpad(
      `
      function foo() {
        const a = function () {};
        a();
        const b = console.error.bind(console);
        b("asdf");
        blah();
      }
    `
    );
    expect(
      babel.transform(source, {
        plugins: [[plugin, options]]
      }).code
    ).toBe(output);
  });
});
