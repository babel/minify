function foo() {
  let [Infinity] = some();
  return Infinity;
}

function bar() {
  let [...Infinity] = some();
}

function baz() {
  let { inf = Infinity } = some();
}
