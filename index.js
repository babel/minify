#!/usr/bin/env node

var uglify = require("uglify-js");
var bytes = require("bytes");
var babel = require("babel-core");
var zlib = require("zlib");
var fs = require("fs");

var filename = process.argv[2];
if (!filename) {
  console.error("Error: No filename specified");
  process.exit(1);
}

var code = fs.readFileSync(filename, "utf8");

function test(name, callback) {
  var start = Date.now();
  var result = callback(code);
  var end = Date.now();
  var now = end - start;

  var gzipped = zlib.gzipSync(result);

  console.log(name, now + "ms", bytes(result.length) + " raw", bytes(gzipped.length) + " gzipped");
}

test("babel", function (code) {
  return babel.transform(code, {
    blacklist: ["strict"],
    plugins: ["merge-sibling-variables", "simplify-comparison-operators", "minify-booleans"],
    compact: true,
    comments: false
  }).code;
});

test("uglify", function (code) {
  return uglify.minify(code, {
    fromString: true,
    mangle: false
  }).code;
});
