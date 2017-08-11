const babelCore = require("babel-core");
const babelPresetBabili = require("babel-preset-babili");

module.exports = function babili(
  input,
  // Minify options passed to babiliPreset
  // defaults are handled in preset
  options = {},
  // overrides and other options
  {
    minified = true,
    inputSourceMap = null,
    sourceMaps = false,

    // to override the default babelCore used
    babel = babelCore,

    // to override the default babiliPreset used
    babiliPreset = babelPresetBabili
  } = {}
) {
  return babel.transform(input, {
    babelrc: false,
    presets: [[babiliPreset, options]],
    comments: false,
    inputSourceMap,
    sourceMaps,
    minified
  });
};
