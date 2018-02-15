function foo() {
  if (x) {
    delete x.x;
    if (bar()) return;
  }

  if (bar) {
    x();
  } else {
    y();
  }
}