<h1 align="center">babili (babel-minify)</h1>

<p align="center">
  <strong>An ES6+ aware minifier based on the Babel toolchain.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/babili"><img alt="NPM Version" src="https://img.shields.io/npm/v/babili.svg?style=flat"></a>
  <a href="https://travis-ci.org/babel/babili"><img alt="Travis Status" src="https://travis-ci.org/babel/babili.svg?branch=master"></a>
  <a href="https://codecov.io/github/babel/babili"><img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/babel/babili/master.svg?maxAge=43200"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
  <a href="https://www.npmjs.com/package/babel-preset-babili"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/babel-preset-babili.svg"></a>
</p>

- Checkout our [CONTRIBUTING.md](/CONTRIBUTING.md) if you want to help out!

- Babili is consumable via API, CLI, or Babel preset.

- Try it online - [babeljs.io/repl](http://babeljs.io/repl/#?babili=true&evaluate=false&lineWrap=false&presets=react%2Cstage-2&code=%2F%2F%20Example%20ES2015%20Code%0Aclass%20Mangler%20%7B%0A%20%20constructor(program)%20%7B%0A%20%20%20%20this.program%20%3D%20program%3B%0A%20%20%7D%0A%7D%0Anew%20Mangler()%3B%20%2F%2F%20without%20this%20it%20would%20just%20output%20nothing%20since%20Mangler%20isn%27t%20used)

## Table of Contents

- [Requirements](#requirements)
- [Why](#why)
- [CLI](#cli)
- [Babel Preset](#babel-preset)
- [Individual Plugins](#individual-plugins)
- [Benchmarks](#benchmarks)
- [Team](#team)

## Requirements

- node >= 4
- babel >= 6.20.0

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

### Install

```sh
npm install babili --save-dev
```

### Usage

```sh
babili src -d lib
```

Equivalent to:

```sh
babel src -d lib --presets=babili --no-babelrc
```

Note that, because the `babili` command uses the default preset with `no-babelrc`, you cannot set any non-default options in the preset's plugins with this command. To do this, you can use the `babel` command with the options set in a `.babelrc`. See the preset docs for more information on how to do this.

## [Babel preset](http://babeljs.io/docs/plugins/#presets)

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-preset-babili`](/packages/babel-preset-babili) | [![npm](https://img.shields.io/npm/v/babel-preset-babili.svg?maxAge=86400)](https://www.npmjs.com/package/babel-preset-babili) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-preset-babili)](https://david-dm.org/babel/babili?path=packages/babel-preset-babili) |

### Install

```sh
npm install babel-preset-babili --save-dev
```

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

## Individual Plugins

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
| [`babel-plugin-transform-inline-environment-variables`](/packages/babel-plugin-transform-inline-environment-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-inline-environment-variables.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-inline-environment-variables)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-inline-environment-variables) |
| [`babel-plugin-transform-node-env-inline`](/packages/babel-plugin-transform-node-env-inline) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-node-env-inline.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-node-env-inline) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-node-env-inline)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-node-env-inline) |
| [`babel-plugin-transform-remove-console`](/packages/babel-plugin-transform-remove-console) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-console) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-remove-console)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-remove-console) |
| [`babel-plugin-transform-remove-debugger`](/packages/babel-plugin-transform-remove-debugger) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-debugger) | [![Dependency Status](https://david-dm.org/babel/babili.svg?path=packages/babel-plugin-transform-remove-debugger)](https://david-dm.org/babel/babili?path=packages/babel-plugin-transform-remove-debugger) |

## Benchmarks

> Bootstrap: `npm run bootstrap`

> Build: `npm run build`

> Running the benchmarks: `./scripts/benchmark.js [file...]` - defaults to a few packages fetched from unpkg.com and is defined in benchmark.js.

> Note: All Input sources are ES5.

Benchmark Results for react.js:

Input Size: 124.7kB

Input Size (gzip): 29.82kB

| minifier              | output raw  | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| --------------------- | ----------- | ------- | ----------- | -------- | --------------- | ---------------- |
| **babili**            | 36.13kB     | 71%     | 12.6kB      | 58%      | 3.14            | 1995.80          |
| **uglify**            | **35.73kB** | **71%** | **11.96kB** | **60%**  | **2.28**        | **770.76**       |
| **closureCompiler**   | 34.77kB     | 72%     | 11.96kB     | 60%      | 2.62            | 3940.01          |
| **closureCompilerJs** | 65.41kB     | 48%     | 15.83kB     | 47%      | 2.96            | 1049.21          |

Benchmark Results for vue.js:

Input Size: 234.23kB

Input Size (gzip): 64.53kB

| minifier              | output raw  | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| --------------------- | ----------- | ------- | ----------- | -------- | --------------- | ---------------- |
| **babili**            | 96.41kB     | 59%     | 34.55kB     | 46%      | 8.01            | 6754.26          |
| **uglify**            | 88.9kB      | 62%     | 32.77kB     | 49%      | 7.17            | 1696.36          |
| **closureCompiler**   | **86.94kB** | **63%** | **32.75kB** | **49%**  | **6.70**        | **7625.19**      |
| **closureCompilerJs** | 90.09kB     | 62%     | 33.67kB     | 48%      | 6.48            | 11422.21         |

Benchmark Results for lodash.js:

Input Size: 526.94kB

Input Size (gzip): 93.91kB

| minifier              | output raw  | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| --------------------- | ----------- | ------- | ----------- | -------- | --------------- | ---------------- |
| **babili**            | 76.07kB     | 86%     | 25.42kB     | 73%      | 7.93            | 5923.21          |
| **uglify**            | 70.25kB     | 87%     | 24.48kB     | 74%      | 6.31            | 1533.58          |
| **closureCompiler**   | **70.68kB** | **87%** | **24.11kB** | **74%**  | **7.74**        | **7455.41**      |
| **closureCompilerJs** | 73.11kB     | 86%     | 24.82kB     | 74%      | 7.94            | 8276.89          |

Benchmark Results for three.js:

Input Size: 1002.36kB

Input Size (gzip): 199.96kB

| minifier              | output raw   | raw win | gzip output  | gzip win | parse time (ms) | minify time (ms) |
| --------------------- | ------------ | ------- | ------------ | -------- | --------------- | ---------------- |
| **babili**            | 526.27kB     | 47%     | 130.08kB     | 35%      | 34.22           | 17339.80         |
| **uglify**            | **496.16kB** | **51%** | **123.99kB** | **38%**  | **30.37**       | **5524.94**      |
| **closureCompiler**   | 491.56kB     | 51%     | 124.93kB     | 38%      | 33.72           | 13765.79         |
| **closureCompilerJs** | 499.81kB     | 50%     | 126.02kB     | 37%      | 35.50           | 98327.82         |

## Browser support

Babili is best at targeting latest browsers ([with full ES6+ support](https://kangax.github.io/compat-table/es6/)) but can also be used with the usual Babel es2015 preset to transpile down the code first.

## Team

[![Amjad Masad](https://avatars.githubusercontent.com/u/587518?s=96)](https://github.com/amasad) | [![Boopathi Rajaa](https://avatars.githubusercontent.com/u/294474?s=96)](https://github.com/boopathi) | [![Juriy Zaytsev](https://avatars.githubusercontent.com/u/383?s=96)](https://github.com/kangax) | [![Henry Zhu](https://avatars.githubusercontent.com/u/588473?s=96)](https://github.com/hzoo) | [![Vignesh Shanmugam](https://avatars0.githubusercontent.com/u/3902525?s=96)](https://github.com/vigneshshanmugam)
---|---|---|---|---|
Amjad Masad | Boopathi Rajaa | Juriy Zaytsev | Henry Zhu | Vignesh Shanmugam
[@amasad](https://github.com/amasad) | [@boopathi](https://github.com/boopathi) | [@kangax](https://github.com/kangax) | [@hzoo](https://github.com/hzoo) | [@vigneshshanmugam](https://github.com/vigneshshanmugam)
[@amasad](https://twitter.com/amasad) | [@heisenbugger](https://twitter.com/heisenbugger) | [@kangax](https://twitter.com/kangax) | [@left_pad](https://twitter.com/left_pad) | [@_vigneshh](https://twitter.com/_vigneshh)
