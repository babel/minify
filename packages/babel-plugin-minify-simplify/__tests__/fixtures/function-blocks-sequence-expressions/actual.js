function foo() {
  a();
  var x = bar();
  b(x);
  this.d = x;
}
function bar() {
  x();
  while (x) {
    if (x) x();
  }
  try { y(); } catch (e) {}
  var z = x();
  z();
  while (a) b();
  c();
  z();
}