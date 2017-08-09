jest.autoMockOff();

const { execFileSync } = require("child_process");
const { join } = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const babiliCli = require.resolve("../bin/babili");

function exec(stdin, ...opts) {
  let options = { encoding: "utf-8" };
  if (stdin !== "") {
    options = Object.assign(options, {
      input: stdin
    });
  }
  return execFileSync(`${babiliCli}`, [].concat(opts), options);
}

function testFile(input, output, ...opts) {
  exec("", "--mangle.topLevel", input, ...opts);
  expect(fs.readFileSync(output, "utf-8")).toEqual("let a=10;");
  rimraf.sync(output); // delete the file
}

describe("Babili CLI", () => {
  it("should show help for --help", () => {
    expect(exec("", "--help")).toBeDefined();
  });

  it("should show version for --vevrsion", () => {
    const { version } = require("../package");
    expect(exec("", "--version").trim()).toEqual(version);
  });

  it("should throw on all invalid options", () => {
    expect(exec("", "--foo", "--bar")).toMatchSnapshot();
  });

  it("should throw if both out-file and out-dir is true", () => {
    expect(exec("", "--out-file", "--out-dir")).toMatchSnapshot();
  });

  it("should read from stdin and o/p to stdout", () => {
    let source = "let abcd = 10, bcdsa = 20";
    expect(exec(source, "--mangle.topLevel")).toMatchSnapshot();
  });

  it("should handle input file and --out-file option", () => {
    const inputPath = join(__dirname, "/fixtures/out-file/foo.js");
    // creates <filename>.min.js by default
    const defaultPath = join(__dirname, "/fixtures/out-file/foo.min.js");
    testFile(inputPath, defaultPath);
    // creates bar.js using --out-file option
    const outFilePath = join(__dirname, "/fixtures/out-file/bar.js");
    testFile(inputPath, outFilePath, "--out-file", outFilePath);
  });

  it("should handle directory and  --out-dir option", () => {
    const inputPath = join(__dirname, "/fixtures/out-dir");
    //creates <filename>.min.js in the src directory by default
    const outputPath = join(__dirname, "/fixtures/out-dir/a/foo.min.js");
    testFile(inputPath, outputPath);
    // creates <filename>.min.js in --out-dir
    const outDir = join(__dirname, "/fixtures/out-dir/bar");
    const checkFilePath = join(outDir, "/a/foo.min.js");
    testFile(inputPath, checkFilePath, "--out-dir", outDir);
    rimraf.sync(outDir);
  });
});
