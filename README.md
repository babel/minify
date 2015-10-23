# babel-minify

```sh
$ git clone https://github.com/facebook/babel-minify
$ npm install
$ node index.js fb.js
```


current numbers:
```
babel    232.97kB 82%     51.58kB 57%      17ms
uglify   213.49kB 98%     54.02kB 50%      16ms
closure  209.5kB  102%    54.45kB 49%      20ms
fb jsmin 235.99kB 80%     57.84kB 40%      18ms
```

After refactor and bug fixing:
```
uglify   213.49kB 98%     54.02kB 50%      15ms
closure  209.5kB  102%    54.45kB 49%      21ms
babel    229.58kB 85%     56.61kB 43%      18ms
fb jsmin 235.99kB 80%     57.84kB 40%      18ms
```

Major bug was that a variable name might've been used everywhere which is amazing for gzip.

After a better job with the variable encoding and fixing a bug not renaming the params:
```
        raw      raw win gzip    gzip win parse time
uglify  213.49kB 98%     54.02kB 50%      18ms
closure 209.5kB  102%    54.45kB 49%      17ms
babel   216.96kB 95%     54.92kB 47%      18ms
jsxmin  235.99kB 80%     57.84kB 40%      17ms
```

After fixing a DCE bug that randomly removed functions:
```
        raw      raw win gzip    gzip win parse time
uglify  213.49kB 98%     54.02kB 50%      0ms
closure 209.5kB  102%    54.45kB 49%      0ms
babel   219.49kB 93%     55.64kB 46%      0ms
jsxmin  235.99kB 80%     57.84kB 40%      0ms
```

After adding better return statement merging:
```
        raw      raw win gzip    gzip win parse time
uglify  213.49kB 98%     54.02kB 50%      0ms
closure 209.5kB  102%    54.45kB 49%      0ms
babel   218.71kB 94%     55.5kB  46%      0ms
jsxmin  235.99kB 80%     57.84kB 40%      0ms
```

```
        raw      raw win gzip    gzip win parse time
uglify  213.49kB 98%     54.02kB 50%      0ms
closure 209.5kB  102%    54.45kB 49%      0ms
babel   218.59kB 94%     55.49kB 46%      0ms
jsxmin  235.99kB 80%     57.84kB 40%      0ms
```

TODOS:

- Convert whiles to fors
- Do a better job at joining vars into the init part of the for
- avoid semicolons at the close of the function
- convert early if returns to if with negated condition
- bug in turning for body (with a var decl) into a sequence
- doing a better job at merging into return statements may present more oppurntities for other optimization like the one above.
- needlessly parenthesising sequence expressions


- Here is a place were uglify is crushing it making it into two fors and one if with no blocks:

```
  // taken from require.js
 function _debugUnresolvedDependencies(names) {
    var unresolved = Array.prototype.slice.call(names);
    var visited = {};
    var ii, name, module, dependency;

    while (unresolved.length) {
      name = unresolved.shift();
      if (visited[name]) {
        continue;
      }
      visited[name] = true;

      module = modulesMap[name];
      if (!module || !module.waiting) {
        continue;
      }

      for (ii = 0; ii < module.dependencies.length; ii++) {
        dependency = module.dependencies[ii];
        if (!modulesMap[dependency] || modulesMap[dependency].waiting) {
          unresolved.push(dependency);
        }
      }
    }
}
```