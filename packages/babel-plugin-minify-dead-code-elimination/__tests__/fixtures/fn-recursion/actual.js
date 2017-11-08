function test1() {
  var bar = function foo(config) {
    return foo;
  };
  exports.foo = bar;
}
function test2() {
  var foo = function foo(config) {
    return foo;
  };
  exports.foo = foo;
}

// mutual recursion
function baz() {
  function foo() {
    return bar();
  }
  function bar() {
    return foo();
  }
}
