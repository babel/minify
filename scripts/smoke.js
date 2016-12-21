const smoke = require("./smoke-test.js");

var tests = [
  {
    dir: "jquery",
    file: "dist/jquery.js",
    build: "npm run build",
    test: "grunt test",
    success: "872 passing",
  },
  {
    dir: "html-minifier",
    file: "src/htmlminifier.js",
    build: "npm install && grunt dist",
    test: "grunt qunit",
    success: "0 failed",
  },
  // {
  //   dir: "immutable-js",
  //   file: "dist/immutable.js",
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
  //   file: "build/react.js",
  //   build: "npm install && npm run build",
  //   test: "npm test",
  // },
  // {
  //   dir: "draft-js",
  //   file: "dist/Draft.js",
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
