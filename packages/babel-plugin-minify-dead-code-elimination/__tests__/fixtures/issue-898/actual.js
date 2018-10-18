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