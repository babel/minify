const foo = {
  z: 3.0
};
foo.a = 42;
foo.b = ["hi"];
foo.c = bar();
foo.d = "str";

var bar = {};
(bar.a = 0), (bar.b = 2);
