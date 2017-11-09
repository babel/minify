function x(a) {
  wow();
  for (var x in a) wow();
}

function foo(a) {
  var x, y;
  wow(y);
  for (x in a) wow(y);
}

function bar() {
  for (var key in o);
  for (key in o2);
}