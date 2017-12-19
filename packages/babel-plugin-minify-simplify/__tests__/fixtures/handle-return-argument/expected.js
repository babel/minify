function foo() {
  if (x && (delete x.x, bar())) return x;
}