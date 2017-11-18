function x(a) {
  var x;
  wow();
  for (x in a) wow();
}

function foo(a) {
  var x, y;
  wow(y);
  for (x in a) wow(y);
}

function bar() {
  var key;
  for (key in o);
  for (key in o2);
}
