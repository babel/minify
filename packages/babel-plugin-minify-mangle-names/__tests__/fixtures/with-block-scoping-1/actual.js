(function() {
  function bar() {
    if (smth) {
      let entries = blah();
      entries();
    }
    foo();
  }
  function foo() {}
  module.exports = { bar };
})();
