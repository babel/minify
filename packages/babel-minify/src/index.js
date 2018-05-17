const babelCore = require("@babel/core");
const babelPresetMinify = require("babel-preset-minify");

module.exports = function babelMinify(
  input,
  // Minify options passed to minifyPreset
  // defaults are handled in preset
  minifyOptions = {},
  // overrides and other options
  {
    minified = true,
    inputSourceMap,
    sourceMaps = false,
    sourceType = "script",
    comments = /^\**!|@preserve|@licen[sc]e|@cc_on/,

    // to override the default babelCore used
    babel = babelCore,

    // to override the default minify preset used
    minifyPreset = babelPresetMinify,

    // passthrough to babel
    filename,
    filenameRelative
  } = {}
) {
  return babel.transformSync(input, {
    babelrc: false,
    configFile: false,
    presets: [[minifyPreset, minifyOptions]],
    shouldPrintComment(contents) {
      return shouldPrintComment(contents, comments);
    },
    inputSourceMap,
    sourceMaps,
    minified,
    sourceType,
    filename,
    filenameRelative
  });
};

function shouldPrintComment(contents, predicate) {
  switch (typeof predicate) {
    case "function":
      return predicate(contents);
    case "object":
      return predicate.test(contents);
    default:
      return !!predicate;
  }
}
