function baz() {
  let a = 1;
  return function () {
    if (a) console.log(a);
  };
}