function foo() {
  var a = 1;

  (function () {
    var a = 2;
    eval("...");

    (function () {
      var a = 1;
    })();
  })();
}