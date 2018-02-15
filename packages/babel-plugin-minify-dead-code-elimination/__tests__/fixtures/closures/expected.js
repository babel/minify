function a() {
  function b() {
    function c() {
      "wow".bar();
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