function xoo() {
  function foo(zz, xx, yy) {
    function bar(zip, zap, zop) {
      return function(bar) {
        zap();
        return function() {
          zip();
        };
      };
    }
  }
}
