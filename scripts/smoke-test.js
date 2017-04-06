const exec = require("child_process").exec;
const fs = require("fs");
const transform = require("babel-core").transform;
const chalk = require("chalk");
const glob = require("glob");

module.exports = function smoke(options, done) {

  // clone options not to mutate them
  options = Object.assign({}, options);

  let _es2015 = true;

  if (options.build) {
    options.build = `cd ${options.dir} && ${options.build}`;
  }

  options.test = `cd ${options.dir} && ${options.test}`;

  console.log(chalk.green("1.", options.build || "Nothing to build"));

  if (options.build) {
    const buildProcess = exec(options.build, (err) => {
      if (err) {
        console.error(`Error building: ${err}`);
        return;
      }
      minifyAll();
    });

    options.verbose && buildProcess.stdout.pipe(process.stdout);
  }
  else {
    minifyAll();
  }

  function minifyAll() {
    const globOptions = {
      ignore: options.ignore
    };
    glob(`${options.dir}/${options.files}`, globOptions, (err, files) => {
      if (err) {
        console.log(`Error getting file(s) path: ${err}`);
        return;
      }
      (function process(file) {
        minify(file, _es2015, () => {
          const file = files.pop();
          if (file) {
            process(file);
          }
          else {
            test();
          }
        });
      })(files.pop());
    });
  }

  function minify(file, es2015, done) {
    fs.readFile(file, (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }

      console.log(chalk.green(`2. Minifying ${file}, es2015=${es2015}`));

      const presets = [
        "react",
        ["babili", options.babiliOptions],
      ];

      if (es2015) {
        presets.unshift("es2015");
      }

      const babelOptions = Object.assign(options.babelOptions || { }, {
        comments: false,
        minified: true,
        passPerPreset: true,
        presets,
      });

      const { code: minified } = transform(data.toString(), babelOptions);

      fs.writeFile(file, minified, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }
        done();
      });
    });
  }

  function test() {
    console.log(chalk.green("3.", options.test));
    const testProcess = exec(options.test, (err, stdout) => {

      if (err) {
        console.error(`Error testing: ${err}`);
        return;
      }

      const isSuccessful = (
        options.success &&
        stdout.indexOf(options.success) > -1
      );

      if (isSuccessful) {
        console.log(chalk.black.bgGreen("Success!"));
      }

      // this is brittle but for now... whatever
      if (_es2015) {
        _es2015 = false;
        minifyAll();
      }
      else {
        done(isSuccessful);
      }
    });

    options.verbose && testProcess.stdout.pipe(process.stdout);
  }
};
