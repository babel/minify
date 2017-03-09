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
const request = require("request");
const compile = require("google-closure-compiler-js").compile;

// constants
const DEBUG = true;
const ASSETS_DIR = path.join(__dirname, "benchmark_cache");
const DEFAULT_ASSETS = {
  "react.js"       : "https://unpkg.com/react/dist/react.js",
  "vue.js"         : "https://unpkg.com/vue/dist/vue.js",
  "jquery.js"      : "https://unpkg.com/jquery/dist/jquery.js",
  "jquery.flot.js" : "https://unpkg.com/flot/jquery.flot.js",
  "three.js"       : "https://unpkg.com/three/build/three.js",
};

class Benchmark {
  constructor(files = [] /* absolute path of files */) {
    this.files = files;
    this.result = [];
  }
  run() {
    this.files.forEach((file) => this.runFile(file));
  }
  runFile(filename) {
    if (DEBUG) console.log(`Benchmark - ${filename}`);

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
        this.test(this.closureCompilerJs, code),
      ]
    };

    const min = Math.min(...result.items.map((item) => item.gzipped.length));
    const max = Math.max(...result.items.map((item) => item.gzipped.length));

    for (const item of result.items) {
      if (item.gzipped.length === min) {
        item.isMin = true;
      }
      if (item.gzipped.length === max) {
        item.isMax = true;
      }
    }

    this.result.push(result);
  }
  test(fn, arg, warmup = true) { // eslint-disable-line
    if (DEBUG) console.log(`Running ${fn.name}`);

    // warm up
    // if (warmup) fn.call(null, arg);

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
      comments: false,
    }).code;
  }
  uglify(code) {
    return uglify.minify(code, {
      fromString: true,
    }).code;
  }
  closureCompiler(filename) {
    return child.execSync(
      "java -jar " + path.join(__dirname, "gcc.jar") +
      " --language_in=ECMASCRIPT5 --env=CUSTOM --jscomp_off=* --js " + filename
    ).toString();
  }
  closureCompilerJs(code) {
    const flags = {
      jsCode: [{ src: code }],
      env: "CUSTOM",
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

class AssetsManager {
  constructor(assets, cacheDir) {
    this.assets = assets;
    this.cacheDir = cacheDir;
  }
  filePath(filename) {
    return path.join(this.cacheDir, filename);
  }
  updateCache() {
    if (DEBUG) console.log("Updating Cache...");
    const files = Object.keys(this.assets);

    return Promise.all(
      files
        .filter((filename) => !pathExists(this.filePath(filename)))
        .map(
          (filename) => this.download(
            this.assets[filename], this.filePath(filename)
          )
        )
    ).then(() => files.map((filename) => this.filePath(filename)));
  }
  download(url, dest) {
    if (DEBUG) console.log(`Downloading ${url}`);

    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);

      request(url)
        .pipe(file)
        .on("error", (err) => {
          fs.unlink(dest);
          reject(err);
        });

      file.on("finish", () => file.close(resolve));
    }).then(() => {
      if (DEBUG) console.log(`Download Complete ${url}`);
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

function getTable() {
  return new Table({
    head: [
      "minifier",
      "output raw",
      "raw win",
      "gzip output",
      "gzip win",
      "parse time (ms)",
      "minify time (ms)"
    ],
    chars: {
      top: "", "top-left": "", "top-mid": "", "top-right": "",
      left: "", "left-mid": "",
      mid: "", "mid-mid": "",
      right: "", "right-mid": "",
      bottom: "", "bottom-left": "", "bottom-mid": "", "bottom-right": "",
      middle: " | "
    },
    style: {
      "padding-left": 0,
      "padding-right": 0,
      head: ["bold"],
    },
  });
}

function run() {
  const options = process.argv.slice(2);

  const prepare = options.length > 0
    ? Promise.resolve(options)
    : new AssetsManager(DEFAULT_ASSETS, ASSETS_DIR).updateCache();

  prepare.then((files) => {
    const benchmark = new Benchmark(files);
    benchmark.run();

    if (DEBUG) console.log("Generating results...");

    // row: minifier, output raw, raw win, gzip output, gzip win, parse time, minify time,
    for (const res of benchmark.result) {
      const rows = res.items.map((item) => [
        chalk.bold(item.name),
        bytes(item.output.length),
        Math.round(100 - 100 * item.output.length / res.input.length ) + "%",
        bytes(item.gzipped.length),
        Math.round(100 - 100 * item.gzipped.length / res.gzipped.length) + "%",
        item.parseTime.toFixed(2),
        item.time.toFixed(2)
      ].map((col) => {
        if (item.isMin) return chalk.green(col);
        if (item.isMax) return chalk.red(col);
        return col;
      }));

      const table = getTable();
      table.push(...rows);

      console.log(`\nBenchmark Results for ${path.basename(res.filename)}:`);
      console.log(`Input Size: ${bytes(res.input.length)}`);
      console.log(`Input Size (gzip): ${bytes(res.gzipped.length)}\n`);

      console.log(table.toString());
    }
  }).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

run();
