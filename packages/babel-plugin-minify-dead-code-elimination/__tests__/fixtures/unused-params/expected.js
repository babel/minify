_(function () {
  return 1;
});

function foo() {
  return 1;
}

foo();
foo();

var bar = function (a) {
  return a;
};

bar();
bar();

class A {
  foo() {}
}
new A();

// except the ones with side-effects
function a(foo) {
  return foo;
}
function b(foo, bar, baz) {
  return baz;
}
function c(foo, { bar }) {
  return bar;
}
function d({ foo }, { bar }) {
  return foo;
}
function e({ foo }, bar = sideEffect()) {
  return foo;
}
function e({ foo }, bar = {}) {
  return foo;
}