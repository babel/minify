var babel  = require('babel-core');
var plugins = [
  require('./lib/constant-folding-plugin'),
  require('./lib/mangle-names-plugin'),
  require('./lib/dce-plugin'),
  require('./lib/simplify-plugin'),
];

exports.compile = function(code, options) {
  if (options && options.replacements && options.replacements.length) {
    plugins.unshift([
      require('./lib/replace-plugin'),
      { replacements: options.replacements },
    ]);
  }
  return babel.transform(code, {
    sourceType: 'script',
    plugins: plugins,
    minified: true,
    comments: false,
  });
};
