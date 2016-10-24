# babel-plugin-transform-inline-temp-return

This removes the temporary variable right before return statements, if it is
also the return value.

## Example

**In**

```javascript
function foo() {
  let a = bar();
  return a;
}
```

**Out**

```javascript
function foo() {
  return bar();
}
```

## Installation

```sh
$ npm install babel-plugin-transform-inline-temp-return
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-inline-temp-return"]
}
```

### Via CLI

```sh
$ babel --plugins transform-inline-temp-return script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-inline-temp-return"]
});
```
