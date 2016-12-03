const babelCore = require("babel-core");
const through2 = require("through2");
const gutil = require("gulp-util");
const applySourceMap = require("vinyl-sourcemaps-apply");
const babiliPreset = require("babel-preset-babili");

const {PluginError} = gutil;

const NAME = "gulp-babili";

module.exports = gulpBabili;

function gulpBabili(_opts = {}) {
  const opts = Object.assign({}, _opts);

  return through2.obj(function (file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError(NAME, "Streaming not supported"));
    }

    let babel = babelCore;
    let babili = babiliPreset;

    if (opts.babel) {
      babel = opts.babel;
      delete opts.babel;
    }
    if (opts.babili) {
      babili = opts.babili;
      delete opts.babili;
    }

    const commentsRegex = typeof opts.comments === "undefined"
      ? /@preserve|@license/
      : opts.comments;

    let inputSourceMap;
    if (file.sourceMap && file.sourceMap.mappings) {
      inputSourceMap = file.sourceMap;
    }

    const babelOpts = {
      minified: true,
      babelrc: false,
      ast: false,

      /* preset */
      presets: [[babili, opts]],

      /* sourcemaps */
      sourceMaps: true,
      inputSourceMap,

      /* remove comments */
      shouldPrintComment(contents) {
        return shouldPrintComment(contents, commentsRegex);
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
      applySourceMap(file, result.map);
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

