function foo() {
  bar();
  var x = undefined;
  console.log(x);

  function bar() {
    x = 3;
  }
}