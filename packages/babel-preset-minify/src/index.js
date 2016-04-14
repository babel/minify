module.exports = {
  plugins: [
    require('babel-plugin-minify-constant-folding'),
    require('babel-plugin-minify-dead-code-elimination'),
    require('babel-plugin-minify-mangle-names'),
    require('babel-plugin-minify-replace'),
    require('babel-plugin-minify-simplify')
  ]
};
