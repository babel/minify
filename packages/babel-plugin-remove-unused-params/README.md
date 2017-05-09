# babel-plugin-remove-unused-params

This plugin removes unused trailing function parameters.

## Example

**In**

```javascript
function foo(a, b) {
  return a;
}
```

**Out**

```javascript
function foo(a) {
  return a;
}
```

## Installation

```sh
$ npm install babel-plugin-remove-unused-params
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["remove-unused-params"]
}
```

### Via CLI

```sh
$ babel --plugins remove-unused-params script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["remove-unused-params"]
});
```
