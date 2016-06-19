# babel-plugin-minify-undefined

## Installation

```sh
$ npm install babel-plugin-minify-undefined
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-undefined"]
}
```

### Via CLI

```sh
$ babel --plugins minify-undefined script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-undefined"]
});
```
