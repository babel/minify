function foo() {
  x && (delete x.x, bar());
}