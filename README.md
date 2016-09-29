<h1 align="center">babili (babel-minify)</h1>

<p align="center">
  <strong>An ES6+ aware minifier based on the Babel toolchain.</strong>
</p>

<p align="center">
  <a href="https://travis-ci.org/babel/babili"><img alt="Travis Status" src="https://travis-ci.org/babel/babili.svg?branch=master"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
</p>

- NOTE: We are in a [feature freeze](https://github.com/babel/babili/issues/71) as we're trying to hammer out all the bugs to get to beta release. The best way to contribute is to test, report bugs, and add test cases.

- Checkout our [CONTRIBUTING.md](/CONTRIBUTING.md) if you want to help out!

- babili is consumable via API, CLI, or babel preset.

- Try it online - [babeljs.io/repl](http://babeljs.io/repl/#?babili=true&evaluate=false&lineWrap=false&presets=react%2Cstage-2&code=%2F%2F%20Example%20ES2015%20Code%0Aclass%20Mangler%20%7B%0A%20%20constructor(program)%20%7B%0A%20%20%20%20this.program%20%3D%20program%3B%0A%20%20%7D%0A%7D%0Anew%20Mangler()%3B%20%2F%2F%20without%20this%20it%20would%20just%20output%20nothing%20since%20Mangler%20isn%27t%20used)

## Why

Current tools don't support targeting the latest version of ECMAScript. (yet)
- Babili can because it is just a set of Babel plugins, and Babel already understands new syntax with our parser [Babylon](https://github.com/babel/babylon).
- When it's possible to only target browsers that support newer ES features, code sizes can be smaller because you don't have to transpile and then minify.

Check out our [blog post](http://babeljs.io/blog/2016/08/30/babili) for more info!

```js
// Example ES2015 Code
class Mangler {
  constructor(program) {
    this.program = program;
  }
}
new Mangler(); // without this it would just output nothing since Mangler isn't used
```

Before
```js
// ES2015+ code -> Babel -> Babili/Uglify -> Minified ES5 Code
var a=function a(b){_classCallCheck(this,a),this.program=b};new a;
```

After

```js
// ES2015+ code -> Babili -> Minified ES2015+ Code
class a{constructor(b){this.program=b}}new a;
```

## [CLI](http://babeljs.io/docs/usage/cli/)

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babili`](/packages/babili) | [![npm](https://img.shields.io/npm/v/babili.svg?maxAge=86400)](https://www.npmjs.com/package/babili) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babili)](https://david-dm.org/babel/babili?path=packages/babili) |

This is simple wrapper around the regular `babel-cli` and thus takes in the same [cli options](http://babeljs.io/docs/usage/cli/#options) as running babel on its own. You can use this if you don't already use babel or want to run it standalone.

### Usage

`babili src -d lib`

Equivalent to:
`babel src -d lib --presets=babili --no-babelrc`

## [Babel preset](http://babeljs.io/docs/plugins/#presets)

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-preset-babili`](/packages/babel-preset-babili) | [![npm](https://img.shields.io/npm/v/babel-preset-babili.svg?maxAge=86400)](https://www.npmjs.com/package/babel-preset-babili) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-preset-babili)](https://david-dm.org/babel/babili?path=packages/babel-preset-babili) |

It's a Babel preset (like `babel-preset-es2015`).

### Usage

You'll most likely want to use it only in the production environment. Check out the [env docs](http://babeljs.io/docs/usage/babelrc/#env-option) for more help.

> Options specific to a certain environment are merged into and overwrite non-env specific options.

`.babelrc`:

```
{
  "presets": ["es2015"],
  "env": {
    "production": {
      "presets": ["babili"]
    }
  }
}
```

Then you'll need to set the env variable which could be something like `BABEL_ENV=production npm run build`

## [Plugins](http://babeljs.io/docs/plugins/) (in `babel-preset-babili`)

The `babili` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel) itself.

The npm package `babel-preset-babili` is at the path `packages/babel-preset-babili`

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-plugin-minify-constant-folding`](/packages/babel-plugin-minify-constant-folding) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-constant-folding.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-constant-folding) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-constant-folding)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-constant-folding) |
| [`babel-plugin-minify-dead-code-elimination`](/packages/babel-plugin-minify-dead-code-elimination) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-dead-code-elimination.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-dead-code-elimination) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-dead-code-elimination)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-dead-code-elimination) |
| [`babel-plugin-minify-flip-comparisons`](/packages/babel-plugin-minify-flip-comparisons) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-flip-comparisons.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-flip-comparisons) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-flip-comparisons)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-flip-comparisons) |
| [`babel-plugin-minify-guarded-expressions`](/packages/babel-plugin-minify-guarded-expressions) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-guarded-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-guarded-expressions) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-guarded-expressions)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-guarded-expressions) |
| [`babel-plugin-minify-infinity`](/packages/babel-plugin-minify-infinity) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-infinity.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-infinity) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-infinity)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-infinity) |
| [`babel-plugin-minify-mangle-names`](/packages/babel-plugin-minify-mangle-names) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-mangle-names.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-mangle-names) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-mangle-names)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-mangle-names) |
| [`babel-plugin-minify-replace`](/packages/babel-plugin-minify-replace) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-replace.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-replace) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-replace)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-replace) |
| [`babel-plugin-minify-simplify`](/packages/babel-plugin-minify-simplify) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-simplify.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-simplify) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-simplify)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-simplify) |
| [`babel-plugin-minify-type-constructors`](/packages/babel-plugin-minify-type-constructors) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-type-constructors.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-type-constructors) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-type-constructors)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-type-constructors) |
| [`babel-plugin-transform-member-expression-literals`](/packages/babel-plugin-transform-member-expression-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-member-expression-literals.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-member-expression-literals) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-member-expression-literals)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-member-expression-literals) |
| [`babel-plugin-transform-merge-sibling-variables`](/packages/babel-plugin-transform-merge-sibling-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-merge-sibling-variables.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-merge-sibling-variables) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-merge-sibling-variables)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-merge-sibling-variables) |
| [`babel-plugin-transform-minify-booleans`](/packages/babel-plugin-transform-minify-booleans) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-minify-booleans.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-minify-booleans) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-minify-booleans)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-minify-booleans) |
| [`babel-plugin-transform-property-literals`](/packages/babel-plugin-transform-property-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-property-literals.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-property-literals) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-property-literals)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-property-literals) |
| [`babel-plugin-transform-simplify-comparison-operators`](/packages/babel-plugin-transform-simplify-comparison-operators) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-simplify-comparison-operators.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-simplify-comparison-operators) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-simplify-comparison-operators)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-simplify-comparison-operators) |
| [`babel-plugin-transform-undefined-to-void`](/packages/babel-plugin-transform-undefined-to-void) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-undefined-to-void.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-undefined-to-void) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-undefined-to-void)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-undefined-to-void) |

### Usage

> Normally you wouldn't be consuming the plugins directly since the preset is available.

Add to your `.babelrc`'s plugins array.

```
{
  "plugins": ["babel-plugin-transform-undefined-to-void"]
}
```

## Other

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-plugin-minify-empty-function`](/packages/babel-plugin-minify-empty-function) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-empty-function.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-empty-function) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-minify-empty-function)](https://david-dm.org/babel/babili?path=packages/babel-plugin-minify-empty-function) |
| [`babel-plugin-transform-inline-environment-variables`](/packages/babel-plugin-transform-inline-environment-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-inline-environment-variables.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-inline-environment-variables)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-inline-environment-variables) |
| [`babel-plugin-transform-node-env-inline`](/packages/babel-plugin-transform-node-env-inline) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-node-env-inline.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-node-env-inline) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-node-env-inline)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-node-env-inline) |
| [`babel-plugin-transform-remove-console`](/packages/babel-plugin-transform-remove-console) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-console) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-remove-console)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-remove-console) |
| [`babel-plugin-transform-remove-debugger`](/packages/babel-plugin-transform-remove-debugger) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-debugger) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-remove-debugger)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-remove-debugger) |

