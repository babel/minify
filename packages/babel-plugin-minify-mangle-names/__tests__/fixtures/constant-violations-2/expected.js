!function () {
  var a = 1;
  a--;
  var a = 10;
  b(a);

  function b() {
    var a = 10;
    a++;
    var a = 20;
    a(a);
  }
};