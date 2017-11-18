jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("transform-remove-undefined-plugin", () => {
  thePlugin(
    "should remove multiple undefined assignments in 1 statement",
    `
    let a = undefined, b = 3, c = undefined, d;
  `,
    `
    let a,
        b = 3,
        c,
        d;
  `
  );

  thePlugin(
    "should remove let-assignments to undefined",
    `
    let a = undefined;
  `,
    `
    let a;
  `
  );

  thePlugin(
    "should remove let-assignments to void 0",
    `
    let a = void 0;
  `,
    `
    let a;
  `
  );

  thePlugin(
    "should not remove const-assignments to undefined",
    `
    const a = undefined;
  `
  );

  thePlugin(
    "should remove undefined return value",
    `
    function foo() {
      return undefined;
    }
  `,
    `
    function foo() {
      return;
    }
  `
  );

  thePlugin(
    "should remove var declarations in functions",
    `
    function foo() {
      var a = undefined;
    }
  `,
    `
    function foo() {
      var a;
    }
  `
  );

  thePlugin(
    "should remove let-assignments in inner blocks",
    `
    let a = 1;
    {
      let a = undefined;
    }
  `,
    `
    let a = 1;
    {
      let a;
    }
  `
  );

  thePlugin(
    "should remove var-assignments in loops if no modify",
    `
    for (var a = undefined;;) {
      var b = undefined;
    }
  `,
    `
    for (var a;;) {
      var b;
    }
  `
  );

  thePlugin(
    "should not remove var-assignments in loops if modify",
    `
    for (var a;;) {
      var b = undefined;
      console.log(b);
      b = 3;
    }
  `
  );

  thePlugin(
    "should not remove var-assignments if referenced before",
    `
    function foo() {
      a = 3;
      var a = undefined;
    }
  `
  );

  thePlugin(
    "should not remove nested var-assignments if referenced before",
    `
    function foo() {
      aa = 3;
      var { a: aa, b: bb } = undefined;
    }
  `
  );

  thePlugin(
    "should not remove if lval is reference before via a function",
    `
    function foo() {
      bar();
      var x = undefined;
      console.log(x);
      function bar() {
        x = 3;
      }
    }
  `
  );

  thePlugin(
    "should remove if not referenced in any way before",
    `
    function foo() {
      var x = undefined;
      bar();
      console.log(x);
      function bar() {
        x = 3;
      }
    }
  `,
    `
    function foo() {
      var x;
      bar();
      console.log(x);
      function bar() {
        x = 3;
      }
    }
  `
  );

  thePlugin(
    "should not remove on mutually recursive function",
    `
    function foo() {
      a();
      var c = undefined;
      function a() {
        b();
      }
      function b() {
        a();
        c = 3;
      }
    }
  `
  );

  thePlugin(
    "should not remove if rval has side effects",
    `
    function foo() {
      var a = void b();
      return void bar();
    }
  `
  );

  thePlugin(
    "should remove from sequence expressions",
    `
    a = b, void 0, b = c, d.e.f(), void 0, hello.world();
  `,
    `
    a = b, b = c, d.e.f(), hello.world();
  `
  );

  thePlugin(
    "should NOT remove last undefined from sequence expressions",
    `
    if (foo.bar(), void 0) {
      foo.baz();
    }
    function bar() {
      return a.b(), void 0;
    }
  `
  );

  thePlugin(
    "should remove last undefined from sequence expressions if safe",
    `
    a = b, void 0, b = c, d.e.f(), void 0, hello.world(), void 0;
  `,
    `
    a = b, b = c, d.e.f(), hello.world();
  `
  );

  thePlugin(
    "should not remove local undefined",
    `
    function foo(undefined) {
      a = b, undefined;
      return undefined;
    }
  `
  );
});
