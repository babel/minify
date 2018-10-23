function a() {}

function c() {}

function d() {
  var c = b();
  return c;
}

function f() {
  console.log('hi');
}

var v = 43;

function s() {
  s.func = func;
  var v;

  function func() {
    v = (v | 0) + 1;
    console.log('v is ' + v);
  }
}

s();
s.func();