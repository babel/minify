function foo() {
  if (FOO_ENV === "production") {
    HELLO_WORLD.call();
  }
}
const FOO_ENV = "production";
var HELLO_WORLD = function bar() {
  new AbstractClass({
    [FOO_ENV]: "foo",
    a: foo(HELLO_WORLD)
  });
};
class AbstractClass {}
foo();
