# babel-preset-babili

Babel preset for all minify plugins.

+ [Install](#install)
+ [Usage](#usage)
+ [Options](#options)

## Install

```sh
npm install --save-dev babel-preset-babili
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["babili"]
}
```

or pass in options -

```json
{
  "presets": [["babili", {
    "mangle": {
      "blacklist": ["MyCustomError"]
    },
    "unsafe": {
      "typeConstructors": false
    },
    "keepFnName": true
  }]]
}
```

### Via CLI

```sh
babel script.js --presets babili
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["babili"]
});
```

## Options

All options are **enabled** by default **except** the ones with explicit mention - `(Default: false)`

Three types of options:

### 1-1 mapping with plugin

+ `false` to disable the plugin
+ `true` to enable the plugin with default plugin specific options
+ `{ ...pluginOpts }` to enable the plugin with custom plugin options

The following options have 1-1 mapping with a plugin,
+ `evaluate` - [babel-plugin-minify-constant-folding](../../packages/babel-plugin-minify-constant-folding)
+ `deadcode` - [babel-plugin-minify-dead-code-elimination](../../packages/babel-plugin-minify-dead-code-elimination)
+ `infinity` - [babel-plugin-minify-infinity](../../packages/babel-plugin-minify-infinity)
+ `mangle` - [babel-plugin-minify-mangle-names](../../packages/babel-plugin-minify-mangle-names)
+ `numericLiterals` - [babel-plugin-minify-numeric-literals](../../packages/babel-plugin-minify-numeric-literals)
+ `replace` - [babel-plugin-minify-replace](../../packages/babel-plugin-minify-replace)
+ `simplify` - [babel-plugin-minify-simplify](../../packages/babel-plugin-minify-simplify)
+ `mergeVars` - [babel-plugin-transform-merge-sibling-variables](../../packages/babel-plugin-transform-merge-sibling-variables)
+ `booleans` - [babel-plugin-transform-minify-booleans](../../packages/babel-plugin-transform-minify-booleans)
+ `regexpConstructors` - [babel-plugin-transform-regexp-constructors](../../packages/babel-plugin-transform-regexp-constructors)
+ `removeConsole` - `(Default: false)` - [babel-plugin-transform-remove-console](../../packages/babel-plugin-transform-remove-console)
+ `removeDebugger` - `(Default: false)` - [babel-plugin-transform-remove-debugger](../../packages/babel-plugin-transform-remove-debugger)
+ `removeUndefined` - [babel-plugin-transform-remove-undefined](../../packages/babel-plugin-transform-remove-undefined)
+ `undefinedToVoid` - [babel-plugin-transform-undefined-to-void](../../packages/babel-plugin-transform-undefined-to-void)

**Examples**

```json
{
  "presets": [["babili", {
    "evaluate": false,
    "mangle": true
  }]]
}
```

```json
{
  "presets": [["babili", {
    "mangle": {
      "blacklist": [
        "ParserError",
        "NetworkError"
      ]
    }
  }]]
}
```

### Option groups

+ `false` to disable the entire group
+ `true` to enable every plugin in the group
+ `{ pluginKey: <1-1 mapping> }` - enable/disable a particular plugin in a group (or) pass options to that plugin

The following are groups of plugins -

+ `unsafe`
  + `flipComparisons` - [babel-plugin-minify-flip-comparisons](../../packages/babel-plugin-minify-flip-comparisons)
  + `simplifyComparisons` - [babel-plugin-transform-simplify-comparison-operators](../../babel-plugin-transform-simplify-comparison-operators)
  + `guards` - [babel-plugin-minify-guarded-expressions](../../packages/babel-plugin-minify-guarded-expressions)
  + `typeConstructors` - [babel-plugin-minify-type-constructors](../../packages/babel-plugin-minify-type-constructors)
+ `properties`
  + `memberExpressions` - [babel-plugin-transform-member-expression-literals](../../packages/babel-plugin-transform-member-expression-literals)
  + `propertyLiterals` - [babel-plugin-transform-property-literals](../../packages/babel-plugin-transform-property-literals)

**Examples**

Disables all unsafe plugins:

```json
{
  "presets": [["babili", {
    "unsafe": false
  }]]
}
```

Disables only minify-guarded-expressions, and enable all other unsafe plugins:

```json
{
  "presets": [["babili", {
    "unsafe": {
      "guards": false
    }
  }]]
}
```

### Passing same plugin options to multiple plugins

In babili, multiple plugins require the same set of options and it is easier to mention it in one place instead of two.

+ `keepFnName` - This will be passed to `mangle` and `deadcode` and will NOT be overriden if the same option exists under either mangle or deadcode.

**Examples**

```json
{
  "presets": [["babili", {
    "keepFnName": true
  }]]
}
```

is the same as,

Plugins applied:

```json
{
  "presets": [["babili", {
    "mangle": {
      "keepFnName": true
    },
    "deadcode": {
      "keepFnName": true
    }
  }]]
}
```
