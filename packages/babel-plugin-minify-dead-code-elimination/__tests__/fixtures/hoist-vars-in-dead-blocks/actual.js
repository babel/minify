function a() {
  if (x()) {
    var foo = 1;
  }
  bar(foo);
}

function b() {
  if (x()) var foo = 1;
  bar(foo);
}

// loops
function c() {
  for (;;) var foo = 1;
  bar(foo);
}

function d() {
  for (;;) {
    var foo = 1;
    bar(foo);
  }
}

// remove-able if statements
function e() {
  if (0) {
    var a = foo();
  }

  if (0) var b = foo();

  if (1) {
  } else {
    var c = foo();
  }

  if (0) var d = bar();
  else {
  }
}

// switch statement
switch (0) {
  case 1:
    var a = 5;
    var b = 6;
}
switch (0) {
  default:
    var a = 1;
    var b = 2;
}
