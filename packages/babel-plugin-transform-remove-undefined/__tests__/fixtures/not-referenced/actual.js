function foo() {
  var x = undefined;
  bar();
  console.log(x);
  function bar() {
    x = 3;
  }
}