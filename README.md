<h1 align="center">babel-minify</h1>

<p align="center">
  <strong>An ES6+ aware minifier based on the Babel toolchain.</strong>
</p>

<p align="center">
  <a href="https://travis-ci.org/amasad/babel-minify"><img alt="Travis Status" src="https://img.shields.io/travis/amasad/babel-minify/master.svg?style=flat&label=travis"></a>
  <a href="https://slack.babeljs.io/"><img alt="Slack Status" src="https://slack.babeljs.io/badge.svg"></a>
</p>

- Checkout our [CONTRIBUTING.md](/CONTRIBUTING.md) if you want to help out!

- babel-minify is consumable via API, CLI, or babel preset.

## [CLI](http://babeljs.io/docs/usage/cli/)

| Package | Version | Dependencies | DevDependencies |
|--------|-------|------------|----------|
| [`babel-minify`](/packages/babel-minify) | [![npm](https://img.shields.io/npm/v/babel-minify.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-minify) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-minify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-minify) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-minify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-minify#info=devDependencies) |

This is simple wrapper around the regular `babel-cli` and thus takes in the same [cli options](http://babeljs.io/docs/usage/cli/#options) as running babel on its own. You can use this if you don't already use babel or want to run it standalone.

### Usage

`babel-minify src -d lib`

Equivalent to:
`babel src -d lib --presets=minify`

## [Babel preset](http://babeljs.io/docs/plugins/#presets)

Works just like any other preset (like `es2015`).

| Package | Version | Dependencies | DevDependencies |
|--------|-------|------------|----------|
| [`babel-preset-minify`](/packages/babel-preset-minify) | [![npm](https://img.shields.io/npm/v/babel-preset-minify.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-preset-minify) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-preset-minify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-preset-minify) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-preset-minify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-preset-minify#info=devDependencies) |

### Usage

You'll most likely want to use it only in the production environment. Check out the [env docs](http://babeljs.io/docs/usage/babelrc/#env-option) for more help.

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

## [Plugins](http://babeljs.io/docs/plugins/) (in `babel-preset-minify`)

The `babel-minify` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel) itself.

The npm package `babel-preset-minify` is at the path `packages/babel-preset-minify`

| Package | Version | Dependencies | DevDependencies |
|--------|-------|------------|----------|
| [`babel-plugin-minify-constant-folding`](/packages/babel-plugin-minify-constant-folding) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-constant-folding.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-constant-folding) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-constant-folding)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-constant-folding) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-constant-folding)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-constant-folding#info=devDependencies) |
| [`babel-plugin-minify-dead-code-elimination`](/packages/babel-plugin-minify-dead-code-elimination) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-dead-code-elimination.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-dead-code-elimination) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-dead-code-elimination)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-dead-code-elimination) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-dead-code-elimination)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-dead-code-elimination#info=devDependencies) |
| [`babel-plugin-minify-flip-comparisons`](/packages/babel-plugin-minify-flip-comparisons) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-flip-comparisons.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-flip-comparisons) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-flip-comparisons)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-flip-comparisons) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-flip-comparisons)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-flip-comparisons#info=devDependencies) |
| [`babel-plugin-minify-guarded-expressions`](/packages/babel-plugin-minify-guarded-expressions) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-guarded-expressions.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-guarded-expressions) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-guarded-expressions)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-guarded-expressions) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-guarded-expressions)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-guarded-expressions#info=devDependencies) |
| [`babel-plugin-minify-infinity`](/packages/babel-plugin-minify-infinity) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-infinity.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-infinity) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-infinity)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-infinity) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-infinity)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-infinity#info=devDependencies) |
| [`babel-plugin-minify-mangle-names`](/packages/babel-plugin-minify-mangle-names) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-mangle-names.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-mangle-names) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-mangle-names)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-mangle-names) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-mangle-names)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-mangle-names#info=devDependencies) |
| [`babel-plugin-minify-replace`](/packages/babel-plugin-minify-replace) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-replace.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-replace) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-replace)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-replace) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-replace)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-replace#info=devDependencies) |
| [`babel-plugin-minify-simplify`](/packages/babel-plugin-minify-simplify) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-simplify.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-simplify) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-simplify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-simplify) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-simplify)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-simplify#info=devDependencies) |
| [`babel-plugin-minify-type-constructors`](/packages/babel-plugin-minify-type-constructors) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-type-constructors.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-type-constructors) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-type-constructors)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-type-constructors) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-type-constructors)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-type-constructors#info=devDependencies) |
| [`babel-plugin-transform-member-expression-literals`](/packages/babel-plugin-transform-member-expression-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-member-expression-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-member-expression-literals) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-member-expression-literals)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-member-expression-literals) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-member-expression-literals)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-member-expression-literals#info=devDependencies) |
| [`babel-plugin-transform-merge-sibling-variables`](/packages/babel-plugin-transform-merge-sibling-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-merge-sibling-variables.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-merge-sibling-variables) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-merge-sibling-variables)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-merge-sibling-variables) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-merge-sibling-variables)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-merge-sibling-variables#info=devDependencies) |
| [`babel-plugin-transform-minify-booleans`](/packages/babel-plugin-transform-minify-booleans) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-minify-booleans.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-minify-booleans) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-minify-booleans)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-minify-booleans) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-minify-booleans)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-minify-booleans#info=devDependencies) |
| [`babel-plugin-transform-property-literals`](/packages/babel-plugin-transform-property-literals) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-property-literals.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-property-literals) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-property-literals)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-property-literals) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-property-literals)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-property-literals#info=devDependencies) |
| [`babel-plugin-transform-simplify-comparison-operators`](/packages/babel-plugin-transform-simplify-comparison-operators) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-simplify-comparison-operators.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-simplify-comparison-operators) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-simplify-comparison-operators)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-simplify-comparison-operators) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-simplify-comparison-operators)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-simplify-comparison-operators#info=devDependencies) |
| [`babel-plugin-transform-undefined-to-void`](/packages/babel-plugin-transform-undefined-to-void) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-undefined-to-void.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-undefined-to-void) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-undefined-to-void)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-undefined-to-void) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-undefined-to-void)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-undefined-to-void#info=devDependencies) |

