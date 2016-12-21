const exec = require("child_process").exec;
const fs = require("fs");
const transform = require("babel-core").transform;
const chalk = require("chalk");

module.exports = function(options, done) {

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
      minify();
    });

    buildProcess.stdout.pipe(process.stdout);
  }
  else {
    minify();
  }

  function minify() {
    fs.readFile(`${options.dir}/${options.file}`, (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }

      console.log(chalk.green("2. Minifying", options.file));

      const { code: minified } = transform(data.toString(), {
        comments: false,
        minified: true,
        passPerPreset: true,
        presets: [["babili", options.babiliOptions]],
      });

      fs.writeFile(`${options.dir}/${options.file}`, minified, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
          return;
        }

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
            console.log(chalk.black.bgGreen('Success!'));
          }

          done(isSuccessful);
        });

        testProcess.stdout.pipe(process.stdout);
      });
    });
  }
};
