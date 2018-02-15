function foo() {
  if (b) {
    return foo;
  } else {
    a();
    b();
  }
}