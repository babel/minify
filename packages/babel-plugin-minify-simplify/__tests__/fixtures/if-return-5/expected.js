function x() {
  var x = foo;

  if (hi) {
    var y = z;
    if (!foo) return;
    if (x) throw y;
  }

  x();
}