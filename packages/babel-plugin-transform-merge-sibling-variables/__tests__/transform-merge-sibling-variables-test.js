jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("transform-merge-sibling-variables-plugin", () => {
  thePlugin(
    "concat vars",
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
    "concat vars in for loops",
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
    "don't concat block-scoped variables in for loops",
    `
    let i = 0;
    for (let x = 0; x < 10; x++) console.log(i + x);
  `
  );

  thePlugin(
    "don't concat constants in for loops",
    `
    const j = 0;
    for (const x = 0;;) console.log(j + x);
  `
  );

  thePlugin(
    "concat block-scoped vars next to, but not into for loops",
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
    "lift var declarations to loop intializer",
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
    "lift let declarations to loop intializer",
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
    "dont lift declarations on object/array pattern",
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
    "dont lift declarations when no body is present",
    `
    for (;;) {}
    for (;;) var i = 0;
  `
  );

  thePlugin(
    "dont lift when the declarations are of different kind",
    `
    for (let i = 0; i < 0; i++) {
      var i = 0;
    }
  `
  );

  thePlugin(
    "dont lift when the declarations are not initialized",
    `
    for (var i = 0;;) {
      var i;
    }
  `
  );

  thePlugin(
    "dont lift when there are multiple declarations",
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
