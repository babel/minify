function baz() {
  function bar() {
    if (a) console.log(a);
  }
  let a = 1;
  return bar;
}
