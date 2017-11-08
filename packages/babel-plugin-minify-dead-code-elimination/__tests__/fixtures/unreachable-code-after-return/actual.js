function foo() {
  z();
  return;
  x();
}

// fn-decls are hoisted
function bar() {
  z();
  z();
  return 22;
  function z() {
    wow();
  }
}

// vars
function baz() {
  a = 1;
  return a;
  var a;
}

// lets - remove
function foo1() {
  a = 1;
  b = 2;
  return a + b;
  let a, b;
}

// vars after return
function f() {
  return x;
  var x = 1;
}

var yy = 0;
function f1() {
  function f2() {
    return yy;
  }
  return f2();
  var yy = 1;
}
