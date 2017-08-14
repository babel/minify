jest.autoMockOff();

const es2015 = require("babel-preset-es2015");
const minifyPreset = require("../src/index");

const thePlugin = require("../../../utils/test-transform")(null, {
  plugins: [],
  minified: false,
  presets: [minifyPreset, es2015]
});

describe("preset along with es2015", () => {
  thePlugin(
    "should fix issue #630",
    `
    const obj = {cat: 'dog'};
    let cat;
    ({cat} = obj);
  `,
    `
    'use strict';

    var cat,
        obj = { cat: 'dog' },
        _obj = obj;
    cat = _obj.cat, _obj;
  `
  );

  thePlugin(
    "should fix simplify with es2015 - issue#632",
    `
      let obj, key;
      if (1) ({k: key} = obj);
      foo();
    `,
    `
      "use strict";

      var obj,
          key = void 0;
      key = obj.k, foo();
    `
  );

  thePlugin(
    "should fix issue#614",
    `
      function a() {
        var c = 1
        class B {}
        return B
      }
    `,
    `
      "use strict";

      function _classCallCheck(a, b) { if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function"); }

      function a() {
        return function a() {
          _classCallCheck(this, a);
        };
      }
    `
  );
});
