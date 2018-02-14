const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const log = require("fancy-log");
const gulp = require("gulp");
const path = require("path");

export const build = gulp.series(buildPackages, buildUtils);

export const watch = gulp.series(build, () => {
  const scripts = [
    getBuildConfig("packages").scripts,
    getBuildConfig("utils").scripts
  ];
  gulp.watch(scripts, { debounceDelay: 200 }, build).on("error", () => {});
});

export function buildPackages() {
  return getBuildTask(getBuildConfig("packages"));
}

export function buildUtils() {
  return getBuildTask(getBuildConfig("utils"));
}

export default build;

function getBuildTask({ scripts, dest }) {
  return gulp
    .src(scripts)
    .pipe(
      through.obj((file, enc, callback) => {
        file._path = file.path;
        file.path = path.resolve(file.base, swapSrcWithLib(file.relative));
        callback(null, file);
      })
    )
    .pipe(newer(dest))
    .pipe(
      through.obj((file, enc, callback) => {
        log("Compiling", "'" + chalk.cyan(file._path) + "'...");
        callback(null, file);
      })
    )
    .pipe(babel())
    .pipe(gulp.dest(dest));
}

function getBuildConfig(dir) {
  const scripts = `./${dir}/*/src/**/*.js`;
  const dest = dir;

  return { scripts, dest };
}

function swapSrcWithLib(srcPath) {
  const parts = srcPath.split(path.sep);
  parts[1] = "lib";
  return parts.join(path.sep);
}
