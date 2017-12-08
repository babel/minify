# Benchmarks

## Comparison with other minifiers

[benchmark.js](https://github.com/babel/minify/blob/master/scripts/benchmark.js) compares BabelMinify with [Uglify](https://github.com/mishoo/UglifyJS2), [Closure Compiler](https://github.com/google/closure-compiler) and [Closure Compiler JS](https://github.com/google/closure-compiler-js)

```sh
./scripts/benchmark.js [file...]
```

## Compare plugins - time

[plugin-timing.js](https://github.com/babel/minify/blob/master/scripts/plugin-timing.js) is used to calculate and compare the time spent in each plugin.

```sh
./scripts/plugin-timing.js file.js
```

## Compare plugins - size

[plugin-contribution.js](https://github.com/babel/minify/blob/master/scripts/plugin-contribution.js) calculates how much each plugin of babel-minify contributes to size reduction.

```sh
./scripts/plugin-contribution.js file.js
```
