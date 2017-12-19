function foo() {
  return x && (delete x.x, bar()) ? 2 : void (bar ? x() : y());
}