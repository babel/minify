// https://github.com/babel/minify/issues/130
// https://github.com/babel/minify/pull/132
function outer() {
  const inner = d => d.x;
  return inner;
}
