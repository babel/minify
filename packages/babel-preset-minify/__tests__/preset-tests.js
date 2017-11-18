jest.autoMockOff();

const thePlugin = require("test-transform")(null, {
  plugins: [],
  minified: false,
  presets: [require("../src/index")]
});

describe("preset", () => {
  // https://github.com/babel/minify/issues/122
  thePlugin(
    "should fix issue#122",
    `
    function foo() {
      var a, b, c;
      if (a) {
        if (b) {
          if (c) {}
        }
      } else {
        if (b) {
        } else {
          if (c) {}
        }
      }
    }
  `,
    `
    function foo() {
      var d, a, b;
      d ? a && b : a || b;
    }
  `
  );

  thePlugin(
    "should fix remove comments",
    `
    var asdf = 1; // test
  `,
    `
    var asdf = 1;
  `
  );

  thePlugin(
    "should keep license/preserve annotated comments",
    `
    /* @license */
    var asdf = 1;
  `,
    `
    /* @license */
    var asdf = 1;
  `
  );

  thePlugin(
    "should fix issue#385 - impure if statements with Sequence and DCE",
    `
    a = b;
    c = d;
    if (false) {
      const x = y
    }
  `,
    `
    a = b, c = d;
  `
  );

  thePlugin(
    "should fix issue#402 - lifting var decl & DCE",
    `
    function a() {
      if (0) {
        for (var i;;) {
          var something = 5;
        }
      }
    }
    a();
  `,
    `
    function a() {}
    a();
  `
  );

  thePlugin(
    "should fix issue#425 - mangles the alaises from builtins transform",
    `
    function a (){
      const d = Math.max(foo, bar);
      function b() {
        Math.max(foo, bar) * Math.floor(baz);
      }
      function c() {
        Math.max(foo, bar) * Math.floor(baz);
      }
    }
  `,
    `
    function a() {
      var a = Math.floor,
          b = Math.max;
      b(foo, bar);
    }
  `
  );

  thePlugin(
    "should fix bug#326 - object destructuring",
    `
    function a() {
      let foo, bar, baz;
      ({foo, bar, baz} = {});
      return {foo, bar, baz};
    }
  `,
    `
    function a() {
      let a, b, c;

      return ({ foo: a, bar: b, baz: c } = {}), { foo: a, bar: b, baz: c };
    }
  `
  );

  thePlugin(
    "should fix bug#568 - conflicts b/w builtIns and mangle",
    `
    (function () {
      return [Math.pi, Math.pi];
    })();
  `,
    `
    (function () {
      var a = Math.pi;

      return [a, a];
    })();
  `
  );

  thePlugin(
    "should fix unicode",
    `
      function foo() {
        module.exports = {
          "\uD835\uDCB6": "ascr"
        };
      }
    `
  );
});
