function foo() {
  Math.a = function () {};

  Math.a();
  Math.a();

  Math["b"] = function () {};

  Math.b();
  Math.b();
}
