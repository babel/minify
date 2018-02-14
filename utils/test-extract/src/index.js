const path = require("path");
const fs = require("fs");
const plugin = require("./plugin");
const babel = require("babel-core");
const readline = require("readline");
const mkdirp = require("mkdirp");
const json5 = require("json5");

const FIXTURES_FOLDER = "fixtures";
const ACTUAL_FILE_NAME = "actual.js";
const EXPECTED_FILE_NAME = "expected.js";
const OPTIONS_FILE_NAME = "options.json";
const SKIP_FILE_NAME = "skip";

// Try and find a different solution
const appRoot = path.resolve(__dirname, "../../../");
const toTestFolders = ["babel-plugin-transform-inline-environment-variables"];

async function runTests() {
  let exitCode = [];
  toTestFolders.forEach(folder => {
    const dirPath = `${appRoot}/packages/${folder}/__tests__/`;
    exitCode = exitCode.concat(
      fs
        .readdirSync(dirPath)
        .filter(item => fs.statSync(path.join(dirPath, item)).isFile())
        .map(item => {
          return {
            path: path.join(dirPath, item),
            name: item
          };
        })
    );
  });
  const states = [];
  exitCode.forEach(({ path: filePathName }) => {
    const code = fs.readFileSync(filePathName, "utf8");
    babel.transform(code, {
      plugins: [plugin({ states, filePathName: path.dirname(filePathName) })],
      babelrc: false
    });
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const checkAndCreateFolder = path => {
    if (!fs.existsSync(path)) {
      // eslint-disable-next-line no-console
      console.log(`Making Dir: ${path}`);
      mkdirp.sync(path);
    }
  };
  // console.log(states);
  const question = ({
    testName,
    fixtureFolder,
    actual,
    expected,
    options,
    createSkip
  }) =>
    new Promise(resolve => {
      rl.question(`${testName} : `, answer => {
        const saveFolderName = path.join(fixtureFolder, answer);
        checkAndCreateFolder(saveFolderName);
        fs.writeFileSync(path.join(saveFolderName, ACTUAL_FILE_NAME), actual);
        fs.writeFileSync(
          path.join(saveFolderName, EXPECTED_FILE_NAME),
          expected
        );
        if (options !== undefined) {
          fs.writeFileSync(
            path.join(saveFolderName, OPTIONS_FILE_NAME),
            JSON.stringify(json5.parse(options))
          );
        }
        if (createSkip) {
          fs.writeFileSync(path.join(saveFolderName, SKIP_FILE_NAME), "");
        }
        resolve();
      });
    });

  for (const t of states) {
    const { filePathName } = t;
    const fixtureFolder = path.join(filePathName, FIXTURES_FOLDER);
    checkAndCreateFolder(fixtureFolder);
    await question(
      Object.assign({}, t, {
        fixtureFolder
      })
    );
  }

  rl.close();
  return exitCode;
}

runTests().catch(err => {
  // eslint-disable-next-line no-console
  console.log(err);
});
// process.exit(exitCode);
