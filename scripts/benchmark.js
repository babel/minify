#!/usr/bin/env node
Error.stackTraceLimit = Infinity;

const uglify = require('uglify-js');
const Table  = require('cli-table');
const child  = require('child_process');
const bytes  = require('bytes');
const chalk  = require('chalk');
const babel  = require('babel-core');
const zlib   = require('zlib');
const fs     = require('fs');
const path   = require('path');


require('babel-jest/node_modules/babel-core').register();

const filename = process.argv[2];
if (!filename) {
  console.error('Error: No filename specified');
  process.exit(1);
}

const table = new Table({
  head: ['', 'raw', 'raw win', 'gzip', 'gzip win', 'parse time', 'run'],
  chars: {
    top: '',
    'top-mid': '' ,
    'top-left': '' ,
    'top-right': '',
    bottom: '' ,
    'bottom-mid': '' ,
    'bottom-left': '' ,
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '' ,
    'right-mid': '',
    middle: ' ',
  },
  style: {
    'padding-left': 0,
    'padding-right': 0,
    head: ['bold'],
  },
});

const results = [];

const code = fs.readFileSync(filename, 'utf8');
const gzippedCode = zlib.gzipSync(code);

function test(name, callback) {
  const start = Date.now();
  const result = callback(code);
  const end = Date.now();
  const run = end - start;

  fs.writeFileSync('.test_gen_' + name + '.js', result);

  const gzipped = zlib.gzipSync(result);

  const parseStart = Date.now();
  // disable for now we have a failing test in dce
  new Function(result);
  const parseEnd = Date.now();
  const parseNow = parseEnd - parseStart;

  results.push({
    name: name,
    raw: result.length,
    gzip: gzipped.length,
    parse: parseNow,
    run: run,
  });
}

test('babel', function (code, callback) {
  return babel.transform(code, {
    sourceType: 'script',
    plugins: [
      [
        require('../src/replace-plugin'),
        {
          replacements: [{
            identifierName: '__DEV__',
            replacement: {
              type: 'booleanLiteral',
              value: true,
            },
          }],
        },
      ],
      require('../src/constant-folding-plugin'),
      require('../src/mangle-names-plugin'),
      require('../src/dce-plugin'),
      require('../src/simplify-plugin'),
    ],
    minified: true,
    comments: false,
  }).code;
});

if (filename.match(/fb\.js/)) {
  test('jsxmin', function (code, callback) {
    return fs.readFileSync(path.join(__dirname, 'fb-jsmin.js'));
  });
}

test('closure', function (code, callback) {
  return child.execSync(
    'java -jar ' + path.join(__dirname, 'gcc.jar') + ' --jscomp_off=uselessCode --js ' + filename
  );
});

test('uglify', function (code, callback) {
  return uglify.minify(code, {
    fromString: true,
  }).code;
});

results = results.sort(function (a, b) {
  return a.gzip > b.gzip;
});

results.forEach(function (result, i) {
  const row = [
    chalk.bold(result.name),
    bytes(result.raw),
    Math.round(((code.length / result.raw) * 100) - 100) + '%',
    bytes(result.gzip),
    Math.round(((gzippedCode.length / result.gzip) * 100) - 100) + '%',
    Math.round(result.parse) + 'ms',
    Math.round(result.run) + 'ms',
  ];

  const style = chalk.yellow;
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
