(function() {
  function foo() {
    console.log("this function was included!");
  }

  function bar() {
    console.log("this function was not");
    baz();
  }

  function baz() {
    console.log("neither was this");
  }

  foo();
})();

(function() {
  function foo() {}
  function bar() {}
  function baz() {}
  function ban() {}
  function quux() {}
  function cake() {}
})();
