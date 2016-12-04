const babelCore = require("babel-core");
const through2 = require("through2");
const gutil = require("gulp-util");
const applySourceMap = require("vinyl-sourcemaps-apply");
const babiliPreset = require("babel-preset-babili");

const {PluginError} = gutil;

const NAME = "gulp-babili";

module.exports = gulpBabili;

function gulpBabili(babiliOpts = {}, {
  babel = babelCore,
  babili = babiliPreset,
  comments = /@preserve|@license/
} = {}) {
  return through2.obj(function (file, enc, callback) {
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
      presets: [[babili, babiliOpts]],

      /* sourcemaps */
      sourceMaps: !!file.sourceMap,
      inputSourceMap,

      /* remove comments */
      shouldPrintComment(contents) {
        return shouldPrintComment(contents, comments);
      },

      /* file */
      filename: file.path,
      filenameRelative: file.relative,
    };

    const {result, success, error} = transform({
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
  case "function": return predicate(contents);
  case "object": return predicate.test(contents);
  default: return !!predicate;
  }
}
