function foo() {
  if (foo) {
    bar(foo);
    return foo;
  } else if (baz) {
    bar(baz);
    return baz;
  } else if (wat) {
    bar(wat);
    return wat;
  }
}