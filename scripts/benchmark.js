#!/usr/bin/env node
"use strict";

Error.stackTraceLimit = Infinity;

const uglify = require("uglify-js");
const MDTable = require("markdown-table");
const CLITable = require("cli-table");
const child = require("child_process");
const bytes = require("bytes");
const chalk = require("chalk");
const babel = require("babel-core");
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");
const request = require("request");
const program = require("commander");
const compile = require("google-closure-compiler-js").compile;

const ASSETS_DIR = path.join(__dirname, "benchmark_cache");
const DEFAULT_ASSETS = {
  "react.js": "https://unpkg.com/react/dist/react.js", // 120 kb
  "vue.js": "https://unpkg.com/vue/dist/vue.js", // 230 kb
  "lodash.js": "https://unpkg.com/lodash/lodash.js", // 500kb
  "three.js": "https://unpkg.com/three/build/three.js" // 1000kb
};

let DEBUG = true;

class Benchmark {
  constructor(files = [] /* absolute path of files */) {
    this.files = files;
    this.results = [];
  }
  runAndPrint(target) {
    this.files.forEach(file => {
      const result = this.runFile(file);
      const printer = new Printer(result, target);
      printer.print();
    });
  }
  run() {
    this.files.forEach(file => this.runFile(file));
    return this.results;
  }
  runFile(filename) {
    if (DEBUG) console.error(`Benchmark - ${filename}`);

    const code = this.getFile(filename);
    const gzipped = zlib.gzipSync(code);

    const result = {
      input: code,
      gzipped,
      filename,
      items: [
        this.test(this.babili, code),
        this.test(this.uglify, code),
        this.test(this.closureCompiler, filename, false),
        this.test(this.closureCompilerJs, code)
      ]
    };

    const min = Math.min(...result.items.map(item => item.gzipped.length));
    const max = Math.max(...result.items.map(item => item.gzipped.length));

    for (const item of result.items) {
      if (item.gzipped.length === min) {
        item.isMin = true;
      }
      if (item.gzipped.length === max) {
        item.isMax = true;
      }
    }

    this.results.push(result);
    return result;
  }
  test(fn, arg, warmup = false) {
    // eslint-disable-line
    if (DEBUG) console.error(`Running ${fn.name}`);

    // warm up
    if (warmup) fn.call(null, arg);

    const start = process.hrtime();
    const output = fn.call(null, arg);
    const delta = process.hrtime(start);

    const gzipped = zlib.gzipSync(output);
    const parseTime = this.getParseTime(output);

    return {
      name: fn.name,
      output,
      gzipped,
      parseTime,
      time: delta[0] * 1e3 + delta[1] / 1e6
    };
  }
  babili(code) {
    return babel.transform(code, {
      sourceType: "script",
      presets: [require("../packages/babel-preset-babili")],
      comments: false
    }).code;
  }
  uglify(code) {
    return uglify.minify(code, {
      fromString: true
    }).code;
  }
  closureCompiler(filename) {
    return child
      .execSync(
        "java -jar " +
          path.join(__dirname, "gcc.jar") +
          " --language_in=ECMASCRIPT5 --env=CUSTOM --jscomp_off=* --js " +
          filename
      )
      .toString();
  }
  closureCompilerJs(code) {
    const flags = {
      jsCode: [{ src: code }],
      env: "CUSTOM"
    };
    const out = compile(flags);
    return out.compiledCode;
  }
  getParseTime(code) {
    const start = process.hrtime();
    exports.DUMMY = new Function(code);
    const delta = process.hrtime(start);

    return delta[0] * 1e3 + delta[1] / 1e6;
  }
  getFile(filename) {
    return fs.readFileSync(filename, "utf-8").toString();
  }
}

