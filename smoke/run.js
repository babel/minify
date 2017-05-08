const program = require("commander");
const smoke = require("./smoke-test.js");

const TESTS = [
  {
    dir: "html-minifier",
    files: "src/htmlminifier.js",
    build: "grunt dist",
    test: "grunt qunit"
  },
  {
    dir: "jquery",
    files: "dist/jquery.js",
    build: "npm run build",
    test: "grunt test"
  },
  {
    dir: "lodash",
    files: "lodash.js",
    test: "npm run test:main",
    babiliOptions: {
      keepFnName: true
    }
  }
];

function run() {
  let inputTests = [];
  program
    .usage("[options] [inputTests...]")
    .action(_inputTests => (inputTests = _inputTests))
    .option("-i --skip-install", "Skip Install Step")
    .option("-b --skip-build", "Skip Build step")
    .option("-c --skip-cleanup", "Skip cleanup step")
    .option("-q --quiet", "Quiet mode")
    .parse(process.argv);

  console.log("tests to run - ", inputTests);

  const testsToRun = [];
  for (let test of TESTS) {
    if (inputTests.indexOf(test.dir) !== -1) {
      testsToRun.push(test);
    }
  }

  if (testsToRun.length < 1) {
    throw new Error("No Test to run");
  }

  (function tick(test) {
    smoke(test, {
      skipInstall: program.skipInstall,
      skipBuild: program.skipBuild,
      verbose: !program.quiet
    })
      .then(() => {
        const test = testsToRun.pop();
        test && tick(test);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })(testsToRun.pop());
}

/**
 * Run the test
 */
run();

// const otherTests = [
//   {
//     dir: "babel",
//     files: "packages/babel-core/src/helpers/resolve.js",
//     build: "make bootstrap",
//     test: "make test-only",
//     babelOptions: {
//       plugins: ["syntax-flow"]
//     }
//   },
//   {
//     dir: "stylelint",
//     files: "lib/**/*.js",
//     ignore: [
//       "**/__tests__/**",
//       "**/lib/rules/declaration-block-properties-order/index.js",
//       "**/lib/rules/declaration-block-no-redundant-longhand-properties/index.js",
//       "**/lib/rules/at-rule-empty-line-before/index.js",
//       "**/lib/rules/max-empty-lines/index.js",
//       "**/lib/rules/block-closing-brace-newline-before/index.js",
//       "**/lib/rules/function-calc-no-unspaced-operator/index.js",
//       "**/lib/rules/font-weight-notation/index.js",
//       "**/lib/rules/max-line-length/index.js",
//       "**/lib/rules/selector-class-pattern/index.js",
//       "**/lib/rules/declaration-colon-newline-after/index.js",
//     ],
//     build: "npm install",
//     test: "npm run jest",
//     success: "Test Suites: 264 passed, 264 total",
//   },
//   {
//     dir: "react",
//     files: "build/react.js",
//     build: "npm install && npm run build",
//     test: "npm test",
//   },
//   // PASS
//   {
//     dir: "immutable-js",
//     files: "dist/immutable.js",
//     build: "npm run build:dist",
//     test: "npm run testonly",
//     babiliOptions: {
//       keepFnName: true,
//       unsafe: {
//         typeConstructors: false
//       }
//     }
//   },
//   {
//     dir: "draft-js",
//     files: "dist/Draft.js",
//     build: "npm cache clean && npm install",
//     test: "npm test"
//   },
// ];
