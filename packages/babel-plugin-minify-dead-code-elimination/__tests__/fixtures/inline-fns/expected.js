// decl
function foo() {
  (function () {
    return 1;
  })();
} // expr


function bar() {
  (function () {
    return 1;
  })();
} // handle different scopes


function baz() {
  var x = function (a) {
    return a;
  };

  while (1) x(1);
}