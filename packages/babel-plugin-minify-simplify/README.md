# babel-plugin-minify-simplify

## Installation

```sh
$ npm install babel-plugin-minify-simplify
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-simplify"]
}
```

### Via CLI

```sh
$ babel --plugins minify-simplify script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-simplify"]
});
```
