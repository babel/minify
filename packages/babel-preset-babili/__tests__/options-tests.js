jest.autoMockOff();

const mocks = [
  "babel-plugin-minify-builtins",
  "babel-plugin-minify-constant-folding",
  "babel-plugin-minify-dead-code-elimination",
  "babel-plugin-minify-flip-comparisons",
  "babel-plugin-minify-guarded-expressions",
  "babel-plugin-minify-infinity",
  "babel-plugin-minify-mangle-names",
  "babel-plugin-minify-numeric-literals",
  "babel-plugin-minify-replace",
  "babel-plugin-minify-simplify",
  "babel-plugin-minify-type-constructors",
  "babel-plugin-transform-inline-consecutive-adds",
  "babel-plugin-transform-member-expression-literals",
  "babel-plugin-transform-merge-sibling-variables",
  "babel-plugin-transform-minify-booleans",
  "babel-plugin-transform-property-literals",
  "babel-plugin-transform-regexp-constructors",
  "babel-plugin-transform-remove-console",
  "babel-plugin-transform-remove-debugger",
  "babel-plugin-remove-symbol-description",
  "babel-plugin-transform-remove-undefined",
  "babel-plugin-transform-simplify-comparison-operators",
  "babel-plugin-transform-undefined-to-void"
];

mocks.forEach(mockName => {
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

  it("should handle options that are delegated to multiple other options", () => {
    testOpts({
      keepFnName: false,
      keepClassName: false
    });
    testOpts({
      keepFnName: true,
      keepClassName: true,
      mangle: {
        blacklist: ["foo", "bar"]
      }
    });
    testOpts({
      keepFnName: true,
      keepClassName: true,
      mangle: {
        blacklist: ["baz"],
        keepFnName: false,
        keepClassName: false
      }
    });
  });
});
