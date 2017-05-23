# gulp-babili

## Installation

```sh
npm install gulp-babili --save-dev
```

## Usage

```js
const gulp = require("gulp");
const babili = require("gulp-babili");

gulp.task("minify", () =>
  gulp.src("./build/app.js")
    .pipe(babili({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./dist"));
);
```

## API

```js
gulpBabili(babiliOptions, overrides);
```

### babiliOptions

These are passed on to the babili preset. Refer https://github.com/babel/babili/tree/master/packages/babel-preset-babili#options. Default `{}`

### Overrides

Default: `{}`

+ `babel`: Use a custom `babel-core`
+ `babili`: Use a custom `babel-preset-babili`
