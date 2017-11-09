function foo() {
  function bar(aaa, bbb, ccc) {
    baz(aaa, bbb, ccc);
  }
  function baz() {
    var baz = who();
    baz.bam();
  }
  bar();
}

function foo2() {
  (function bar() {
    bar();
    return function() {
      var bar = wow();
      bar.woo();
    };
  })();
}
