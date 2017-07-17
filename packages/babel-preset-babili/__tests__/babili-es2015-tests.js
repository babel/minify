jest.autoMockOff();

const es2015 = require("babel-preset-es2015");
const babili = require("../src/index");

const thePlugin = require("../../../utils/test-transform")(null, {
  plugins: [],
  minified: false,
  presets: [babili, es2015]
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
});
