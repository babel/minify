#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {transform} = require("babel-core");
const Table = require("cli-table");
const zlib = require("zlib");

run(process.argv[2]);

function run(inputFile) {
  const input = fs.readFileSync(inputFile).toString();
  const table = new Table(Object.assign({
    head: [
      "name",
      "output(bytes)",
      "output gzip(bytes)",
      "raw compression (%)",
      "gzip win (%)",
      "gzip % (%)"
    ],
  }, tableStyle()));

  const baseOutput = transform(input, {
    minified: true,
    compact: true,
    comments: false,
  }).code;

  const baseGzip = zlib.gzipSync(baseOutput);

  getPlugins().forEach(({name, plugin}) => {
    const output = transform(baseOutput, {
      plugins: [plugin],
      minified: true,
      compact: true,
      comments: false,
    }).code;

    const gzippedOutput = zlib.gzipSync(output);

    const percentage = (1 - len(output) / len(baseOutput)) * 100;
    const gzipWin = (1 - len(gzippedOutput) / len(baseGzip)) * 100;
    const gzipPercentage = (1 - len(gzippedOutput) / len(output)) * 100;

    table.push([
      name.split("babel-plugin-")[1],
      len(output),
      len(gzippedOutput),
      percentage.toFixed(3),
      gzipWin.toFixed(3),
      gzipPercentage.toFixed(3),
    ]);
  });

  const wcWin = (1 - len(baseOutput) / len(input)) * 100;

  console.log(`
input: input file with white space and comments removed

input size (bytes)      : ${len(baseOutput)}
input gzip size (bytes) : ${len(baseGzip)}

raw compression : % decrease from input -> output
gzip win        : % decrease from gzipInput -> gzipOutput
gzip %          : % decrease from output -> gzipOutput

Whitespaces and comments win (raw compression): ${wcWin}
`);

  console.log(table.toString());
}

function getPlugins() {
  return fs.readdirSync(path.join(__dirname, "../packages"))
    .filter((dir) => {
      if (!isDir(path.join(__dirname, "../packages", dir))) return false;
      if (dir.indexOf("babel-plugin-") !== 0) return false;
      try {
        require(`../packages/${dir}`);
        return true;
      } catch (e) {
        return false;
      }
    })
    .map((pluginName) => ({
      name: pluginName,
      plugin: require(`../packages/${pluginName}`)
    }));
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
    }
  };
}
