require('babel-jest/node_modules/babel-core').register();
//Error.stackTraceLimit = Infinity;
var babel  = require('babel-core');

var plugins = [
  require('./src/constant-folding-plugin'),
  require('./src/mangle-names-plugin'),
  require('./src/dce-plugin'),
  require('./src/simplify-plugin'),
];

exports.compile = function(code, options) {
  if (options && options.replacements && options.replacements.length) {
    plugins.unshift([
      require('./src/replace-plugin'),
      { replacements: options.replacements }
    ]);
  }
  return babel.transform(code, {
    sourceType: 'script',
    plugins: plugins,
    minified: true,
//    compact: false,
    comments: false,
  });
}
