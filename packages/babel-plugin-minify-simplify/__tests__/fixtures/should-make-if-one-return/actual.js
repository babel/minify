function foo() {
  if (b) {
    foo();
  } else {
    return bar;
  }
}