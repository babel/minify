const babel = require("@babel/core");

const unpad = require("unpad");

function _transform(source, options) {
  return babel.transform(unpad(source), options).code.trim();
}

function makeTester(
  plugins,
  opts,
  { transform = _transform, check, test = it },
  excludeKeys = []
) {
  if (!Array.isArray(plugins)) {
    plugins = [plugins];
  }
  const thePlugin = (name, source, expected = source, babelOpts) => {
    if (typeof expected === "object") {
      babelOpts = expected;
      expected = source;
    }
    const { stack } = new Error();
    const options = Object.assign(
      { plugins, sourceType: "script" },
      opts,
      babelOpts
    );
    test(name, () => {
      const transformed = transform(source, options);
      try {
        check({
          transformed,
          expected: unpad(expected),
          source: unpad(source)
        });
      } catch (e) {
        // use the stack from outside the it() clause
        // (the one inside the clause doesn’t show the actual test code)
        e.stack = stack;
        throw e;
      }
    });
  };
  thePlugin.skip = name => test.skip(name);
  if (excludeKeys.indexOf("inEachLine") === -1) {
    thePlugin.inEachLine = makeTester(
      plugins,
      opts,
      {
        test,
        transform(source, options) {
          return unpad(source)
            .split("\n")
            .map(line => _transform(line, options))
            .join("\n");
        },
        check
      },
      excludeKeys.concat("inEachLine")
    );
  }
  if (excludeKeys.indexOf("only") === -1) {
    thePlugin.only = makeTester(
      plugins,
      opts,
      {
        test: test.only,
        transform,
        check
      },
      excludeKeys.concat("only")
    );
  }
  return thePlugin;
}

exports = module.exports = (plugins, opts) =>
  makeTester(plugins, opts, {
    check({ transformed, expected }) {
      expect(transformed).toBe(expected);
    }
  });

exports.snapshot = (plugins, opts) =>
  makeTester(plugins, opts, {
    check({ transformed, source }) {
      // Jest arranges in alphabetical order, So keeping it as _source
      expect({ _source: source, expected: transformed }).toMatchSnapshot();
    }
  });
