## babel-minify

A collection of babel minification plugins.

[![Build Status](https://img.shields.io/travis/amasad/babel-minify/master.svg?style=flat)](https://travis-ci.org/amasad/babel-minify)

babel-minify is consumable via API, CLI, or babel preset.

## Plugins

### [minify-constant-folding](/packages/babel-plugin-minify-constant-folding)

Tries to evaluate expressions and inline the result. For now only deals with
numbers and strings.

**In**
```js
  "a" + "b"
  2 * 3;
  4 | 3;
  "b" + a + "c" + "d" + g + z + "f" + "h" + "z"
```

**Out**
```js
  "ab";
  6;
  7;
  "b" + a + "cd" + g + z + "fhz";
```

### [minify-dead-code-elimination](/packages/babel-plugin-minify-dead-code-elimination)

Dead code elimination plugin. Inlines bindings when possible. Tries to evaluate expressions and prunes unreachable as a result.

**In**
```js
function foo() {
  var x = 1;
}
function foo2() {
  var x = f();
}
```

**Out**
```js
function foo() {}
function foo2() { f(); }
```

### [minify-empty-function](/packages/babel-plugin-minify-empty-function)

This is mostly a Facebook-specific transform that removes noop function
calls. However, can be generalized to detect and remove noops.

### [minify-mangle-names](/packages/babel-plugin-minify-mangle-names)

Context and scope aware variable renaming.

**In**
```js
var longVariableName = 1;
var longVariableName2 = 2;
```

**Out**
```js
var a = 1;
var b = 2;
```

### [minify-replace](/packages/babel-plugin-minify-replace)

Replaces matching nodes in the tree with a given replacement node. For example
you can replace `process.NODE_ENV` with `"production"`.

**Plugin Options**
```js
{
    replacements: [
        {
            identifierName: '__DEV__',
            replacement: {
              type: 'numericLiteral',
              value: 0,
            }
        }
    ]
}
```

**In**
```js
if (__DEV__) {
  foo();
}
```

**Out**
```js
if (0) {
  foo();
}
```

### [minify-simplify](/packages/babel-plugin-minify-simplify)

This plugin will transform code in mainly two ways:

1. Reduce as much statements as possible into expressions

**In**
```js
function foo() {
  if (x) a();
}
function foo2() {
  if (x) a();
  else b();
}
```

**Out**
```js
function foo() {
  x && a();
}
function foo2() {
  x ? a() : b();
}
```

2. Make expressions as uniform as possible for better compressibility

**In**
```js
undefined
foo['bar']
Number(foo)
```

**Out**
```js
void 0
foo.bar
+foo
```

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

## Contributing

### Setup
```sh
$ git clone https://github.com/amasad/babel-minify
$ cd babel-minify
$ npm install
$ npm run bootstrap
```

Then you can either run:

```sh
$ make build
```

to build Babel **once** or:

```sh
$ make watch
```

to have Babel build itself then incrementally build files on change.

To run tests:
```sh
$ npm test
```
