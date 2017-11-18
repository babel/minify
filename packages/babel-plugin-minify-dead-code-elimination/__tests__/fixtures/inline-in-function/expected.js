function a(p) {
  var w = p || [];
  f(function (foo) {
    return w.concat(foo);
  });
}

function foo() {
  var x = { y: 1 },
      y = ["foo"],
      z = function () {};
  f(function () {
    foo(x, y, z);
  });
}

// multiple scopes
function x() {
  function y() {
    console.log(1);
  }
  y();
  y();
}

// preserve vars from removed blocks
function foo() {
  var a = 1;
  var bar = { x: { z: a, v: a } };
  var wow = { x: 1 };
  var baz = { x: function () {} };
  var boo = { x: { y: function () {} } };

  return function () {
    var a = 2;
    maa(wow, bar, baz, boo, a, a);
  };
}