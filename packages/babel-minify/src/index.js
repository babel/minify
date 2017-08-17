const babelCore = require("babel-core");
const babelPresetMinify = require("babel-preset-minify");

module.exports = function babelMinify(
  input,
  // Minify options passed to minifyPreset
  // defaults are handled in preset
  options = {},
  // overrides and other options
  {
    minified = true,
    inputSourceMap = null,
    sourceMaps = false,

    // to override the default babelCore used
    babel = babelCore,

    // to override the default minify preset used
    minifyPreset = babelPresetMinify
  } = {}
) {
  return babel.transform(input, {
    babelrc: false,
    presets: [[minifyPreset, options]],
    comments: false,
    inputSourceMap,
    sourceMaps,
    minified
  });
};
