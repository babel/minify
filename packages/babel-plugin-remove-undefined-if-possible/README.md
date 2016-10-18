# babel-plugin-remove-undefined-if-possible

For variable assignments, this removes rvals that evaluate to `undefined`
(`var`s in functions only).
For functions, this removes return arguments that evaluate to `undefined`.

## Example

**In**

```javascript
let a = void 0;
function foo() {
  var b = undefined;
  return undefined;
}
```

**Out**

```javascript
let a;
function foo() {
  var b;
  return;
}
```

## Installation

```sh
$ npm install babel-plugin-remove-undefined-if-possible
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["babel-plugin-remove-undefined-if-possible"]
}
```

### Via CLI

```sh
$ babel --plugins babel-plugin-remove-undefined-if-possible script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["babel-plugin-remove-undefined-if-possible"]
});
```
