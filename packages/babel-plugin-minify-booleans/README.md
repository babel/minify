# babel-plugin-minify-booleans

## Installation

```sh
$ npm install babel-plugin-minify-booleans
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-booleans"]
}
```

### Via CLI

```sh
$ babel --plugins minify-booleans script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-booleans"]
});
```
