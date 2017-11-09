function foo() {
  var inScopeOuter = 1;
  (function() {
    var inScopeInner = 2;
    eval("...");
    (function() {
      var outOfScope = 1;
    })();
  })();
}
