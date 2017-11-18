(function () {
  class Foo {}
  const b = class Bar extends Foo {};
  var c = class Baz {};
  function a() {
    new c();
  }
  a();
})();