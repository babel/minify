!function () {
  var b = 1;
  b--;
  var b = 10;
  a(b);

  function a() {
    var a = 10;
    a++;
    var a = 20;
    a(a);
  }
};