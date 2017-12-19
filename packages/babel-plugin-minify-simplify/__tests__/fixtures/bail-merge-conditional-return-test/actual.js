function foo() {
  if (x) {
    delete x.x;
    if (bar()) return 2;
  }

  if (bar) {
    x();
  } else {
    y();
  }
}