function x() {
  for (;;) {
    if (x(), foo) return 1;
    y();
  }
}