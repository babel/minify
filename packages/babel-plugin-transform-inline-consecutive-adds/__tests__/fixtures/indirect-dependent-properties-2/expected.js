var foo = {
  a: 4
};
foo.b = cat();

function cat() {
  return bar();

  function bar() {
    console.log(foo);
    return 0;
  }
}

function baz() {
  var foo = {};
  foo.a = 0, foo.b = bar();

  function bar() {
    console.log(foo);
    return 0;
  }
}