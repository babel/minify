function foo(a) {
  return a && a.b != null ? (a.c-- === 1 && delete a.c, a.b) : bar(a);
}

function foo2(a) {
  return a ? a.b : bar(a);
}