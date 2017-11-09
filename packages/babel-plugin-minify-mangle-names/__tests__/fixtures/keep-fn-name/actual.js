(function() {
  var foo = function foo() {
    foo();
  };
  function bar() {
    foo();
  }
  bar();
  var baz = foo;
  baz();
})();
