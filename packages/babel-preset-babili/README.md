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

All options are **enabled** by default **except** the ones with an explicit mention - `(Default: false)`

Two types of options:

1. 1-1 mapping with plugin
2. The same option passed to multiple plugins

### 1-1 mapping with plugin

+ `false` - disable plugin
+ `true` - enable plugin
+ `{ ...pluginOpts }` - enable plugin and pass pluginOpts to plugin

| OptionName           | Plugin                                                                                                                      | DefaultValue |
| ---------            | -------------                                                                                                               | ----------   |
| booleans             | [babel-plugin-transform-minify-booleans](../../packages/babel-plugin-transform-minify-booleans)                             | true         |
| builtIns             | [babel-plugin-minify-builtins](../../packages/babel-plugin-minify-builtins)                                                 | true         |
| consecutiveAdds      | [babel-plugin-transform-inline-consecutive-adds](../../packages/babel-plugin-transform-inline-consecutive-adds)             | true         |
| deadcode             | [babel-plugin-minify-dead-code-elimination](../../packages/babel-plugin-minify-dead-code-elimination)                       | true         |
| evaluate             | [babel-plugin-minify-constant-folding](../../packages/babel-plugin-minify-constant-folding)                                 | true         |
| flipComparisons      | [babel-plugin-minify-flip-comparisons](../../packages/babel-plugin-minify-flip-comparisons)                                 | true         |
| guards               | [babel-plugin-minify-guarded-expressions](../../packages/babel-plugin-minify-guarded-expressions)                           | true         |
| infinity             | [babel-plugin-minify-infinity](../../packages/babel-plugin-minify-infinity)                                                 | true         |
| mangle               | [babel-plugin-minify-mangle-names](../../packages/babel-plugin-minify-mangle-names)                                         | true         |
| memberExpressions    | [babel-plugin-transform-member-expression-literals](../../packages/babel-plugin-transform-member-expression-literals)       | true         |
| mergeVars            | [babel-plugin-transform-merge-sibling-variables](../../packages/babel-plugin-transform-merge-sibling-variables)             | true         |
| numericLiterals      | [babel-plugin-minify-numeric-literals](../../packages/babel-plugin-minify-numeric-literals)                                 | true         |
| propertyLiterals     | [babel-plugin-transform-property-literals](../../packages/babel-plugin-transform-property-literals)                         | true         |
| regexpConstructors   | [babel-plugin-transform-regexp-constructors](../../packages/babel-plugin-transform-regexp-constructors)                     | true         |
| removeConsole        | [babel-plugin-transform-remove-console](../../packages/babel-plugin-transform-remove-console)                               | false        |
| removeDebugger       | [babel-plugin-transform-remove-debugger](../../packages/babel-plugin-transform-remove-debugger)                             | false        |
| removeUndefined      | [babel-plugin-transform-remove-undefined](../../packages/babel-plugin-transform-remove-undefined)                           | true         |
| replace              | [babel-plugin-minify-replace](../../packages/babel-plugin-minify-replace)                                                   | true         |
| simplify             | [babel-plugin-minify-simplify](../../packages/babel-plugin-minify-simplify)                                                 | true         |
| simplifyComparisons  | [babel-plugin-transform-simplify-comparison-operators](../../packages/babel-plugin-transform-simplify-comparison-operators) | true         |
| typeConstructors     | [babel-plugin-minify-type-constructors](../../packages/babel-plugin-minify-type-constructors)                               | true         |
| undefinedToVoid      | [babel-plugin-transform-undefined-to-void](../../packages/babel-plugin-transform-undefined-to-void)                         | true         |

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
      "blacklist": {
        "ParserError": true,
        "NetworkError": false
      }
    }
  }]]
}
```

### The same option passed to multiple plugins

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
