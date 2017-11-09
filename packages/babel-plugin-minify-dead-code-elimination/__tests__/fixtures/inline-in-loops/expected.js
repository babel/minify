// handle loops - should NOT inline
function foo() {
  var x = { y: 1 };
  while (true) foo(x);

  var y = { y: 1 };
  for (;;) foo(y);

  var z = ["foo"];
  while (true) foo(z);

  var bar = function () {};
  while (true) foo(bar);
}