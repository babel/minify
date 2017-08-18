const fs = require("fs");
const path = require("path");
const readdir = require("fs-readdir-recursive");
const promisify = require("util.promisify");
const mkdirp = promisify(require("mkdirp"));

const minify = require("./");
const EXTENSIONS = [".js", ".mjs"];

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const lstat = promisify(fs.lstat);

class MinifyFileError extends Error {
  constructor(message, { file }) {
    super(message);
    this.file = file;
  }
}

// set defaults
const readFile = file => readFileAsync(file, { encoding: "utf-8" });
const writeFile = (file, data) =>
  writeFileAsync(file, data, { encoding: "utf-8" });

function isJsFile(file) {
  return EXTENSIONS.some(ext => path.extname(file) === ext);
}

async function isDir(p) {
  try {
    return (await lstat(p)).isDirectory();
  } catch (e) {
    return false;
  }
}

async function isFile(p) {
  try {
    return (await lstat(p)).isFile();
  } catch (e) {
    return false;
  }
}

// the async keyword simply exists to denote we are returning a promise
// even though we don't use await inside it
async function readStdin() {
  let code = "";
  const stdin = process.stdin;
  return new Promise(resolve => {
    stdin.setEncoding("utf8");
    stdin.on("readable", () => {
      const chunk = process.stdin.read();
      if (chunk !== null) code += chunk;
    });
    stdin.on("end", () => {
      resolve(code);
    });
  });
}

async function handleStdin(outputFilename, options) {
  const { code } = minify(await readStdin(), options);
  if (outputFilename) {
    await writeFile(outputFilename, code);
  } else {
    process.stdout.write(code);
  }
}

async function handleFile(filename, outputFilename, options) {
  const { code } = minify(await readFile(filename), options);
  if (outputFilename) {
    await writeFile(outputFilename, code);
  } else {
    process.stdout.write(code);
  }
}

async function handleFiles(files, outputDir, options) {
  if (!outputDir) {
    throw new TypeError(`outputDir is falsy. Got "${outputDir}"`);
  }

  return Promise.all(
    files.map(file => {
      const outputFilename = path.join(outputDir, path.basename(file));
      return mkdirp(path.dirname(outputFilename))
        .then(() => handleFile(file, outputFilename, options))
        .catch(e => Promise.reject(new MinifyFileError(e.message, { file })));
    })
  );
}

async function handleDir(dir, outputDir, options) {
  if (!outputDir) {
    throw new TypeError(`outputDir is falsy`);
  }

  // relative paths
  const files = readdir(dir);

  return Promise.all(
    files.filter(file => isJsFile(file)).map(file => {
      const outputFilename = path.join(outputDir, file);
      const inputFilename = path.join(dir, file);

      return mkdirp(path.dirname(outputFilename))
        .then(() => handleFile(inputFilename, outputFilename, options))
        .catch(e =>
          Promise.reject(
            new MinifyFileError(e.message, { file: inputFilename })
          )
        );
    })
  );
}

async function handleArgs(args, outputDir, options) {
  const files = [];
  const dirs = [];

  if (!Array.isArray(args)) {
    throw new TypeError(`Expected Array. Got ${JSON.stringify(args)}`);
  }

  for (const arg of args) {
    if (await isFile(arg)) {
      files.push(arg);
    } else if (await isDir(arg)) {
      dirs.push(arg);
    } else {
      throw new TypeError(`Input "${arg}" is neither a file nor a directory.`);
    }
  }

  return Promise.all([
    handleFiles(files, outputDir, options),
    ...dirs.map(dir => handleDir(dir, outputDir, options))
  ]);
}

module.exports = {
  handleFile,
  handleStdin,
  handleFiles,
  handleDir,
  handleArgs,
  isFile,
  isDir,
  isJsFile,
  readFile,
  writeFile
};
