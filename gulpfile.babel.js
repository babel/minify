import through from "through2";
import chalk from "chalk";
import newer from "gulp-newer";
import babel from "gulp-babel";
import gutil from "gulp-util";
import gulp from "gulp";
import path from "path";
import webpack from "webpack";
import webpackConfig from "./utils/webpack.config";

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

export function bundle(done) {
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      gutil.log("Error", err);
      done(err);
    } else {
      gutil.log(
        "Webpack:\n",
        stats.toString({
          modules: false,
          assetsSort: "name",
          colors: true
        })
      );
      done();
    }
  });
}

export default build;
