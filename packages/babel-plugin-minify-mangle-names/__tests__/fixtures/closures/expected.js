function foo() {
  function a() {
    var a;
    if (a) {
      b();
    }
  }
  function b() {}
}