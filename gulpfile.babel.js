const through = require("through2");
const chalk = require("chalk");
const newer = require("gulp-newer");
const babel = require("gulp-babel");
const gutil = require("gulp-util");
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

function getBuildTask({ scripts, dest, srcEx, libFragment }) {
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

function getBuildConfig(dir) {
  const scripts = `./${dir}/*/src/**/*.js`;
  const dest = dir;

  let srcEx, libFragment;

  if (path.win32 === path) {
    srcEx = new RegExp(`(${dir}\\[^\\]+)\\src\\ `.trim());
    libFragment = "$1\\lib\\";
  } else {
    srcEx = new RegExp(`(${dir}/[^/]+)/src/`);
    libFragment = "$1/lib/";
  }

  return { scripts, dest, srcEx, libFragment };
}
