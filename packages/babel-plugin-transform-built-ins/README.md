# babel-plugin-transform-built-ins

Transform Standard built-in Objects

## Example

**In**

```javascript
Math.floor(a) + Math.floor(b)
```

**Out**

```javascript
var _Mathfloor = Math.floor;

_Mathfloor(a) + _Mathfloor(b);
```

## Installation

```sh
npm install babel-plugin-transform-built-ins
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-built-ins"]
}
```

### Via CLI

```sh
babel --plugins transform-built-ins script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-built-ins"]
});
```
