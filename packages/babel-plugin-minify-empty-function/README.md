# babel-plugin-minify-empty-function

This is mostly a Facebook-specific transform that removes noop function calls. However, can be generalized to detect and remove noops.

## Example

**In**

```javascript
function emptyFunction(){}
emptyFunction('how long','?');
foo(emptyFunction('how long', '?'));
```

**Out**

```javascript
function emptyFunction(){}
foo(false);
```

## Installation

```sh
npm install babel-plugin-minify-empty-function
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-empty-function"]
}
```

### Via CLI

```sh
babel --plugins minify-empty-function script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-empty-function"]
});
```
