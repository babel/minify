function foo() {
  return b ? foo : void (a(), b());
}