const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const babel = require("babel-core");
const chalk = require("chalk");
const glob = require("glob");
const babiliPreset = require("../packages/babel-preset-babili");

const SMOKE_ASSETS_DIR = path.join(__dirname, "../smoke/assets");

const promisify = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn.apply(null, [
        ...args,
        (err, result) => err ? reject(err) : resolve(result)
      ]));

const globFiles = promisify(glob);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class SmokeTest {
  constructor(options) {
    this.options = Object.assign({}, options);

    // verify required
    required(options, ["dir", "files", "test"]);

    this.path = path.join(SMOKE_ASSETS_DIR, this.options.dir);

    this.buildCommand = this.options.build
      ? `cd ${this.path} && ${this.options.build}`
      : null;

    this.testCommand = `cd ${this.path} && ${this.options.test}`;

    this.loggedStep = 1;
  }
  log(...messages) {
    console.log(
      chalk.cyan(`${this.loggedStep++}.`),
      ...messages.map((m, i) => i === 0 ? chalk.cyan(m) : chalk.bold(m)),
      "\n"
    );
  }
  run() {
    return this.build()
      .then(() => this.minifyAll())
      .then(() => this.test())
      .catch(err => {
        this.log("Errored - ", err);
        return Promise.reject(err);
      });
  }
  build() {
    if (this.buildCommand === null) {
      this.log("No BuildCommand found. Skipping Build.");
      return Promise.resolve();
    }

    this.log("Building");

    return new Promise((resolve, reject) => {
      const buildProcess = exec(this.buildCommand, err => {
        if (err) return reject(err);
        resolve();
      });
      if (this.options.verbose) {
        buildProcess.stdout.pipe(process.stdout);
        buildProcess.stderr.pipe(process.stderr);
      }
    });
  }
  minifyAll() {
    return this.getAllFiles().then(files =>
      Promise.all(files.map(file => this.minifyFile(file))));
  }
  getAllFiles() {
    return globFiles(`${this.path}/${this.options.files}`, {
      ignore: this.options.ignore
    });
  }
  minifyFile(file) {
    this.log(`Minifying ${file}`);
    return readFile(file)
      .then(contents => this.minify(contents.toString()))
      .then(({ code }) => writeFile(file, code));
  }
  minify(contents) {
    return babel.transform(contents, {
      minified: true,
      presets: [[babiliPreset, this.options.babiliOptions]]
    });
  }
  test() {
    this.log("Running Tests");
    return new Promise((resolve, reject) => {
      const testProcess = exec(this.testCommand, err => {
        if (err) return reject(err);
        resolve();
      });
      if (this.options.verbose) {
        testProcess.stdout.pipe(process.stdout);
        testProcess.stderr.pipe(process.stderr);
      }
    });
  }
}

module.exports = function smoke(options) {
  const test = new SmokeTest(options);
  return test.run();
};

function required(o, keys) {
  for (let key of keys) {
    if (o[key] === void 0) {
      throw new Error(`${key} is a required option`);
    }
  }
}
