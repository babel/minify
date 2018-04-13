function bar() {
  var z;

  for (z in c(), {
    a: 1
  }) x(z);

  z();
}