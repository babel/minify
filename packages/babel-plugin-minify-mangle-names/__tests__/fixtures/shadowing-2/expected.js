function foo() {
  function a(a, b) {
    return function (b, c) {
      a(b, c);
    };
  }
  function b() {}
}