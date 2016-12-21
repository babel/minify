const exec = require("child_process").exec;
const fs = require("fs");
const transform = require("babel-core").transform;
const chalk = require("chalk");

module.exports = function(dirPath, filePath, options) {

  if (options.build) {
    options.build = `cd ${dirPath} && ${options.build}`;
  }
  options.test = `cd ${dirPath} && ${options.test}`;

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
    fs.readFile(`${dirPath}/${filePath}`, (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return;
      }

      console.log(chalk.green("2. Minifying", filePath));

      const { code: minified } = transform(data.toString(), {
        comments: false,
        minified: true,
        passPerPreset: true,
        presets: [["babili", options.babiliOptions]],
      });

      fs.writeFile(`${dirPath}/${filePath}`, minified, (err) => {
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
          if (options.success && stdout.indexOf(options.success) > -1) {
            console.log(chalk.black.bgGreen('Success!'));
          }
          process.exit(0);
        });

        testProcess.stdout.pipe(process.stdout);
      });
    });
  }
};
