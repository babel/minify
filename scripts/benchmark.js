#!/usr/bin/env node
"use strict";

Error.stackTraceLimit = Infinity;

const uglify = require("uglify-js");
const Table  = require("cli-table");
const child  = require("child_process");
const bytes  = require("bytes");
const chalk  = require("chalk");
const babel  = require("babel-core");
const zlib   = require("zlib");
const fs     = require("fs");
const path   = require("path");
const compile = require("google-closure-compiler-js").compile;

const NUM_TEST_RUNS = 10;

const filename = process.argv[2];
if (!filename) {
  console.error("Error: No filename specified");
  process.exit(1);
}

const table = new Table({
  head: ["", "raw", "raw win", "gzip", "gzip win", "parse time", "run time (average)"],
  chars: {
    top: "",
    "top-mid": "" ,
    "top-left": "" ,
    "top-right": "",
    bottom: "" ,
    "bottom-mid": "" ,
    "bottom-left": "" ,
    "bottom-right": "",
    left: "",
    "left-mid": "",
    mid: "",
    "mid-mid": "",
    right: "" ,
    "right-mid": "",
    middle: " ",
  },
  style: {
    "padding-left": 0,
    "padding-right": 0,
    head: ["bold"],
  },
});

let results = [];

const code = fs.readFileSync(filename, "utf8");
const gzippedCode = zlib.gzipSync(code);

function test(name, callback) {

  console.log('testing', name);

  const start = Date.now();
  const result = callback(code);
  const end = Date.now();
  const run = end - start;

  fs.writeFileSync(".test_gen_" + name + ".js", result);

  const gzipped = zlib.gzipSync(result);

  const parseStart = Date.now();
  new Function(result);
  const parseEnd = Date.now();
  const parseNow = parseEnd - parseStart;

  const runTimes = [run];

  for (var i = 1; i < NUM_TEST_RUNS; i++) {
    const start = Date.now();
    const result = callback(code);
    runTimes.push(Date.now() - start);
  }

  const totalTime = runTimes.reduce((a, b) => a + b, 0);
  const average = parseInt(totalTime / runTimes.length, 10);

  results.push({
    name: name,
    raw: result.length,
    gzip: gzipped.length,
    parse: parseNow,
    run: average,
  });
}

test("babili (best size)", function (code) {
  return babel.transform(code, {
    sourceType: "script",
    minified: true,
    plugins: [
      require("babel-plugin-minify-constant-folding"),
      require("babel-plugin-minify-dead-code-elimination"),
      require("babel-plugin-minify-flip-comparisons"),
      require("babel-plugin-minify-guarded-expressions"),
      require("babel-plugin-minify-infinity"),
      require("babel-plugin-minify-mangle-names"),
      require("babel-plugin-minify-replace"),
      [
        require("../packages/babel-plugin-minify-simplify/lib/index.js"),
        { multiPass: true }
      ],
      require("babel-plugin-minify-type-constructors"),
      require("babel-plugin-transform-member-expression-literals"),
      require("babel-plugin-transform-merge-sibling-variables"),
      require("babel-plugin-transform-minify-booleans"),
      require("babel-plugin-transform-property-literals"),
      require("babel-plugin-transform-simplify-comparison-operators"),
      require("babel-plugin-transform-undefined-to-void"),
    ],
    comments: false,
  }).code;
});

test("babili (best speed)", function (code) {
  return babel.transform(code, {
    sourceType: "script",
    minified: true,
    plugins: [
      require("babel-plugin-minify-constant-folding"),
      require("babel-plugin-minify-dead-code-elimination"),
      require("babel-plugin-minify-flip-comparisons"),
      require("babel-plugin-minify-guarded-expressions"),
      require("babel-plugin-minify-infinity"),
      require("babel-plugin-minify-mangle-names"),
      require("babel-plugin-minify-replace"),
      [
        require("../packages/babel-plugin-minify-simplify/lib/index.js"),
        { multiPass: false }
      ],
      require("babel-plugin-minify-type-constructors"),
      require("babel-plugin-transform-member-expression-literals"),
      require("babel-plugin-transform-merge-sibling-variables"),
      require("babel-plugin-transform-minify-booleans"),
      require("babel-plugin-transform-property-literals"),
      require("babel-plugin-transform-simplify-comparison-operators"),
      require("babel-plugin-transform-undefined-to-void"),
    ],
    comments: false,
  }).code;
});

test("closure", function (/*code*/) {
  return child.execSync(
    "java -jar " + path.join(__dirname, "gcc.jar") + " --env=CUSTOM --jscomp_off=* --js " + filename
  ).toString();
});

test("closure js", function (code) {
  const flags = {
    jsCode: [{ src: code }],
    env: "CUSTOM",
  };
  const out = compile(flags);
  return out.compiledCode;
});

test("uglify", function (code) {
  return uglify.minify(code, {
    fromString: true,
  }).code;
});

results = results.sort((a, b) => a.gzip > b.gzip);

results.forEach(function (result, i) {
  let row = [
    chalk.bold(result.name),
    bytes(result.raw),
    Math.round(((code.length / result.raw) * 100) - 100) + "%",
    bytes(result.gzip),
    Math.round(((gzippedCode.length / result.gzip) * 100) - 100) + "%",
    Math.round(result.parse) + "ms",
    Math.round(result.run) + "ms",
  ];

  let style = chalk.yellow;
  if (i === 0) {
    style = chalk.green;
  }
  if (i === results.length - 1) {
    style = chalk.red;
  }
  row = row.map(function (item) {
    return style(item);
  });

  table.push(row);
});

console.log(table.toString());
