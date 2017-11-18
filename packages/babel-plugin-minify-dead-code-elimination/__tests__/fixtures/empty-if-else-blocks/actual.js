if (a) {
} else {
  foo();
}

if (b) {
  bar();
} else {
}

// should optimize alternate after replacement
if (baz) {
} else {
  let foo = "bar";
  function foobar() {}
  console.log("foo" + foo);
}