### Other

| Package | Version | Dependencies | DevDependencies |
|--------|-------|------------|----------|
| [`babel-plugin-minify-empty-function`](/packages/babel-plugin-minify-empty-function) | [![npm](https://img.shields.io/npm/v/babel-plugin-minify-empty-function.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-minify-empty-function) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-minify-empty-function)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-empty-function) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-minify-empty-function)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-minify-empty-function#info=devDependencies) |
| [`babel-plugin-transform-inline-environment-variables`](/packages/babel-plugin-transform-inline-environment-variables) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-inline-environment-variables.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-inline-environment-variables) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-inline-environment-variables)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-inline-environment-variables) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-inline-environment-variables)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-inline-environment-variables#info=devDependencies) |
| [`babel-plugin-transform-node-env-inline`](/packages/babel-plugin-transform-node-env-inline) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-node-env-inline.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-node-env-inline) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-node-env-inline)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-node-env-inline) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-node-env-inline)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-node-env-inline#info=devDependencies) |
| [`babel-plugin-transform-remove-console`](/packages/babel-plugin-transform-remove-console) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-console.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-remove-console) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-remove-console)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-remove-console) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-remove-console)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-remove-console#info=devDependencies) |
| [`babel-plugin-transform-remove-debugger`](/packages/babel-plugin-transform-remove-debugger) | [![npm](https://img.shields.io/npm/v/babel-plugin-transform-remove-debugger.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-plugin-transform-remove-debugger) | [![Dependency Status](https://david-dm.org/amasad/babel-minify.svg?path=packages/babel-plugin-transform-remove-debugger)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-remove-debugger) | [![devDependency Status](https://david-dm.org/amasad/babel-minify/dev-status.svg?path=packages/babel-plugin-transform-remove-debugger)](https://david-dm.org/amasad/babel-minify?path=packages/babel-plugin-transform-remove-debugger#info=devDependencies) |

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
