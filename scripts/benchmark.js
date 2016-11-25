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
const Command = require("commander").Command;
const compile = require("google-closure-compiler-js").compile;

let packagename, filename;

const NUM_TEST_RUNS = 10;

const script = new Command("benchmark.js")
  .option("-o, --offline", "Only install package if not present; package not removed after testing")
  .usage("[options] <package> [file]")
  .arguments("<package> [file]")
  .action(function(pname, fname) {
    packagename = pname;
    filename = fname;
  })
  .parse(process.argv);

if (!packagename) {
  console.error("Error: No package specified");
  process.exit(1);
}

const pathToScripts = __dirname;

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

let results = [],
  code,
  gzippedCode;

function installPackage() {
  const command = "npm install --prefix " + pathToScripts + " " + packagename;

  try {
    child.execSync(command);
  }
  catch (e) {
	// Unecessary to print out error as the failure of the execSync will print it anyway
    process.exit(1);
  }
}

function uninstallPackage() {
  const command = "npm uninstall --prefix " + pathToScripts + " " + packagename.split("@")[0];

  try {
    child.execSync(command);
  }
  catch (e) {
    console.error("Error uninstalling package " + packagename + ": " + e);
    process.exit(1);
  }
}

function checkFile() {
  // If filename has not been passed as an argument, attempt to resolve file from package.json
  filename = filename ? path.join(pathToScripts, "node_modules", filename) : require.resolve(packagename.split("@")[0]);
  console.log("file: " + path.basename(filename));

  if (!filename || !pathExists(filename)) {
    console.error("File not found. Exiting.");
    process.exit(1);
  }
}

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

function testFile() {
  code = fs.readFileSync(filename, "utf8");
  gzippedCode = zlib.gzipSync(code);

  test("babili", function (code) {
    return babel.transform(code, {
      sourceType: "script",
      presets: [require("../packages/babel-preset-babili")],
      comments: false,
    }).code;
  });

  test("closure", function (/*code*/) {
    return child.execSync(
      "java -jar " + path.join(__dirname, "gcc.jar") +
      " --language_in=ECMASCRIPT5 --env=CUSTOM --jscomp_off=* --js " + filename
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
}

function processResults() {
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
}

function pathExists(path) {
  try {
    return fs.statSync(path);
  }
  catch (e) {
    return false;
  }
}

const packagePath = path.join(pathToScripts, "node_modules", packagename);

if (!pathExists(packagePath) || !script.offline) {
  installPackage();
}

checkFile();
testFile();
processResults();

if (!script.offline) {
  uninstallPackage();
}
