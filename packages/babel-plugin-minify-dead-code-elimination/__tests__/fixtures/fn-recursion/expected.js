function test1() {
  exports.foo = function foo() {
    return foo;
  };
}

function test2() {
  exports.foo = function foo() {
    return foo;
  };
} // mutual recursion


function baz() {
  function foo() {
    return bar();
  }

  function bar() {
    return foo();
  }
}