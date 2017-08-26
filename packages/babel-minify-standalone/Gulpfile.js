const registerBabelStandaloneTask = require("babel-standalone/src/gulpTasks")
  .registerBabelStandaloneTask;
const gulp = require("gulp");

const version = require("./package.json").version;
registerBabelStandaloneTask(gulp, "babel-minify", "BabelMinify", __dirname, version);
