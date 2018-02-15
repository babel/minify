function x() {
  for (;;) {
    x();
    if (foo) return 1;
    else y();
  }
}