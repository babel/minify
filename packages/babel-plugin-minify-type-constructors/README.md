# babel-plugin-minify-type-constructors

## Installation

```sh
$ npm install babel-plugin-minify-type-constructors
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-type-constructors"]
}
```

### Via CLI

```sh
$ babel --plugins minify-type-constructors script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-type-constructors"]
});
```
