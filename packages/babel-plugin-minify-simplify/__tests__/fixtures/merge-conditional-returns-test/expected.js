function foo() {
  x && (delete x.x, bar()) || (bar ? x() : y());
}