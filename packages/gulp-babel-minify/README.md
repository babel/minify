# gulp-babel-minify

## Installation

```sh
npm install gulp-babel-minify --save-dev
```

## Usage

```js
const gulp = require("gulp");
const minify = require("gulp-babel-minify");

gulp.task("minify", () =>
  gulp.src("./build/app.js")
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./dist"));
);
```

## API

```js
gulpBabelMinify(minifyOptions, overrides);
```

### minifyOptions

These are passed on to the minify preset. Refer https://github.com/babel/minify/tree/master/packages/babel-preset-minify#options. Default `{}`

### Overrides

Default: `{}`

+ `babel`: Use a custom `@babel/core`
+ `minifyPreset`: Use a custom `babel-preset-minify`
+ `comments`: [Function | RegExp | Boolean]
