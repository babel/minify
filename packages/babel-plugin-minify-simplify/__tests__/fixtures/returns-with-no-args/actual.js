function foo(a) {
  if (a && a.b != null) {
    if ((a.c--) === 1) {
      return;
    }
    return a.b;
  }
  return bar(a);
}