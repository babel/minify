# babel-minify

Node API and CLI

[![npm](https://img.shields.io/npm/v/babel-minify.svg?maxAge=2592000)](https://www.npmjs.com/package/babel-minify)

Use `babel-minify` if you don't already use babel (as a preset) or want to run it standalone.

## Installation

```sh
npm install babel-minify --save-dev
```

## Usage

### Node API

```js
const minify = require("babel-minify");

const {code, map} = minify("input code", {
  mangle: {
    keepClassName: true
  }
});
```

### CLI

```sh
minify input.js --out-file input.min.js --mangle.keepClassName
```

## Node API

```js
const minify = require("babel-minify");

minify(input, minifyOptions, overrides)
```

### minifyOptions

Refer [babel-preset-minify options](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options)

### overrides

+ `babel`: Custom babel
+ `minifyPreset`: Custom minify preset
+ `inputSourceMap`: Input Sourcemap
+ `sourceMaps`: [Boolean]
+ `comments`: [Function | RegExp | Boolean]

## CLI Options

```
minify input.js [options]
```

### Simple preset options

For simple options, use `--optionName` in CLI

Refer [preset's 1-1 options](https://github.com/babel/minify/tree/master/packages/babel-preset-minify#1-1-mapping-with-plugin) for the list of options

Example:

```
minify input.js --mangle false
```

### Nested preset options

Usage: `--optionName.featureName`

Example:

```sh
minify input.js --mangle.keepClassName --deadcode.keepFnArgs --outFile input.min.js
```

Refer the corresponding plugins to know the list of options it takes

### IO options

+ `--out-file path/to/file.min.js`: Output filename. Used only when reading from STDIN / a single input file
+ `--out-dir path/to/dir`: Output Directory.
