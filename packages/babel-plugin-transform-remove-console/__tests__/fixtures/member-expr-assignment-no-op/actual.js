function foo() {
  console.foo = function foo() {
    console.log("foo");
  };
  console.error = myConsoleError;
  console.foo();
  console.error("asdf");
}