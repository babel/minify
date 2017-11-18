_(function bar(p) {
  return 1;
});

function foo(w) {
  return 1;
}

foo();
foo();

var bar = function(a) {
  return a;
};

bar();
bar();

class A {
  foo(p) {}
}
new A();

// except the ones with side-effects
function a(foo, bar, baz) {
  return foo;
}
function b(foo, bar, baz) {
  return baz;
}
function c(foo, { bar }, baz) {
  return bar;
}
function d({ foo }, { bar }, baz) {
  return foo;
}
function e({ foo }, bar = sideEffect(), baz) {
  return foo;
}
function e({ foo }, bar = {}, baz) {
  return foo;
}
