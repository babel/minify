function foo() {
  a();
  var c = undefined;
  function a() {
    b();
  }
  function b() {
    a();
    c = 3;
  }
}