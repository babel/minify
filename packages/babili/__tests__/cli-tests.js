jest.autoMockOff();

const { spawnSync } = require("child_process");
const { join } = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const babili = require.resolve("../bin/babili");

function spawn(stdin, ...opts) {
  let options = { encoding: "utf-8" };
  if (stdin !== "") {
    options = Object.assign(options, { input: stdin });
  }
  return spawnSync(`${babili}`, [].concat(opts), options);
}

function testFile(input, output, ...opts) {
  spawn("", "--mangle.topLevel", input, ...opts);
  expect(fs.readFileSync(output, "utf-8")).toEqual("let a=10;");
  rimraf.sync(output); // delete the file
}

describe("Babili CLI", () => {
  it("should show help for --help", () => {
    expect(spawn("", "--help")).toBeDefined();
  });

  it("should show version for --version", () => {
    const { version } = require("../package");
    expect(spawn("", "--version").stdout.trim()).toEqual(version);
  });

  it("should throw on all invalid options", () => {
    expect(spawn("", "--foo", "--bar").stderr).toMatchSnapshot();
  });

  it("should read from stdin and o/p to stdout", () => {
    const source = "let abcd = 10, bcdsa = 20";
    expect(spawn(source, "--mangle.topLevel").stdout).toMatchSnapshot();
  });

  xit("should handle input file and --out-file option", () => {
    const inputPath = join(__dirname, "/fixtures/out-file/foo.js");
    const outFilePath = join(__dirname, "/fixtures/out-file/bar.js");
    testFile(inputPath, outFilePath, "--out-file", outFilePath);
  });

  xit("should handle directory and  --out-dir option", () => {
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
