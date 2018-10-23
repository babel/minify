function a() {
  if (true) {
    return;
  }

  var c = b();
  return c;
}

function c() {
  if (true) {
    if (true) {
      return;
    }
  }

  var c = b();
  return c;
}

function d() {
  if (true) {
    if (false) {
      return;
    }
  }

  var c = b();
  return c;
}

function f() {
  if (true) {}
  console.log('hi');
}

var v = 43;
function s() {
  s.func = func;
  if (true) {
    return;
  }
  console.log('no-hi');

  var v = (console.log('no-hi2'), 42);
  function func() {
    v = (v | 0) + 1;
    console.log('v is ' + v);
  }
  console.log('test2');
}
s();
s.func();