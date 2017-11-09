// decl
function foo() {
  function x() {
    return 1;
  }
  x();
}

// expr
function bar() {
  var x = function() {
    return 1;
  };
  x();
}

// handle different scopes
function baz() {
  var x = function(a) {
    return a;
  };
  while (1) x(1);
}
