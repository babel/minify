jest.autoMockOff();

const mocks = [
  "babel-plugin-minify-constant-folding",
  "babel-plugin-minify-dead-code-elimination",
  "babel-plugin-minify-flip-comparisons",
  "babel-plugin-transform-simplify-comparison-operators",
  "babel-plugin-minify-guarded-expressions",
  "babel-plugin-minify-type-constructors",
  "babel-plugin-minify-infinity",
  "babel-plugin-minify-mangle-names",
  "babel-plugin-minify-numeric-literals",
  "babel-plugin-minify-replace",
  "babel-plugin-minify-simplify",
  "babel-plugin-transform-member-expression-literals",
  "babel-plugin-transform-property-literals",
  "babel-plugin-transform-merge-sibling-variables",
  "babel-plugin-transform-minify-booleans",
  "babel-plugin-transform-undefined-to-void",
  "babel-plugin-transform-regexp-constructors",
  "babel-plugin-transform-remove-debugger",
  "babel-plugin-transform-remove-console",
  "babel-plugin-transform-remove-undefined",
];

mocks.forEach((mockName) => {
  // it's called mockName for jest(babel-jest-plugin) workaround
  jest.mock(mockName, () => mockName);
});

const preset = require("../src/index");

function getPlugins(opts) {
  return preset({}, opts).presets[0].plugins;
}

function testOpts(opts) {
  expect({
    input: opts,
    output: getPlugins(opts)
  }).toMatchSnapshot();
}

describe("preset-options", () => {
  it("should be a function", () => {
    expect(typeof preset).toBe("function");
  });

  it("should return defaults with no options", () => {
    expect(getPlugins()).toMatchSnapshot();
    expect(getPlugins({})).toMatchSnapshot();
    expect(getPlugins(null)).toMatchSnapshot();
  });

  it("should handle simple options", () => {
    testOpts({
      mangle: false,
      deadcode: false
    });
  });

  it("should pass options to respective plugin when its an object", () => {
    testOpts({
      mangle: {
        blacklist: ["foo", "bar"]
      }
    });
  });

  it("should handle groups - remove entire group", () => {
    testOpts({
      unsafe: false
    });
  });

  it("should handle individual items in a group of options", () => {
    testOpts({
      unsafe: {
        flipComparisons: false
      },
      mangle: false
    });
  });

  it("should handle options that are delegated to multiple other options", () => {
    testOpts({
      keepFnName: false
    });
    testOpts({
      keepFnName: true,
      mangle: {
        blacklist: ["foo", "bar"]
      }
    });
    testOpts({
      keepFnName: true,
      mangle: {
        blacklist: ["baz"],
        keepFnName: false
      }
    });
  });
});
