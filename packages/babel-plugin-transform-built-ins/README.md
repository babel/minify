# babel-plugin-transform-built-ins

Transform Standard built-in Objects

## Example

**In**

```javascript
Math.floor(2) + Math.floor(3)
```

**Out**

```javascript
var _temp = Math.floor;

_temp(2) + _temp(3);
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
