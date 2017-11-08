if (!a) {
  foo();
}

if (b) {
  bar();
}

// should optimize alternate after replacement
if (!baz) {
  console.log("foo" + "bar");
}