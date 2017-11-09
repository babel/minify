function foo() {
  function a(a) {
    return function () {
      b();
    };
  }
  function b() {}
}