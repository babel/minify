function foo() {
  var n = 1;
  wow(n);
  function wat() {
    var n = 2;
    wow(n);
  }
  return wat;
}

function bar() {
  var a = 1;
  var b = a;
  function x(a) {
    return a + b;
  }
  x();
  x();
  return a;
}

function foo() {
  var a = c + d;
  function x(c, d) {
    return a + c + d;
  }
  x();
  x();
}