class Printer {
  constructor(result, target = "TERM") {
    this.result = result;

    // output to terminal or output as markdown
    // TERM | MD
    target = target.toUpperCase();
    if (["TERM", "MD"].indexOf(target) < 0)
      throw new Error(
        `Invalid Target specified to printer. Got ${target}. Expected TERM|MD`
      );
    this.target = target;

    this.header = [
      "minifier",
      "output raw",
      "raw win",
      "gzip output",
      "gzip win",
      "parse time (ms)",
      "minify time (ms)"
    ];
  }
  print() {
    switch (this.target) {
      case "TERM":
        const tableProps = {
          head: this.header,
          chars: {
            top: "",
            "top-left": "",
            "top-mid": "",
            "top-right": "",
            left: "",
            "left-mid": "",
            mid: "",
            "mid-mid": "",
            right: "",
            "right-mid": "",
            bottom: "",
            "bottom-left": "",
            "bottom-mid": "",
            "bottom-right": "",
            middle: " | "
          },
          style: {
            "padding-left": 0,
            "padding-right": 0,
            head: ["bold"]
          }
        };
        const clitable = new CLITable(tableProps);
        const rows = this.getRows(this.result);
        clitable.push(...rows);

        this.printHead(this.result);
        console.log(clitable.toString());

        break;
      case "MD":
        const mdtable = [this.header, ...this.getRows(this.result)];
        this.printHead(this.result);
        console.log(MDTable(mdtable));

        break;
    }
  }
  printHead(data) {
    console.log(`\nBenchmark Results for ${path.basename(data.filename)}:`);
    this.target === "MD" && console.log("");
    console.log(`Input Size: ${bytes(data.input.length)}`);
    this.target === "MD" && console.log("");
    console.log(`Input Size (gzip): ${bytes(data.gzipped.length)}\n`);
  }
  getRows(result) {
    return result.items.map(item =>
      this.getColumns(item, result).map((col, i) => {
        if (!i) return this.bold(col);
        if (item.isMin) return this.green(col);
        if (item.isMax) return this.red(col);
        return col;
      }));
  }
  bold(col) {
    return this.target === "MD" ? `**${col}**` : chalk.bold(col);
  }
  green(col) {
    return this.target === "MD" ? `**${col}**` : chalk.green(col);
  }
  red(col) {
    return this.target === "MD" ? col : chalk.red(col);
  }
  getColumns(item, res) {
    return [
      item.name,
      bytes(item.output.length),
      Math.round(100 - 100 * item.output.length / res.input.length) + "%",
      bytes(item.gzipped.length),
      Math.round(100 - 100 * item.gzipped.length / res.gzipped.length) + "%",
      item.parseTime.toFixed(2),
      item.time.toFixed(2)
    ];
  }
}

class AssetsManager {
  constructor(assets, cacheDir) {
    this.assets = assets;
    this.cacheDir = cacheDir;
  }
  filePath(filename) {
    return path.join(this.cacheDir, filename);
  }
  updateCache() {
    if (DEBUG) console.error("Updating Cache...");
    const files = Object.keys(this.assets);

    return Promise.all(
      files
        .filter(filename => !pathExists(this.filePath(filename)))
        .map(filename =>
          this.download(this.assets[filename], this.filePath(filename)))
    ).then(() => files.map(filename => this.filePath(filename)));
  }
  download(url, dest) {
    if (DEBUG) console.error(`Downloading ${url}`);

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);

      request(url).pipe(file).on("error", err => {
        fs.unlink(dest);
        reject(err);
      });

      file.on("finish", () => file.close(resolve));
    }).then(() => {
      if (DEBUG) console.error(`Download Complete ${url}`);
    });
  }
}

function pathExists(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (e) {
    return false;
  }
}

function run() {
  let files = [];

  program
    .usage("[options] <file ...>")
    .arguments("[file...]")
    .action(_files => files = _files)
    .option("-q, --quiet", "Quiet mode. Show only results. Don't show progress")
    .option("-t, --target [target]", "Output target (TERM|MD)")
    .option(
      "-c, --copy [copymode]",
      "[boolean] Copy mode. Gather results before printing",
      copy => copy === "1" || copy.toLowerCase() === "true"
    )
    .parse(process.argv);

  DEBUG = !program.quiet;

  const prepare = files.length > 0
    ? Promise.resolve(files)
    : new AssetsManager(DEFAULT_ASSETS, ASSETS_DIR).updateCache();

  prepare
    .then(files => {
      const benchmark = new Benchmark(files);
      if (DEBUG) console.error("Running Benchmarks...");

      if (program.copy) {
        benchmark.run();
        for (const result of benchmark.results) {
          new Printer(result, program.target).print();
        }
      } else {
        benchmark.runAndPrint(program.target);
      }
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}

run();
