(function () {
  var a = function foo() {
    foo();
  };

  function bar() {
    a();
  }

  bar();
  var b = a;
  b();
})();