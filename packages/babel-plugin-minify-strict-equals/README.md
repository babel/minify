# babel-plugin-minify-strict-equals

## Installation

```sh
$ npm install babel-plugin-minify-strict-equals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-strict-equals"]
}
```

### Via CLI

```sh
$ babel --plugins minify-strict-equals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-strict-equals"]
});
```
