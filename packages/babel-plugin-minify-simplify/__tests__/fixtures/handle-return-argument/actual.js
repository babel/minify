function foo() {
  if (x) {
    delete x.x;
    if (bar()) return x;
  }
}