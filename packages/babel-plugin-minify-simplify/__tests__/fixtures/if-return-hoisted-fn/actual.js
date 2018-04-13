function foo() {
  bar();
  if(x) return;
  const {a}=b;
  function bar () {
    baz();
    bar();
  }
}