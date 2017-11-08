const fs = require("fs");
const promisify = require("util.promisify");

async function _readFile(p, enc) {
  return new Promise((resolve, reject) => {
    fs.readFile(p, enc, (err, contents) => {
      if (err) reject(err);
      else resolve(contents);
    });
  });
}

async function readFile(p) {
  return _readFile(p, "utf-8");
}

function readFileSync(p) {
  return fs.readFileSync(p, "utf-8");
}

const writeFile = promisify(fs.writeFile);

const stat = promisify(fs.stat);

async function isFile(p) {
  try {
    return (await stat(p)).isFile();
  } catch (e) {
    return false;
  }
}

async function isDirectory(p) {
  try {
    return (await stat(p)).isDirectory();
  } catch (e) {
    return false;
  }
}

function isDirectorySync(d) {
  try {
    return fs.statSync(d).isDirectory();
  } catch (e) {
    return false;
  }
}

const readdir = promisify(fs.readdir);

module.exports = {
  readFileSync,
  readdirSync: fs.readdirSync,
  readFile,
  writeFile,
  stat,
  isFile,
  isDirectory,
  isDirectorySync,
  readdir
};
