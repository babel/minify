const smoke = require("./smoke-test.js");

// smoke("jquery", "dist/jquery.js", {
//   build: "npm run build",
//   test: "grunt test",
// });

// // pass

// smoke("immutable-js", "dist/immutable.js", {
//   build: "npm install && npm run build",
//   test: "npm run testonly",
// });

// // pass

// smoke("react", "build/react.js", {
//   build: "npm install && npm run build",
//   test: "npm test",
// });

// // doesn"t use build files?

// smoke("draft-js", "dist/Draft.js", {
//   build: "npm install && gulp build",
//   test: "npm test",
// });

smoke("html-minifier", "src/htmlminifier.js", {
  build: "npm install && grunt dist",
  test: "grunt qunit",
});
