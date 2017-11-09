(function() {
  class Foo {}
  const Bar = class Bar extends Foo {};
  var foo = class Baz {};
  function bar() {
    new foo();
  }
  bar();
})();
