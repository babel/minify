function foo() {
  if (a) {
    y();
  }
}

function bar() {
  y();
}

function baz() {
  if (a) {
    y();
    if (b) {}
  }
}

// keep non-redundant returns
function foo1() {
  if (a) {
    y();
    return;
  }
  x();
}