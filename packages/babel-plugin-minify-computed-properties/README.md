# babel-plugin-minify-computed-properties

## Installation

```sh
$ npm install babel-plugin-minify-computed-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-computed-properties"]
}
```

### Via CLI

```sh
$ babel --plugins minify-computed-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-computed-properties"]
});
```
