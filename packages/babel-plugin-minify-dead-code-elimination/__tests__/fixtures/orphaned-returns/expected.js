var a = true;
function foo() {
  if (a) return;
  x();
}

// with value
var b = true;
function bar() {
  if (b) return 1;
  x();
}

// orphaned redundant returns
var x = true;
function baz() {
  if (t) {
    if (x) {
      z();
      return;
    }
    y();
  }
}