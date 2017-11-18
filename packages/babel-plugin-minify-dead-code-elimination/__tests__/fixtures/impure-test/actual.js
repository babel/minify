// if statements
if ((a.b(), true)) {
  foo();
}

if ((a.b(), false)) {
  var foo = foo1;
  foo();
} else if ((b.c(), true)) {
  var bar = bar1;
  bar();
} else {
  var baz = baz1;
  baz();
}

// loops
function foo() {
  do {
    bar();
  } while ((bar(), false));
  for (; bar(), false; ) {
    bar();
  }
  while ((bar(), false)) {
    bar();
  }
}
