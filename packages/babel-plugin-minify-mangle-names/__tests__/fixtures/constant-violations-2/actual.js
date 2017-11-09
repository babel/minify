!function() {
  var bar = 1;
  bar--;
  var bar = 10;
  foo(bar);
  function foo() {
    var foo = 10;
    foo++;
    var foo = 20;
    foo(foo);
  }
};
