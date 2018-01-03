const babelCore = require("babel-core");
const through2 = require("through2");
const PluginError = require("plugin-error");
const applySourceMap = require("vinyl-sourcemaps-apply");
const babelPresetMinify = require("babel-preset-minify");

const NAME = "gulp-babel-minify";

module.exports = gulpBabelMinify;

function gulpBabelMinify(
  minifyOpts = {},
  {
    babel = babelCore,
    minifyPreset = babelPresetMinify,
    comments = /preserve|licen(s|c)e/
  } = {}
) {
  return through2.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError(NAME, "Streaming not supported"));
    }

    let inputSourceMap;
    if (file.sourceMap && file.sourceMap.mappings) {
      inputSourceMap = file.sourceMap;
    }

    const babelOpts = {
      minified: true,
      babelrc: false,
      ast: false,

      /* preset */
      presets: [[minifyPreset, minifyOpts]],

      /* sourcemaps */
      sourceMaps: !!file.sourceMap,
      inputSourceMap,

      shouldPrintComment(contents) {
        return shouldPrintComment(contents, comments);
      },

      /* file */
      filename: file.path,
      filenameRelative: file.relative
    };

    const { result, success, error } = transform({
      babel,
      input: file.contents.toString(),
      babelOpts
    });

    if (success) {
      file.contents = new Buffer(result.code);
      if (file.sourceMap) {
        applySourceMap(file, result.map);
      }
      return callback(null, file);
    }

    callback(error);
  });
}

function transform({ babel, input, babelOpts }) {
  try {
    return {
      success: true,
      result: babel.transform(input, babelOpts)
    };
  } catch (e) {
    return {
      success: false,
      error: e
    };
  }
}

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
