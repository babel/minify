(function() {
  function foo() {
    {
      var baz = true;

      {
        bar();
      }
    }
  }

  function bar() {}
})();
