function foo() {
  function xx(bar, baz) {
    return function(boo, foo) {
      bar(boo, foo);
    };
  }
  function yy() {}
}
