# babel-plugin-transform-consecutive-attribute-defs

This plugin inlines consecutive attribute definitions.

## Example

**In**

```javascript
const foo = {};
foo.a = 42;
foo.b = ["hi"];
foo.c = bar();
foo.d = "str";
```

**Out**

```javascript
const foo = {
  a: 42,
  b: ["hi"],
  c: bar(),
  d: "str"
};
```

## Installation

```sh
$ npm install babel-plugin-transform-consecutive-attribute-defs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-consecutive-attribute-defs"]
}
```

### Via CLI

```sh
$ babel --plugins transform-consecutive-attribute-defs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-consecutive-attribute-defs"]
});
```
