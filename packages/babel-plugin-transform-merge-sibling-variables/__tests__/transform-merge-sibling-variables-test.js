jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("transform-merge-sibling-variables-plugin", () => {
  thePlugin(
    "should concat `var` declarations",
    `
    var i = 0;
    var x = 0;
    var y = 0;
  `,
    `
    var i = 0,
        x = 0,
        y = 0;
  `
  );

  thePlugin(
    "should concat `var` declarations in for loops",
    `
    var i = 0;
    var j = 0;
    for (var x = 0; x < 10; x++) console.log(i + x);
  `,
    `
    for (var i = 0, j = 0, x = 0; x < 10; x++) console.log(i + x);
  `
  );

  thePlugin(
    "should not concat block-scoped variables in for loops",
    `
    let i = 0;
    for (let x = 0; x < 10; x++) console.log(i + x);
  `
  );

  thePlugin(
    "should not concat constants in for loops",
    `
    const j = 0;
    for (const x = 0;;) console.log(j + x);
  `
  );

  thePlugin(
    "should concat block-scoped variable declarations next to, but not into, for loops",
    `
    let i = 0;
    let y = 0;
    for (let x = 0; x < 10; x++) console.log(i + x);
  `,
    `
    let i = 0,
        y = 0;

    for (let x = 0; x < 10; x++) console.log(i + x);
  `
  );

  thePlugin(
    "lift `var` declarations to the loop intializer",
    `
    for (var i = 0; i < 0; i++) {
      var j = jj();
    }
    for (var i=0;;) var j = 0;
  `,
    `
    for (var i = 0, j; i < 0; i++) {
      j = jj();
    }
    for (var i = 0, j;;) j = 0;
  `
  );

  thePlugin(
    "lift `let` declarations to the loop intializer",
    `
    for (let i = 0; i < 0; i++) {
      let j = jj();
    }
  `,
    `
    for (let i = 0, j; i < 0; i++) {
      j = jj();
    }
  `
  );

  thePlugin(
    "should not lift declarations from array or object destructuring asignments",
    `
    for (var i = 0; i < 0; i++) {
      var [j] = jj();
    }
    for (var i = 0; i < 0; i++) {
      var { j } = jj();
    }
  `
  );

  thePlugin(
    "should not lift declarations when no loop initializer is present",
    `
    for (;;) {}
    for (;;) var i = 0;
  `
  );

  thePlugin(
    "should not lift when the declarations are of different types",
    `
    for (let i = 0; i < 0; i++) {
      var i = 0;
    }
  `
  );

  thePlugin(
    "should not lift when the declarations are not initialized",
    `
    for (var i = 0;;) {
      var i;
    }
  `
  );

  thePlugin(
    "should not lift when there are multiple declarations",
    `
    for (var i = 0; i < 0; i++) {
      var i = 0, k = 0;
    }
  `,
    `
    for (var i = 0; i < 0; i++) {
      var i = 0,
          k = 0;
    }
  `
  );
});
