const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");
const chalk = require("chalk");
const glob = require("glob");
const minifyPreset = require("../packages/babel-preset-minify");
const breakMeTransform = require("./break");

const SMOKE_ASSETS_DIR = path.join(__dirname, "../smoke/assets");

const promisify = fn => (...args) =>
  new Promise((resolve, reject) =>
    fn.apply(null, [
      ...args,
      (err, result) => (err ? reject(err) : resolve(result))
    ])
  );

const globFiles = promisify(glob);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

class SmokeTest {
  constructor(
    options,
    { skipInstall = false, skipBuild = false, verbose = true }
  ) {
    this.options = Object.assign({}, options);
    this.verbose = verbose;
    this.skipBuild = skipBuild;
    this.skipInstall = skipInstall;

    // verify required
    required(options, ["dir", "files", "test"]);

    this.path = path.join(SMOKE_ASSETS_DIR, this.options.dir);

    this.installCommand = this.options.install
      ? `cd ${this.path} && ${this.options.install}`
      : `cd ${this.path} && npm install`;

    this.buildCommand = this.options.build
      ? `cd ${this.path} && ${this.options.build}`
      : null;

    this.testCommand = `cd ${this.path} && ${this.options.test}`;

    this.cleanupCommand = `cd ${this.path} && git reset --hard HEAD`;

    this.loggedStep = 1;
  }

  log(...messages) {
    console.log(
      chalk.cyan(`${this.loggedStep++}.`),
      ...messages.map((m, i) => (i === 0 ? chalk.cyan(m) : chalk.bold(m))),
      "\n"
    );
  }

  run() {
    return this.cleanup()
      .then(() => this.install())
      .then(() => this.build())
      .then(() => this.minifyAll())
      .then(() => this.test())
      .then(() => this.cleanup())
      .then(() => this.verifyFailure())
      .then(() => this.cleanup())
      .catch(err => {
        this.log("Errored - ", err);
        return Promise.reject(err);
      });
  }

  install() {
    if (this.skipInstall) {
      this.log("Skipping Install");
      return Promise.resolve();
    }

    this.log("Installing Dependencies");
    return this.exec(this.installCommand);
  }

  build() {
    if (this.skipBuild) {
      this.log("Skipping Build");
      return Promise.resolve();
    }

    if (this.buildCommand === null) {
      this.log("No BuildCommand found. Skipping Build.");
      return Promise.resolve();
    }

    this.log("Building");
    return this.exec(this.buildCommand);
  }

  minifyAll() {
    return this.getAllFiles().then(files =>
      Promise.all(files.map(file => this.minifyFile(file)))
    );
  }

  getAllFiles() {
    return globFiles(`${this.path}/${this.options.files}`, {
      ignore: this.options.ignore
    });
  }

  minifyFile(file) {
    this.log("Minifying", file);
    return readFile(file)
      .then(contents => this.minify(contents.toString()))
      .then(({ code }) => writeFile(file, code));
  }

  minify(contents) {
    return babel.transform(contents, {
      minified: true,
      presets: [[minifyPreset, this.options.minifyOptions]]
    });
  }

  test() {
    this.log("Running Tests");
    return this.exec(this.testCommand);
  }

  verifyFailure() {
    this.log("Verifying Failure case");
    return this.getAllFiles()
      .then(files =>
        Promise.all(
          files.map(file =>
            readFile(file)
              .then(contents => {
                this.log("Applying breaking changes to", file);
                return babel.transform(contents.toString(), {
                  plugins: [breakMeTransform],
                  minified: true
                });
              })
              .then(({ code }) => writeFile(file, code))
          )
        )
      )
      .then(() =>
        // ensure the test fails
        this.test().then(
          () =>
            // reject if it passes
            Promise.reject(new Error("Verification of Breaking case failed")),
          err => {
            this.log("Error Verified -", err.message.toString().split("\n")[0]);
            // and resolve if it fails
            return Promise.resolve();
          }
        )
      );
  }

  cleanup() {
    this.log("Cleanup");
    return this.exec(this.cleanupCommand);
  }

  exec(command) {
    return new Promise((resolve, reject) => {
      const p = exec(command, err => (err ? reject(err) : resolve()));
      if (this.verbose) {
        p.stdout.pipe(process.stdout);
        p.stderr.pipe(process.stderr);
      }
    });
  }
}

module.exports = function smoke(options, flags) {
  const test = new SmokeTest(options, flags);
  return test.run();
};

function required(o, keys) {
  for (let key of keys) {
    if (o[key] === void 0) {
      throw new Error(`${key} is a required option`);
    }
  }
}
