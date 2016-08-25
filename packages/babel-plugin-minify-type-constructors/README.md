# babel-plugin-minify-type-constructors

**Note:** Not recommended if full support for IE8 and lower is required. [Details](https://github.com/babel/babili/pull/45#discussion_r70181249)

## Example

**In**

```javascript
Boolean(x);
Number(x);
String(x);
```

**Out**

```javascript
!!x;
+x;
x + "";
```

## Installation

```sh
$ npm install babel-plugin-minify-type-constructors
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-type-constructors"]
}
```

### Via CLI

```sh
$ babel --plugins minify-type-constructors script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-type-constructors"]
});
```
