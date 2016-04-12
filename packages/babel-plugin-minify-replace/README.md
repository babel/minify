# babel-plugin-minify-replace

## Installation

```sh
$ npm install babel-plugin-minify-replace
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-replace"]
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
