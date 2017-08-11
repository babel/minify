jest.autoMockOff();

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const promisify = require("util.promisify");
const rimraf = require("rimraf");
const babiliCli = require.resolve("../bin/babili");

const readFileAsync = promisify(fs.readFile);
const readFile = file => readFileAsync(file).then(out => out.toString());
const unlink = promisify(rimraf);

function runCli(args = [], stdin) {
  return new Promise((resolve, reject) => {
    const child = spawn(babiliCli, args, {
      stdio: [stdin ? "pipe" : "inherit", "pipe", "pipe"],
      shell: true
    });

    if (stdin) {
      child.stdin.end(stdin);
    }

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", data => (stdout += data));
    child.stderr.on("data", data => (stderr += data));
    child.on(
      "close",
      code =>
        code === 0 ? resolve({ stdout, stderr }) : reject({ code, stderr })
    );
  });
}

let tempSource = `
function foo() {
  const bar = x(1);
  const baz = y(2);
  return z(bar, baz);
}
`;

const sampleInputFile = path.join(__dirname, "fixtures/out-file/foo.js");
const sampleInputDir = path.join(__dirname, "fixtures/out-dir/a");

const tempOutFile = path.join(__dirname, "fixtures/out-file/foo.min.js");
const tempOutDir = path.join(__dirname, "fixtures/out-dir/min");
const tempOutDirFile = path.join(__dirname, "fixtures/out-dir/min/foo.js");

describe("Babili CLI", () => {
  afterEach(async () => {
    await unlink(tempOutDir);
    await unlink(tempOutFile);
  });

  it("should show help for --help", () => {
    return expect(runCli(["--help"])).resolves.toBeDefined();
  });

  it("should show version for --version", () => {
    const { version } = require("../package");
    return expect(
      runCli(["--version"]).then(({ stdout }) => stdout.trim())
    ).resolves.toBe(version);
  });

  it("should throw on all invalid options", () => {
    return expect(runCli(["--foo", "--bar"])).rejects.toMatchSnapshot();
  });

  it("stdin + stdout", () => {
    return expect(
      runCli(["--mangle.topLevel"], tempSource)
    ).resolves.toMatchSnapshot();
  });

  it("stdin + outFile", async () => {
    await runCli(["--out-file", tempOutFile], tempSource);
    expect(await readFile(tempOutFile)).toMatchSnapshot();
  });

  it("input file + stdout", async () => {
    return expect(runCli([sampleInputFile])).resolves.toMatchSnapshot();
  });

  it("input file + outFile", async () => {
    await runCli([sampleInputFile, "--out-file", tempOutFile]);
    expect(await readFile(tempOutFile)).toMatchSnapshot();
  });

  it("input file + outDir", async () => {
    await runCli([sampleInputFile, "--out-dir", tempOutDir]);
    expect(await readFile(tempOutDirFile)).toMatchSnapshot();
  });

  it("input dir + outdir", async () => {
    await runCli([sampleInputDir, "--out-dir", tempOutDir]);
    expect(await readFile(tempOutDirFile)).toMatchSnapshot();
  });
});
