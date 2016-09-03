# babel-preset-babili

> Babel preset for all minify plugins.

## Install

```sh
$ npm install --save-dev babel-preset-babili
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["babili"]
}
```

### Via CLI

```sh
$ babel script.js --presets babili
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["babili"]
});
```
