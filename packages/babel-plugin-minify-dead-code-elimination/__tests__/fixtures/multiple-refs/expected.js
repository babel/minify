function foo() {
  var x = function () {
    if (!y) {
      y = 1;
    }
  };

  x();
  x();
  var y = null;
}