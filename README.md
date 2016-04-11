## babel-minify

A collection of minification babel plugins.

## Plugins

### simplify-plugin

This plugin will transform code in mainly two ways:

1. Reduce as much statements as possible into expressions
2. Make expressions as uniform as possible for better compressibility

### mangle-names-plugin

Context and scope aware variable renaming.

### constant-folding-plugin

Tries to evaluate expressions and inline the result. For now only deals with
numbers and strings.

### dce-plugin

Dead code elimination plugin. Inlines bindings when possible. Tries to evaluate expressions and prunes unreachable as a result.

### replace-plugin

Replaces matching nodes in the tree with a given replacement node. For example
you can replace `process.NODE_ENV` with `"production"`.

### emptyFunction-plugin

This mostly a Facebook-specific transform that removes noop function
calls. However, can be generalized to detect and remove noops.

Some benchmarks:


Backbone.js:

```
        raw     raw win gzip   gzip win parse time run
babel   21.74kB 222%    7.28kB 170%     2ms        831ms
uglify  21.82kB 220%    7.32kB 169%     1ms        359ms
closure 21.67kB 223%    7.37kB 167%     2ms        3455ms
```

React:
```
        raw      raw win gzip    gzip win parse time run
babel   176.09kB 256%    52.88kB 168%     12ms       3506ms
closure 171.46kB 265%    52.97kB 168%     12ms       9785ms
uglify  176.41kB 255%    53.18kB 167%     12ms       2187ms
```

jquery:
```
        raw     raw win gzip    gzip win parse time run
uglify  94.4kB  217%    32.82kB 157%     8ms        1449ms
babel   93.63kB 220%    32.95kB 156%     8ms        3623ms
closure 94.23kB 218%    33.38kB 153%     10ms       9001ms
```

Running the benchmarks: `./script/benchmark.js file.js`
