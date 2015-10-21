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

TODOS:

- Convert whiles to fors
- Do a better job at joining vars into the init part of the for
- Join statements into sequence expressions at the closest oppurtinity
  - in return statements for example
- avoid semicolons at the close of the function
- use `!` for self-executing functions
