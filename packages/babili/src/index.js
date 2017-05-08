import child from "child_process";

const args = [
  require.resolve("babel-cli/bin/babel.js"),
  ...process.argv.slice(2),
  `--presets=${require.resolve("babel-preset-babili")}`,
  "--no-babelrc"
];

const opts = {
  stdio: "inherit",
  env: process.env
};

child.spawn(process.execPath, args, opts);
