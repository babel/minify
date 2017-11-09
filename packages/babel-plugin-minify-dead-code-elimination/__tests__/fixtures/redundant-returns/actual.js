function foo() {
  if (a) {
    y();
    return;
  }
}

function bar() {
  y();
  return;
}

function baz() {
  if (a) {
    y();
    if (b) {
      return;
    }
    return;
  }
  return;
}

// keep non-redundant returns
function foo1() {
  if (a) {
    y();
    return;
  }
  x();
}
