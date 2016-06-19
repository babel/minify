# babel-plugin-minify-guarded-expressions

## Installation

```sh
$ npm install babel-plugin-minify-guarded-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-guarded-expressions"]
}
```

### Via CLI

```sh
$ babel --plugins minify-guarded-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-guarded-expressions"]
});
```
