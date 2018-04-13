function foo(a) {
  return a && a.b != null ? a.c-- === 1 ? void 0 : a.b : bar(a);
}