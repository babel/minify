<h1 align="center">babel-minify (beta)</h1>

<p align="center">
  <strong>An ES6+ aware minifier based on the Babel toolchain.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/babel-minify"><img alt="NPM Version" src="https://img.shields.io/npm/v/babel-minify.svg?style=flat"/></a>
  <a href="https://travis-ci.com/babel/minify"><img alt="Travis Status" src="https://travis-ci.com/babel/minify.svg?branch=master"/></a>
  <a href="https://circleci.com/gh/babel/minify"><img alt="CircleCI Status" src="https://img.shields.io/circleci/project/github/babel/minify/master.svg?label=circle&maxAge=43200"/></a>
  <a href="https://ci.appveyor.com/project/boopathi/minify/branch/master"><img alt="AppveyorCI Status" src="https://ci.appveyor.com/api/projects/status/github/babel/minify?branch=master&svg=true"/></a>
  <a href="https://codecov.io/github/babel/minify"><img alt="Code Coverage" src="https://img.shields.io/codecov/c/github/babel/minify/master.svg?maxAge=43200"/></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"/></a>
  <a href="https://www.npmjs.com/package/babel-preset-minify"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/babel-preset-minify.svg"/></a>
</p>

- `babel-minify` is an experimental project that attempts to use Babel's toolchain (for compilation) to do something in a similar vein, minification. Currently in 0.x, so we don't recommend using it in production.

- We are currently still looking for maintainers, checkout our [CONTRIBUTING.md](/CONTRIBUTING.md) if you want to help out!

- `babel-minify` is consumable via API, CLI, or Babel preset.