## Benchmarks
> Bootstrap: `npm run bootstrap`

> Build:  `npm run build`

> Running the benchmarks: `./scripts/benchmark.js file.js`

Backbone.js:
```
           raw     raw win gzip   gzip win parse time run
uglify     21.79kB 221%    7.29kB 169%     1ms        247ms
closure    21.67kB 223%    7.37kB 167%     2ms        1223ms
babili     21.9kB  219%    7.46kB 164%     2ms        722ms
closure js 24.01kB 191%    8.04kB 144%     2ms        3301ms
```

Run with: `./scripts/benchmark.js ./scripts/fixtures/backbone.js`

React:
```
          raw      raw win gzip    gzip win parse time run
closure    171.46kB 265%    52.97kB 168%     14ms       2457ms
uglify     176.36kB 255%    53.13kB 167%     12ms       1367ms
closure js 173.95kB 260%    53.53kB 165%     12ms       11846ms
babili     177.87kB 252%    55.41kB 156%     13ms       3059ms
```

Run with: `./scripts/benchmark.js ./scripts/fixtures/react.js`

jQuery:
```
           raw      raw win gzip    gzip win parse time run
uglify     94.27kB  218%    32.78kB 158%     6ms        955ms
closure    94.23kB  218%    33.38kB 153%     18ms       1760ms
closure js 95.64kB  213%    33.78kB 150%     8ms        9295ms
babili     102.74kB 192%    35.3kB  139%     8ms        2912ms
```

Run with: `./scripts/benchmark.js ./scripts/fixtures/jquery.js`
