function foo() {
  a();

  var x = bar();
  b(x), this.d = x;
}
function bar() {
  for (x(); x;) x && x();

  try {
    y();
  } catch (e) {}
  var z = x();

  for (z(); a;) b();

  c(), z();
}