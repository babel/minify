function foo() {
  var inScopeOuter = 1;
  (function() {
    var inScopeInner = 2;
    eval("inScopeInner + inScopeOuter");
    (function() {
      var outOfScope = 1;
    })();
  })();
}
