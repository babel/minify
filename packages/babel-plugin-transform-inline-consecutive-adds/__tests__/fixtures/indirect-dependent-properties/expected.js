var foo = {
  a: 4
};
foo.b = cat();

function cat() {
  return bar();
}

function bar() {
  console.log(foo);
  return 0;
}