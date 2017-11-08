function foo() {
  z();
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
}

// vars after return
function f() {
  return void 0;
}

var yy = 0;
function f1() {
  return function () {
    return yy;
  }();
  var yy = 1;
}