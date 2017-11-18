var foo = {};
foo[bar()] = 0;
function bar() {
  console.log(foo);
  return 0;
}
