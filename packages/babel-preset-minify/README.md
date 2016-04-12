# babel-preset-minify

> Babel preset for all minify plugins.

## Install

```sh
$ npm install --save-dev babel-preset-minify
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["minify"]
}
```

### Via CLI

```sh
$ babel script.js --presets minify
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["minify"]
});
```
