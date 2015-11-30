require('babel-jest/node_modules/babel-core').register();

var babel  = require('babel-core');
var code = '';
process.stdin.on('data', function(d) {
  code += d.toString('utf-8');
});
process.stdin.on('end', compile);

function compile() {
  var out = babel.transform(code, {
    plugins: [
      require('./src/mangle-names-plugin'),
      require('./src/simplify-plugin'),
      require('./src/dce-plugin'),
    ],
    compact: true,
    comments: false,
  }).code;
  console.log(out);
}
