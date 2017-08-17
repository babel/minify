const babelCore = require("babel-core");
const babelPresetMinify = require("babel-preset-minify");

module.exports = function babelMinify(
  input,
  // Minify options passed to minifyPreset
  // defaults are handled in preset
  minifyOpts = {},
  // overrides and other options
  {
    minified = true,
    inputSourceMap = null,
    sourceMaps = false,
    comments = /^\**!|@preserve|@license|@cc_on/,

    // to override the default babelCore used
    babel = babelCore,

    // to override the default minify preset used
    minifyPreset = babelPresetMinify,

    filename,
    filenameRelative
  } = {}
) {
  return babel.transform(input, {
    minified,
    babelrc: false,
    ast: false,

    presets: [[minifyPreset, minifyOpts]],

    sourceMaps,
    inputSourceMap,

    shouldPrintComment(contents) {
      return shouldPrintComment(contents, comments);
    },

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
