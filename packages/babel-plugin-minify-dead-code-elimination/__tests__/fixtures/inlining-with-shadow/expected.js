function foo() {
  wow(1);
  return function () {
    wow(2);
  };
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