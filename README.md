## babel-minify

An ES6+ aware minifier based on the Babel toolchain.

> babel-minify is consumable via API, CLI, or babel preset.

<p align="center">
  <a href="https://travis-ci.org/amasad/babel-minify"><img alt="Travis Status" src="https://img.shields.io/travis/amasad/babel-minify/master.svg?style=flat&label=travis"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
</p>

Checkout our [CONTRIBUTING.md](/CONTRIBUTING.md) if you want to help out!

## CLI
- [babel-minify](/packages/babel-minify)

A simple wrapper around `babel-cli` and thus takes in the same [cli options](http://babeljs.io/docs/usage/cli/#options).

`babel-minify src -d lib` -> `babel src -d lib --presets=minify`

## Preset

Works just like any other preset (like `es2015`).

- [babel-preset-minify](/packages/babel-preset-minify)

You'll most likely want to use it only in the production environment. Check out the [env docs](http://babeljs.io/docs/usage/babelrc/#env-option) for more help.

> Options specific to a certain environment are merged into and overwrite non-env specific options.

Example `.babelrc`:

```
{
  "presets": ["es2015"],
  "env": {
    "production": {
      "presets": ["minify"]
    }
  }
}
```

Then you'll need to set the env variable which could be something like `BABEL_ENV=production npm run build`

## Plugins (in `babel-preset-minify`)

The `babel-minify` repo is a monorepo similar to [babel](https://github.com/babel/babel) itself. It is comprised of a bunch of npm packages.

- [babel-plugin-minify-constant-folding](/packages/babel-plugin-minify-constant-folding)
- [babel-plugin-minify-dead-code-elimination](/packages/babel-plugin-minify-dead-code-elimination)
- [babel-plugin-minify-flip-comparisons](/packages/babel-plugin-minify-flip-comparisons)
- [babel-plugin-minify-guarded-expressions](/packages/babel-plugin-minify-guarded-expressions)
- [babel-plugin-minify-infinity](/packages/babel-plugin-minify-infinity)
- [babel-plugin-minify-mangle-names](/packages/babel-plugin-minify-mangle-names)
- [babel-plugin-minify-replace](/packages/babel-plugin-minify-replace)
- [babel-plugin-minify-simplify](/packages/babel-plugin-minify-simplify)
- [babel-plugin-minify-type-constructors](/packages/babel-plugin-minify-type-constructors)
- [babel-plugin-transform-member-expression-literals](/packages/babel-plugin-transform-member-expression-literals)
- [babel-plugin-transform-merge-sibling-variables](/packages/babel-plugin-transform-merge-sibling-variables)
- [babel-plugin-transform-minify-booleans](/packages/babel-plugin-transform-minify-booleans)
- [babel-plugin-transform-property-literals](/packages/babel-plugin-transform-property-literals)
- [babel-plugin-transform-simplify-comparison-operators](/packages/babel-plugin-transform-simplify-comparison-operators)
- [babel-plugin-transform-undefined-to-void](/packages/babel-plugin-transform-undefined-to-void)

### Other

- [babel-plugin-minify-empty-function](/packages/babel-plugin-minify-empty-function)
- [babel-plugin-transform-inline-environment-variables](/packages/babel-plugin-transform-inline-environment-variables)
- [babel-plugin-transform-node-env-inline](/packages/babel-plugin-transform-node-env-inline)
- [babel-plugin-transform-remove-console](/packages/babel-plugin-transform-remove-console)
- [babel-plugin-transform-remove-debugger](/packages/babel-plugin-transform-remove-debugger)

## Benchmarks

> Running the benchmarks: `./scripts/benchmark.js file.js`

Backbone.js:
```
        raw     raw win gzip   gzip win parse time run
babel   21.74kB 222%    7.28kB 170%     2ms        831ms
uglify  21.82kB 220%    7.32kB 169%     1ms        359ms
closure 21.67kB 223%    7.37kB 167%     2ms        3455ms
```

Run with: ``./scripts/benchmark.js ./scripts/fixtures/backbone.js`

React:
```
        raw      raw win gzip    gzip win parse time run
babel   176.09kB 256%    52.88kB 168%     12ms       3506ms
closure 171.46kB 265%    52.97kB 168%     12ms       9785ms
uglify  176.41kB 255%    53.18kB 167%     12ms       2187ms
```

Run with: ``./scripts/benchmark.js ./scripts/fixtures/react.js`

jQuery:
```
        raw     raw win gzip    gzip win parse time run
uglify  94.4kB  217%    32.82kB 157%     8ms        1449ms
babel   93.63kB 220%    32.95kB 156%     8ms        3623ms
closure 94.23kB 218%    33.38kB 153%     10ms       9001ms
```

Run with: ``./scripts/benchmark.js ./scripts/fixtures/jquery.js`
