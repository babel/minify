const smoke = require("./smoke-test.js");

const tests = [
  // {
  //   dir: "babel",
  //   files: "packages/babel-core/src/helpers/resolve.js",
  //   build: "make bootstrap",
  //   test: "make test-only",
  //   babelOptions: {
  //     plugins: ["syntax-flow"]
  //   }
  // },
  // {
  //   dir: "jquery",
  //   files: "dist/jquery.js",
  //   build: "npm run build",
  //   test: "grunt test",
  //   success: "872 passing",
  // },
  // {
  //   dir: "html-minifier",
  //   files: "src/htmlminifier.js",
  //   build: "npm install && grunt dist",
  //   test: "grunt qunit",
  //   success: "0 failed",
  // },
  {
    dir: "stylelint",
    // files: "lib/**/*.js",
    files: "lib/rules/declaration-block-properties-order/index.js",
    build: "npm install",
    test: "npm run jest",
    success: "Test Suites: 264 passed, 264 total",
  },
  // {
  //   dir: "immutable-js",
  //   files: "dist/immutable.js",
  //   build: "npm install && npm run build",
  //   test: "npm run testonly",
  //   babiliOptions: {
  //     "unsafe": {
  //       typeConstructors: false,
  //     },
  //   },
  // },
  // {
  //   dir: "react",
  //   files: "build/react.js",
  //   build: "npm install && npm run build",
  //   test: "npm test",
  // },
  // {
  //   dir: "draft-js",
  //   files: "dist/Draft.js",
  //   build: "npm install && gulp build",
  //   test: "npm test",
  // }
];

(function tick(test) {
  smoke(test, (isSuccessful) => {
    const test = tests.pop();
    if (isSuccessful && test) {
      tick(test);
    }
  });
})(tests.pop());
