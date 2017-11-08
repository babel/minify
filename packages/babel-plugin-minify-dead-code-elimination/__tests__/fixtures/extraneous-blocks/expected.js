function a() {
  function b() {
    {
      var f = "wow";
    }
    function c() {
      f.bar();
    }
    c();
    c();
  }
  function d() {
    bar(25);
  }
  d();
  d();
  b();
  b();
}