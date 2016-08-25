import child from "child_process";

const args = process.argv.slice(2).concat(["--presets=minify"]);

const opts = {
  stdio: "inherit",
  env: process.env,
};

child.spawn(require.resolve("babel-cli/bin/babel"), args, opts);
