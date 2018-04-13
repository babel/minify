function foo(a) {
  if (a && a.b != null) {
    if ((a.c--) === 1) {
      delete a.c;
    }
    return a.b;
  }
  return bar(a);
}

function foo2(a) {
  if (a) {
    return a.b;
  } else {
    return bar(a);
  }
}