# babel-plugin-minify-replace

## Installation

```sh
$ npm install babel-plugin-minify-replace
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["minify-replace"]
}

// with plugins
{
  "plugins": ["minify-replace", {
    "identifierName": "__DEV__",
    "replacement": {
      "type": "booleanLiteral",
      "value": true
    }
  }]
}
```

### Via CLI

```sh
$ babel --plugins minify-replace script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-replace"]
});
```
