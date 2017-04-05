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
  //   dir: "stylelint",
  //   files: "lib/**/*.js",
  //   ignore: [
  //     "**/__tests__/**",
  //     "**/lib/rules/declaration-block-properties-order/index.js",
  //     "**/lib/rules/declaration-block-no-redundant-longhand-properties/index.js",
  //     "**/lib/rules/at-rule-empty-line-before/index.js",
  //     "**/lib/rules/max-empty-lines/index.js",
  //     "**/lib/rules/block-closing-brace-newline-before/index.js",
  //     "**/lib/rules/function-calc-no-unspaced-operator/index.js",
  //     "**/lib/rules/font-weight-notation/index.js",
  //     "**/lib/rules/max-line-length/index.js",
  //     "**/lib/rules/selector-class-pattern/index.js",
  //     "**/lib/rules/declaration-colon-newline-after/index.js",
  //   ],
  //   build: "npm install",
  //   test: "npm run jest",
  //   success: "Test Suites: 264 passed, 264 total",
  // },
  // {
  //   dir: "react",
  //   files: "build/react.js",
  //   build: "npm install && npm run build",
  //   test: "npm test",
  // },
  // PASS
  // {
  //   dir: "draft-js",
  //   files: "dist/Draft.js",
  //   build: "npm cache clean && npm install",
  //   test: "npm test",
  //   verbose: false
  // },
  // {
  //   dir: "immutable-js",
  //   files: "dist/immutable.js",
  //   build: "npm install && npm run build",
  //   test: "npm run testonly",
  //   verbose: true,
  //   babiliOptions: {
  //     keepFnName: true,
  //     unsafe: {
  //       typeConstructors: false
  //     }
  //   }
  // },
  {
    dir: "html-minifier",
    files: "src/htmlminifier.js",
    build: "npm install && grunt dist",
    test: "grunt qunit",
    success: "0 failed",
    verbose: true
  }
];

(function tick(test) {
  smoke(test).then(() => {
    const test = tests.pop();
    test && tick(test);
  });
})(tests.pop());
