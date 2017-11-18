function a() {
  var f = 25;
  function b() {
    var f = "wow";
    function c() {
      f.bar();
    }
    c();
    c();
  }
  function d() {
    bar(f);
  }
  d();
  d();
  b();
  b();
}
