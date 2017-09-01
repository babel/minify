jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("hoist-loose-functions-plugin", () => {
  describe("loose mode", () => {
    thePlugin(
      "should hoist functions in top-level if blocks",
      `
      if (a) {
        function bar() {}
      }
    `,
      `
      function bar() {}
      if (a) {}
    `
    );

    thePlugin(
      "should hoist nested functions in if blocks",
      `
      function foo(a) {
        if (a) {
          function bar() {}
        }
      }
    `,
      `
      function foo(a) {
        function bar() {}

        if (a) {}
      }
    `
    );

    thePlugin(
      "should hoist functions in top-level while blocks",
      `
      while (true) {
        function foo() {}
      }
    `,
      `
      function foo() {}
      while (true) {}
    `
    );

    thePlugin(
      "should hoist nested functions in while blocks",
      `
      function foo() {
        while (true) {
          function bar() {}
        }
      }
    `,
      `
      function foo() {
        function bar() {}

        while (true) {}
      }
    `
    );

    thePlugin(
      "should hoist functions in top-level do blocks",
      `
      do {
        function foo() {}
      } while (true);
    `,
      `
      function foo() {}
      do {} while (true);
    `
    );

    thePlugin(
      "should hoist nested functions in do blocks",
      `
      function foo() {
        do {
          function bar() {}
        } while (true);
      }
    `,
      `
      function foo() {
        function bar() {}

        do {} while (true);
      }
    `
    );

    thePlugin(
      "should hoist functions in top-level anonymous blocks",
      `
      var a = 0;
      {
        function foo() {}
      }
      var b = 1;
    `,
      `
      function foo() {}
      var a = 0;
      {}
      var b = 1;
    `
    );

    thePlugin(
      "should hoist nested functions in anonymous blocks",
      `
      function foo() {
        var a = 0;
        {
          function bar() {}
        }
        var b = 1;
      }
    `,
      `
      function foo() {
        function bar() {}

        var a = 0;
        {}
        var b = 1;
      }
    `
    );

    thePlugin(
      "should only hoist to nearest function",
      `
      function outer() {
        function inner() {
          if (a) {
            function foo() {}
          }
        }
      }
    `,
      `
      function outer() {
        function inner() {
          function foo() {}

          if (a) {}
        }
      }
    `
    );
  });

  describe("strict mode", () => {
    thePlugin(
      "should not hoist top-level if program is strict",
      `
      'use strict';

      if (true) {
        function foo() {}
      }
      `
    );

    thePlugin(
      "should not hoist nested if program is strict",
      `
      'use strict';

      function foo() {
        if (true) {
          function bar() {}
        }
      }
      `
    );

    thePlugin(
      "should not hoist nested if outer function is strict",
      `
      'use strict';

      function foo() {
        'use strict';

        if (true) {
          function bar() {}
        }
      }
      `
    );

    thePlugin(
      "should hoist strict function if outer function is loose",
      `
      function foo() {
        if (true) {
          function bar () {
            'use strict';
          }
        }
      }
    `,
      `
      function foo() {
        function bar() {
          'use strict';
        }

        if (true) {}
      }
    `
    );
  });
});
