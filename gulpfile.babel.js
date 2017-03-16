const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const gutil = require("gulp-util");
const gulp = require("gulp");
const path = require("path");

const scripts = "./packages/*/src/**/*.js";
const dest = "packages";

let srcEx, libFragment;

if (path.win32 === path) {
  srcEx = /(packages\\[^\\]+)\\src\\/;
  libFragment = "$1\\lib\\";
} else {
  srcEx = new RegExp("(packages/[^/]+)/src/");
  libFragment = "$1/lib/";
}

export function build() {
  return gulp
    .src(scripts)
    .pipe(
      through.obj((file, enc, callback) => {
        file._path = file.path;
        file.path = file.path.replace(srcEx, libFragment);
        callback(null, file);
      })
    )
    .pipe(newer(dest))
    .pipe(
      through.obj((file, enc, callback) => {
        gutil.log("Compiling", "'" + chalk.cyan(file._path) + "'...");
        callback(null, file);
      })
    )
    .pipe(babel())
    .pipe(gulp.dest(dest));
}

export const watch = gulp.series(build, () => {
  gulp.watch(scripts, { debounceDelay: 200 }, build).on("error", () => {});
});

export default build;
