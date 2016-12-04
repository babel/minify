# babili

[`babili`](/packages/babili) [![npm](https://img.shields.io/npm/v/babili.svg?maxAge=2592000)](https://www.npmjs.com/package/babili)

Use `babili` if you don't already use babel (as a preset) or want to run it standalone. Equivalent to using `babel-cli` but only for minification.

## Installation

```sh
npm install babili --save-dev
```

### Usage

```bash
# global
babili src -d lib
# local
./node_modules/.bin/babili src -d lib
```

Equivalent to:
`babel src -d lib --presets=babili`
