"use strict";

const minimist = require("minimist");

module.exports = function parseArgs(args) {
  const marker = args.indexOf("--");
  if (marker < 0) return {};
  return minimist(args.slice(marker + 1));
};
