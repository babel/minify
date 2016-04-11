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
