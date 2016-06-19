# babel-plugin-minify-flip-comparisons

## Installation

```sh
$ npm install babel-plugin-minify-flip-comparisons
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-flip-comparisons"]
}
```

### Via CLI

```sh
$ babel --plugins minify-flip-comparisons script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-flip-comparisons"]
});
```
