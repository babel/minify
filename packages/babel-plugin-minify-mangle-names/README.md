# babel-plugin-minify-mangle-names

## Example

**In**

```javascript
var globalVariableName = 42;
function foo() {
  var longLocalVariableName = 1;
  if (longLocalVariableName) {
    console.log(longLocalVariableName);
  }
}
```

**Out**

```javascript
var globalVariableName = 42;
function foo() {
  var a = 1;
  if (a) {
    console.log(a);
  }
}
```

## Installation

```sh
$ npm install babel-plugin-minify-mangle-names
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["minify-mangle-names"]
}

// with options
{
  "plugins": ["minify-mangle-names", { "mangleBlacklist": { "foo": true, "bar": true} }]
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
