# babel-plugin-minify-mangle-names

## Installation

```sh
$ npm install babel-plugin-minify-mangle-names
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-mangle-names"]
}
```

### Via CLI

```sh
$ babel --plugins minify-mangle-names script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-mangle-names"]
});
```
