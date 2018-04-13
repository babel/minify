(function () {
  function a() {
    if (smth) {
      var a = blah();
      a();
    }

    b();
  }

  function b() {}

  module.exports = {
    bar: a
  };
})();