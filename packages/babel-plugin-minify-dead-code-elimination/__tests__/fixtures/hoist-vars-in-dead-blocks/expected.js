function a() {
  if (x()) {
    var foo = 1;
  }

  bar(foo);
}

function b() {
  if (x()) var foo = 1;
  bar(foo);
} // loops


function c() {
  for (;;) var foo = 1;

  bar(foo);
}

function d() {
  for (;;) {
    bar(1);
  }
} // remove-able if statements


function e() {} // switch statement


var a, b;
var a, b;
var a = 1;
var b = 2;