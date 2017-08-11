# babili

Node API and CLI

[`babili`](/packages/babili) [![npm](https://img.shields.io/npm/v/babili.svg?maxAge=2592000)](https://www.npmjs.com/package/babili)

Use `babili` if you don't already use babel (as a preset) or want to run it standalone.

## Installation

```sh
npm install babili --save-dev
```

## Usage

### Node API

```js
const babili = require("babili");

const {code, map} = babili("input code", {
  mangle: {
    keepClassName: true
  }
});
```

### CLI

```sh
babili input.js --out-file input.min.js --mangle.keepClassName
```

## Node API

```js
const babili = require("babili");

babili(input, babiliOptions, overrides)
```

### babiliOptions

Refer [babel-preset-babili options](../babel-preset-babili#options)

## CLI Options

```
babili input.js [options]
```

### Simple preset options

For simple options, use `--optionName` in CLI

Refer [preset's 1-1 options](../packages/babel-preset-babili#1-1-mapping-with-plugin) for the list of options

Example:

```
babili input.js --mangle false
```

### Nested preset options

Usage: `--optionName.featureName`

Example:

```sh
babili input.js --mangle.keepClassName --deadcode.keepFnArgs --outFile input.min.js
```

Refer the corresponding plugins to know the list of options it takes

### IO options

+ `--out-file path/to/file.min.js`: Output filename. Used only when reading from STDIN / a single input file
+ `--out-dir path/to/dir`: Output Directory.
