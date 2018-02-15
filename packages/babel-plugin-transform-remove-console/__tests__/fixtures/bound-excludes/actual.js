function foo() {
  const a = console.log;
  a();
  const b = console.error.bind(console);
  b("asdf");
  blah();
}