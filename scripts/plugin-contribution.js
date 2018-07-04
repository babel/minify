#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { transformSync } = require("@babel/core");
const Table = require("cli-table");
const zlib = require("zlib");
const chalk = require("chalk");
// const vm = require("vm");

run(process.argv[2]);

function run(inputFile) {
  const input = fs.readFileSync(inputFile).toString();
  const table = new Table(
    Object.assign(
      {
        head: [
          "name",
          "output(bytes)",
          "output gzip(bytes)",
          "raw compression (%)",
          "gzip win (%)",
          "gzip % (%)",
          "parse time Δ (ms)"
        ]
      },
      tableStyle()
    )
  );

  const baseOutput = transformSync(input, {
    minified: true,
    babelrc: false,
    configFile: false,
    compact: true,
    comments: false
  }).code;

  const baseGzip = zlib.gzipSync(baseOutput);

  const baseParseTime = getParseTime(baseOutput);

  const plugins = getPlugins();
  let current = 1;

  plugins.forEach(({ name, plugin }) => {
    process.stdout.write(`Plugin ${current++}/${plugins.length}\r`);

    const output = transformSync(baseOutput, {
      plugins: [plugin],
      minified: true,
      babelrc: false,
      configFile: false,
      compact: true,
      comments: false
    }).code;

    const gzippedOutput = zlib.gzipSync(output);

    const parseTime = getParseTime(output);

    const percentage = (1 - len(output) / len(baseOutput)) * 100;
    const gzipWin = (1 - len(gzippedOutput) / len(baseGzip)) * 100;
    const gzipPercentage = (1 - len(gzippedOutput) / len(output)) * 100;

    const parseTimeDiff = baseParseTime - parseTime;

    table.push([
      name.split("babel-plugin-")[1],
      len(output),
      len(gzippedOutput),
      percentage.toFixed(3),
      gzipWin < 0 ? chalk.red(gzipWin.toFixed(3)) : gzipWin.toFixed(3),
      gzipPercentage.toFixed(3),
      chalk[parseTimeDiff < 0 ? "green" : "red"](parseTimeDiff)
    ]);
  });

  const wcWin = (1 - len(baseOutput) / len(input)) * 100;

  console.log(
    `
input: input file with white space and comments removed

input size (bytes)      : ${len(baseOutput)}
input gzip size (bytes) : ${len(baseGzip)}

raw compression : % decrease from input -> output
gzip win        : % decrease from gzipInput -> gzipOutput
gzip %          : % decrease from output -> gzipOutput

Whitespaces and comments win (raw compression): ${wcWin}
`
  );

  console.log(table.toString());
}

function getPlugins() {
  return fs
    .readdirSync(path.join(__dirname, "../packages"))
    .filter(dir => {
      if (!isDir(path.join(__dirname, "../packages", dir))) return false;
      if (dir.indexOf("babel-plugin-") !== 0) return false;
      try {
        require(`../packages/${dir}`);
        return true;
      } catch (e) {
        return false;
      }
    })
    .map(pluginName => ({
      name: pluginName,
      plugin: require(`../packages/${pluginName}`)
    }));
}

function getParseTime(code) {
  // const context = vm.createContext();
  // const script = new vm.Script(code);

  const parseStart = process.hrtime();
  new Function(code + ";void(" + Math.random() + ");");
  // script.runInContext(context);
  const diff = process.hrtime(parseStart);
  return diff[1] / 1000000;
}

function isDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch (e) {
    return false;
  }
}

function len(str) {
  return Buffer.byteLength(str, "utf-8");
}

// just to keep it at the bottom
function tableStyle() {
  return {
    chars: {
      top: "",
      "top-mid": "",
      "top-left": "",
      "top-right": "",
      bottom: "",
      "bottom-mid": "",
      "bottom-left": "",
      "bottom-right": "",
      left: "",
      "left-mid": "",
      mid: "",
      "mid-mid": "",
      right: "",
      "right-mid": "",
      middle: " "
    },
    style: {
      "padding-left": 0,
      "padding-right": 0,
      head: ["bold"]
    }
  };
}
