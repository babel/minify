function xoo() {
  function a(a, b, c) {
    function d(a, b, c) {
      return function (c) {
        b();
        return function () {
          a();
        };
      };
    }
  }
}