- Try it online - [babeljs.io/repl](http://babeljs.io/repl/#?babili=true&evaluate=false&lineWrap=false&presets=react%2Cstage-2&code=%2F%2F%20Example%20ES2015%20Code%0Aclass%20Mangler%20%7B%0A%20%20constructor(program)%20%7B%0A%20%20%20%20this.program%20%3D%20program%3B%0A%20%20%7D%0A%7D%0Anew%20Mangler()%3B%20%2F%2F%20without%20this%20it%20would%20just%20output%20nothing%20since%20Mangler%20isn%27t%20used)

> Historical note: babel-minify was renamed from babili.

## Table of Contents

- [Requirements](#requirements)
- [Why](#why)
- [CLI](#cli)
- [Babel Preset](#babel-preset)
- [Individual Plugins](#individual-plugins)
- [Benchmarks](#benchmarks)
- [Team](#team)

## Requirements

- node >= 6
- babel >= 6.20.0

## Why

Current tools don't support targeting the latest version of ECMAScript. (yet)
- BabelMinify can because it is just a set of Babel plugins, and Babel already understands new syntax with our parser [Babylon](https://github.com/babel/babylon).
- When it's possible to only target browsers that support newer ES features, code sizes can be smaller because you don't have to transpile and then minify.

Check out our [blog post](http://babeljs.io/blog/2016/08/26/babili) for more info!

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
// ES2015+ code -> Babel -> BabelMinify/Uglify -> Minified ES5 Code
var a=function a(b){_classCallCheck(this,a),this.program=b};new a;
```

After

```js
// ES2015+ code -> BabelMinify -> Minified ES2015+ Code
class a{constructor(b){this.program=b}}new a;
```

## [CLI](http://babeljs.io/docs/usage/cli/)

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-minify`](/packages/babel-minify) | [![npm](https://img.shields.io/npm/v/babel-minify.svg?maxAge=86400)](https://www.npmjs.com/package/babel-minify) | [![Dependency Status](https://david-dm.org/babel/babel-minify.svg?path=packages/babel-minify)](https://david-dm.org/babel/babel-minify?path=packages/babel-minify) |

### Install

```sh
npm install babel-minify --save-dev
```

### Usage

```sh
minify src -d lib
```

## [Babel preset](http://babeljs.io/docs/plugins/#presets)

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-preset-minify`](/packages/babel-preset-minify) | [![npm](https://img.shields.io/npm/v/babel-preset-minify.svg?maxAge=86400)](https://www.npmjs.com/package/babel-preset-minify) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-preset-minify)](https://david-dm.org/babel/minify?path=packages/babel-preset-minify) |

### Install

```sh
npm install babel-preset-minify --save-dev
```

### Usage

> note: minify is still in beta, so we don't recommend using it for production code but rather the production environment.

When testing, it's recommended to run minifiers for production so less code is sent to end-users vs. in development where it can be an issue for readability when debugging. Check out the [env docs](http://babeljs.io/docs/usage/babelrc/#env-option) for more help.

> Options specific to a certain environment are merged into and overwrite non-env specific options.

`.babelrc`:

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

## Individual Plugins

The `minify` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel) itself.

The npm package `babel-preset-minify` is at the path `packages/babel-preset-minify`

| Package | Version | Dependencies |
|--------|-------|------------|
| [`babel-plugin-minify-constant-folding`](/packages/babel-plugin-minify-constant-folding) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-constant-folding.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-constant-folding) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-constant-folding)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-constant-folding) |
| [`babel-plugin-minify-dead-code-elimination`](/packages/babel-plugin-minify-dead-code-elimination) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-dead-code-elimination.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-dead-code-elimination) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-dead-code-elimination)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-dead-code-elimination) |
| [`babel-plugin-minify-flip-comparisons`](/packages/babel-plugin-minify-flip-comparisons) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-flip-comparisons.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-flip-comparisons) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-flip-comparisons)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-flip-comparisons) |
| [`babel-plugin-minify-guarded-expressions`](/packages/babel-plugin-minify-guarded-expressions) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-guarded-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-guarded-expressions) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-guarded-expressions)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-guarded-expressions) |
| [`babel-plugin-minify-infinity`](/packages/babel-plugin-minify-infinity) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-infinity.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-infinity) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-infinity)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-infinity) |
| [`babel-plugin-minify-mangle-names`](/packages/babel-plugin-minify-mangle-names) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-mangle-names.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-mangle-names) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-mangle-names)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-mangle-names) |
| [`babel-plugin-minify-replace`](/packages/babel-plugin-minify-replace) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-replace.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-replace) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-replace)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-replace) |
| [`babel-plugin-minify-simplify`](/packages/babel-plugin-minify-simplify) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-simplify.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-simplify) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-simplify)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-simplify) |
| [`babel-plugin-minify-type-constructors`](/packages/babel-plugin-minify-type-constructors) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-type-constructors.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-minify-type-constructors) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-minify-type-constructors)](https://david-dm.org/babel/minify?path=packages/babel-plugin-minify-type-constructors) |
| [`babel-plugin-transform-member-expression-literals`](/packages/babel-plugin-transform-member-expression-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-member-expression-literals.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-member-expression-literals) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-member-expression-literals)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-member-expression-literals) |
| [`babel-plugin-transform-merge-sibling-variables`](/packages/babel-plugin-transform-merge-sibling-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-merge-sibling-variables.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-merge-sibling-variables) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-merge-sibling-variables)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-merge-sibling-variables) |
| [`babel-plugin-transform-minify-booleans`](/packages/babel-plugin-transform-minify-booleans) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-minify-booleans.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-minify-booleans) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-minify-booleans)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-minify-booleans) |
| [`babel-plugin-transform-property-literals`](/packages/babel-plugin-transform-property-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-property-literals.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-property-literals) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-property-literals)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-property-literals) |
| [`babel-plugin-transform-simplify-comparison-operators`](/packages/babel-plugin-transform-simplify-comparison-operators) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-simplify-comparison-operators.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-simplify-comparison-operators) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-simplify-comparison-operators)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-simplify-comparison-operators) |
| [`babel-plugin-transform-undefined-to-void`](/packages/babel-plugin-transform-undefined-to-void) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-undefined-to-void.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-undefined-to-void) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-undefined-to-void)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-undefined-to-void) |

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
| [`babel-plugin-transform-inline-environment-variables`](/packages/babel-plugin-transform-inline-environment-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-inline-environment-variables.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-inline-environment-variables)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-inline-environment-variables) |
| [`babel-plugin-transform-node-env-inline`](/packages/babel-plugin-transform-node-env-inline) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-node-env-inline.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-node-env-inline) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-node-env-inline)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-node-env-inline) |
| [`babel-plugin-transform-remove-console`](/packages/babel-plugin-transform-remove-console) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-console) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-remove-console)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-remove-console) |
| [`babel-plugin-transform-remove-debugger`](/packages/babel-plugin-transform-remove-debugger) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/babel-plugin-transform-remove-debugger) | [![Dependency Status](https://david-dm.org/babel/minify.svg?path=packages/babel-plugin-transform-remove-debugger)](https://david-dm.org/babel/minify?path=packages/babel-plugin-transform-remove-debugger) |

## Benchmarks

> Bootstrap: `npm run bootstrap`

> Build: `npm run build`

> Running the benchmarks: `./scripts/benchmark.js [file...]` - defaults to a few packages fetched from unpkg.com and is defined in benchmark.js.

> Note: All Input sources are ES5.

Benchmark Results for react.js:

Input Size: 54.79KB

Input Size (gzip): 15.11KB

| minifier                | output raw  | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| ----------------------- | ----------- | ------- | ----------- | -------- | --------------- | ---------------- |
| **babel-minify**        | 15.97KB     | 71%     | 6.08KB      | 60%      | 1.00            | 1039.06          |
| **terser**              | **15.65KB** | **71%** | **5.98KB**  | **60%**  | **0.93**        | **532.19**       |
| **uglify**              | 15.6KB      | 72%     | 6KB         | 60%      | 1.09            | 463.69           |
| **closure-compiler**    | 15.74KB     | 71%     | 6.04KB      | 60%      | 1.22            | 2361.41          |
| **closure-compiler-js** | 18.21KB     | 67%     | 6.73KB      | 55%      | 1.08            | 3381.47          |

Benchmark Results for vue.js:

Input Size: 282.52KB

Input Size (gzip): 77.52KB

| minifier                | output raw   | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| ----------------------- | ------------ | ------- | ----------- | -------- | --------------- | ---------------- |
| **babel-minify**        | 104.21KB     | 63%     | 38.71KB     | 50%      | 6.09            | 3538.30          |
| **terser**              | **103.12KB** | **63%** | **37.92KB** | **51%**  | **6.42**        | **1680.85**      |
| **uglify**              | 102.71KB     | 64%     | 38.08KB     | 51%      | 6.59            | 1662.50          |
| **closure-compiler**    | 101.93KB     | 64%     | 38.6KB      | 50%      | 10.41           | 4413.06          |
| **closure-compiler-js** | 105.18KB     | 63%     | 39.5KB      | 49%      | 6.79            | 12082.80         |

Benchmark Results for lodash.js:

Input Size: 527.18KB

Input Size (gzip): 94.04KB

| minifier                | output raw  | raw win | gzip output | gzip win | parse time (ms) | minify time (ms) |
| ----------------------- | ----------- | ------- | ----------- | -------- | --------------- | ---------------- |
| **babel-minify**        | 69.59KB     | 87%     | 24.37KB     | 74%      | 5.38            | 2587.27          |
| **terser**              | 68.66KB     | 87%     | 24.31KB     | 74%      | 6.41            | 1913.43          |
| **uglify**              | **68.15KB** | **87%** | **24.05KB** | **74%**  | **5.89**        | **2075.71**      |
| **closure-compiler**    | 71.05KB     | 87%     | 24.19KB     | 74%      | 6.24            | 4119.43          |
| **closure-compiler-js** | 73.51KB     | 86%     | 24.94KB     | 73%      | 5.17            | 9650.59          |

Benchmark Results for three.js:

Input Size: 1.05MB

Input Size (gzip): 212.43KB

| minifier                | output raw   | raw win | gzip output  | gzip win | parse time (ms) | minify time (ms) |
| ----------------------- | ------------ | ------- | ------------ | -------- | --------------- | ---------------- |
| **babel-minify**        | 535.88KB     | 50%     | 134.66KB     | 37%      | 27.24           | 9988.57          |
| **terser**              | **536.16KB** | **50%** | **132.78KB** | **37%**  | **28.39**       | **3919.34**      |
| **uglify**              | 533.42KB     | 50%     | 133.21KB     | 37%      | 26.15           | 4025.20          |
| **closure-compiler**    | 532.44KB     | 51%     | 134.41KB     | 37%      | 29.96           | 9029.19          |
| **closure-compiler-js** | 543.08KB     | 50%     | 136.3KB      | 36%      | 24.36           | 95743.77         |

## Browser support

Babel Minify is best at targeting latest browsers ([with full ES6+ support](https://kangax.github.io/compat-table/es6/)) but can also be used with the usual Babel es2015 preset to transpile down the code first.

## Team

[![Amjad Masad](https://avatars.githubusercontent.com/u/587518?s=96)](https://github.com/amasad) | [![Boopathi Rajaa](https://avatars.githubusercontent.com/u/294474?s=96)](https://github.com/boopathi) | [![Juriy Zaytsev](https://avatars.githubusercontent.com/u/383?s=96)](https://github.com/kangax) | [![Henry Zhu](https://avatars.githubusercontent.com/u/588473?s=96)](https://github.com/hzoo) | [![Vignesh Shanmugam](https://avatars0.githubusercontent.com/u/3902525?s=96)](https://github.com/vigneshshanmugam)
---|---|---|---|---|
Amjad Masad | Boopathi Rajaa | Juriy Zaytsev | Henry Zhu | Vignesh Shanmugam
[@amasad](https://github.com/amasad) | [@boopathi](https://github.com/boopathi) | [@kangax](https://github.com/kangax) | [@hzoo](https://github.com/hzoo) | [@vigneshshanmugam](https://github.com/vigneshshanmugam)
[@amasad](https://twitter.com/amasad) | [@heisenbugger](https://twitter.com/heisenbugger) | [@kangax](https://twitter.com/kangax) | [@left_pad](https://twitter.com/left_pad) | [@_vigneshh](https://twitter.com/_vigneshh)
