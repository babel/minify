function foo() {
  const a = function () {};

  a();
  const b = console.error.bind(console);
  b("asdf");
  blah();
}