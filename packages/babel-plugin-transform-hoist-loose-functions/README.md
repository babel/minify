# babel-plugin-transform-hoist-loose-functions

This plugin hoists functions in loose-mode to their enclosing function or
program scope.

## Example

**In**

```javascript
function foo() {
  if (a) {
    function bar() {}
  }
}
```

**Out**

```javascript
function foo() {
  function bar() {}

  if (a) {}
}
```

## Installation

```sh
npm install babel-plugin-transform-hoist-loose-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-hoist-loost-functions"]
}
```

### Via CLI

```sh
babel --plugins transform-hoist-loose-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-hoist-loose-functions"]
});
```

### Options

None
