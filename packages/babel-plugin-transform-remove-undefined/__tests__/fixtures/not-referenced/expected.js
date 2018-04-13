function foo() {
  var x;
  bar();
  console.log(x);

  function bar() {
    x = 3;
  }
}