/**
 * Configuration to bundle
 *
 * babel-preset-minify to babel-minify-standalone
 */
"use strict";

const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const MinifyPlugin = require("babel-minify-webpack-plugin");

// overrides for MinifyPlugin
// send the current version of babel-core
// and current master of preset-minify
const minifyPreset = require("babel-preset-minify");
const babel = require("babel-core");

const packagesDir = path.join(__dirname, "../packages");

const entry = fs
  .readdirSync(packagesDir)
  .filter(
    name =>
      name.indexOf("babel-plugin-") === 0 || name.indexOf("babel-preset-") === 0
  )
  .reduce((acc, cur) => Object.assign(acc, { [cur]: cur }), {});

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, "../packages/babel-minify-standalone/lib"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new MinifyPlugin(
      {},
      {
        babel,
        minifyPreset,
        comments: false
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: getBabelOptions()
        }
      }
    ]
  }
};

/**
 * Read babelrc, alter the preset-env target to match browsers instead of node,
 * leave other options as it is
 */
function getBabelOptions() {
  const babelrc = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../.babelrc")).toString()
  );
  babelrc.babelrc = false;

  // override target to browsers supported
  const envPreset = babelrc.presets.find(preset => preset[0] === "env");
  envPreset[1].targets = {
    browsers: [
      "last 3 Chrome versions",
      "last 3 Firefox versions",
      "last 3 Safari versions"
    ]
  };

  return babelrc;
}
