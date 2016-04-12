# babel-plugin-minify-constant-folding

## Installation

```sh
$ npm install babel-plugin-minify-constant-folding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-constant-folding"]
}
```

### Via CLI

```sh
$ babel --plugins minify-constant-folding script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-constant-folding"]
});
```
