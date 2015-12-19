require('babel-jest/node_modules/babel-core').register();
//Error.stackTraceLimit = Infinity;
var babel  = require('babel-core');

var plugins = [
  require('./src/dce-plugin'),
  require('./src/simplify-plugin'),
  require('./src/mangle-names-plugin'),
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
