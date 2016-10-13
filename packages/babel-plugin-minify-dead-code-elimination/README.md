# babel-plugin-minify-dead-code-elimination

Inlines bindings when possible. Tries to evaluate expressions and prunes unreachable as a result.

## Example

**In**

```javascript
function foo() {var x = 1;}
function bar() { var x = f(); }
function baz() {
  var x = 1;
  console.log(x);
}
foo(0 && bar());
```

**Out**

```javascript
function foo() {}
function bar() { f(); }
function baz() {
  console.log(1);
}
foo(0);
```

## Installation

```sh
$ npm install babel-plugin-minify-dead-code-elimination
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["minify-dead-code-elimination"]
}

// with options
{
  "plugins": ["minify-dead-code-elimination", { "optimizeRawSize": true }]
}
```

### Via CLI

```sh
$ babel --plugins minify-dead-code-elimination script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-dead-code-elimination"]
});
```

## Options

+ `keepFnName` - prevent plugin from removing function name. Useful for code depending on `fn.name`
+ `keepFnArgs` - prevent plugin from removing function args. Useful for code depending on `fn.length`
