const fs = require("fs");
const path = require("path");
const readdir = require("fs-readdir-recursive");
const outputFileSync = require("output-file-sync");
const babili = require("./");
const EXTENSIONS = [".js", ".mjs"];

module.exports.processFiles = function(fileList, options) {
  const { fileOpts, options: babiliOpts } = detachOptions(options);
  const { stdin, outFile } = fileOpts;
  if (stdin) {
    readStdin().then(input => {
      let { code } = babili(input, babiliOpts);
      // write to stdout if ouput file is not specified
      if (outFile === void 0) {
        process.stdout.write(code + "\n");
      } else {
        fs.writeFileSync(path.resolve(outFile), code, "utf-8");
      }
    });
  } else {
    for (let filename of fileList) {
      handle(filename, fileOpts, babiliOpts);
    }
  }
};

function handle(filename, fileOpts, babiliOpts) {
  if (!fs.existsSync(filename)) return;

  const { outFile } = fileOpts;
  if (outFile !== undefined) {
    transform(filename, outFile, babiliOpts);
    return;
  }

  const stat = fs.statSync(filename);
  if (stat.isDirectory()) {
    const dirname = filename;
    readdir(dirname).forEach(filename => {
      const src = path.join(dirname, filename);
      handleFile(src, filename, fileOpts, babiliOpts);
    });
  } else {
    handleFile(filename, filename, fileOpts, babiliOpts);
  }
}

function handleFile(src, relative, fileOpts, babiliOpts) {
  const ext = getValidFileExt(relative);
  if (ext === undefined) {
    return;
  }
  const { outDir } = fileOpts;
  let dest;
  const filename = getFileName(relative, ext);
  if (outDir) {
    dest = path.join(outDir, path.dirname(relative), filename);
  } else {
    dest = path.join(path.dirname(src), filename);
  }
  transform(src, dest, babiliOpts);
}

function transform(src, dest, babiliOpts) {
  const input = fs.readFileSync(src, "utf-8");
  const { code } = babili(input, babiliOpts);
  outputFileSync(dest, code, "utf-8");
}

function detachOptions(options) {
  const cliOpts = ["stdin", "outFile", "outDir"];
  const fileOpts = {};
  cliOpts.forEach(k => {
    fileOpts[k] = options[k];
    delete options[k];
  });

  return { fileOpts, options };
}

function readStdin() {
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

function getValidFileExt(filename) {
  const ext = path.extname(filename);
  const isValidExt = EXTENSIONS.some(e => e.indexOf(ext) >= 0);

  if (isValidExt) {
    return ext;
  }
  return "";
}

function getFileName(filePath, ext) {
  let filename = path.basename(filePath, ext);
  filename = filename.indexOf(".min") >= 0 ? filename : `${filename}.min`;
  return `${filename}${ext}`;
}
