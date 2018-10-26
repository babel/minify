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

function i() {
  var i1 = ' ';
  _i += i1 + i2 + i3 + i4 + i5 + i6 + i7;
  if (true) {
    return;
    var i2 = 2;
  } else {
    var i3 = 3;
  }
  var i4 = 4;
  var i5 = 5;
  while (true) {
    var i6 = 6;
    if (false) {
      var i7 = 7;
    }
  }
}

function j() {
  var i1 = ' ';
  _i += i1 + i2 + i3 + i4 + i5 + i6 + i7;
  if (false) {
    var i3 = 3;
  } else {
    return;
    var i2 = 2;
  }
  var i4 = 4;
  var i5 = 5;
  while (true) {
    var i6 = 6;
    if (false) {
      var i7 = 7;
    }
  }
}

function g() {
  // preserve function
  g.func = func;
  if (true) {
    return 1;
  }
  function func() {}
}

var variableToBeUsed = 1;
function h() {
  // leave used variables
  h.variableToBeUsed = variableToBeUsed;
  if (true) {
    return 1;
    var variableToBeUsed = 2;
  }
}

function blockLocal1() {
  var a = 1;
  foo.a = a;
  if (true) {
    a();
    return a;
    function a() {}
  }
}

function blockLocal2() {
  var a = 1;
  foo.a = a;
  if (false) {
    return;
  } else {
    a();
    return a;
    function a() {}
  }
}