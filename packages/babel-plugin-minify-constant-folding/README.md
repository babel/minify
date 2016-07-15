# babel-plugin-minify-constant-folding

Tries to evaluate expressions and inline the result. For now only deals with numbers and strings.

## Example

**In**

```javascript
"a" + "b"
2 * 3;
4 | 3;
"b" + a + "c" + "d" + g + z + "f" + "h" + "z"
```

**Out**

```javascript
"ab";
6;
7;
"b" + a + "cd" + g + z + "fhz";
```

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
