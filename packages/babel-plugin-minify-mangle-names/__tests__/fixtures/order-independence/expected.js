function foo() {
  function a(a, c, d) {
    b(a, c, d);
  }
  function b() {
    var a = who();
    a.bam();
  }
  a();
}

function foo2() {
  (function a() {
    a();
    return function () {
      var a = wow();
      a.woo();
    };
  })();
}