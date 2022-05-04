(function () {
  class Foo {}

  const a = class Bar extends Foo {};
  var b = class Baz {};

  function c() {
    new b();
  }

  c();
})();