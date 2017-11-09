// https://github.com/babel/minify/issues/130
// https://github.com/babel/minify/pull/132
function outer() {
  return d => d.x;
}