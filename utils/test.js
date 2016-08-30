// Test Utils
"use strict";

const babel = require("babel-core");
const traverse = require("babel-traverse").default;

exports.transformer = transformer;
exports.defaults = defaults;
exports.transformerWithBlockScoping = transformerWithBlockScoping;
exports.transformerWithES2015 = transformerWithES2015;
// fix humans
exports.transformerWithEs2015 = transformerWithES2015;

function transformer(plugin, transformOpts = {}) {
  defaults(transformOpts, "minified", false);
  defaults(transformOpts, "sourceType", "script");
  defaults(transformOpts, "babelrc", false);

  return function transform(code, pluginOpts = {}) {
    const babelOpts = {};
    if (plugin) {
      babelOpts.plugins = [[plugin, pluginOpts]];
    }
    return babel
      .transform(code, Object.assign({}, babelOpts, transformOpts))
      .code;
  }
}

function transformerWithBlockScoping(plugin, transformOpts = {}) {
  defaults(transformOpts, "minified", false);
  defaults(transformOpts, "sourceType", "script");
  defaults(transformOpts, "babelrc", false);

  return function transformWithBlockScoping(code, pluginOpts = {}) {
    const first = babel.transform(code, Object.assign({}, transformOpts, {
      plugins: ["transform-es2015-block-scoping"],
      code: false,
    }));

    traverse.clearCache();

    return babel.transformFromAst(first.ast, null, Object.assign({
      plugins: [[plugin, pluginOpts]],
    }, transformOpts)).code;
  }
}

function transformerWithES2015(plugin, transformOpts = {}) {
  defaults(transformOpts, "minified", false);
  defaults(transformOpts, "sourceType", "script");
  defaults(transformOpts, "babelrc", false);

  return function transformWithES2015(code, pluginOpts = {}) {
    const first = babel.transform(code, Object.assign({}, transformOpts, {
      presets: ["es2015"],
      code: false,
    }));

    traverse.clearCache();

    return babel.transformFromAst(first.ast, null, Object.assign({
      plugins: [[plugin, pluginOpts]],
    }, transformOpts)).code;
  }
}

function defaults(o, key, def) {
  if (typeof o[key] === "undefined") {
    o[key] = def;
  }
}
