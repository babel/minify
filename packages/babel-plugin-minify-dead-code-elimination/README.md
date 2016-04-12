# babel-plugin-minify-dead-code-elimination

## Installation

```sh
$ npm install babel-plugin-minify-dead-code-elimination
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-dead-code-elimination"]
}
```

### Via CLI

```sh
$ babel --plugins minify-dead-code-elimination script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-dead-code-elimination"]
});
```
