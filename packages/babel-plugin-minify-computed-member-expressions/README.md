# babel-plugin-minify-computed-member-expressions

## Installation

```sh
$ npm install babel-plugin-minify-computed-member-expressions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-computed-member-expressions"]
}
```

### Via CLI

```sh
$ babel --plugins minify-computed-member-expressions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-computed-member-expressions"]
});
```
