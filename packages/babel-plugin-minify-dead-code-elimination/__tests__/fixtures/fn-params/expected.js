function bar() {
  return function () {
    return boo();
  };
}

function baz() {
  return function wow() {
    return wow();
  };
}

// shadowed
function foo() {
  return function () {
    var wow = foo;
    wow();
    return wow;
  };
}

// setters
function foo() {
  var x = {
    set a(b) {}
  };
  class A {
    set c(d) {
      x.a = 5;
    }
  }
  return new A();
}