# babel-plugin-minify-constant-folding

## Example

**In**

```javascript
"a" + "b"
2 * 3;
1/3;
4 | 3;
a(), b();
var x = 1;
foo(x);
"b" + a + "c" + "d" + g + z + "f" + "h" + "z"
```

**Out**

```javascript
"ab";
6;
1 / 3;
7;
a(), b();
var x = 1;
foo(x);
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
