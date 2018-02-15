function foo(console) {
  console.foo("hi");
  const bar = console.foo.bind(console);
}
function bar(a) {
  const { console } = a;
  a.b = console => console.bar("bar");
  if (console.foo.call(console, "bar")) {
    return;
  }
}