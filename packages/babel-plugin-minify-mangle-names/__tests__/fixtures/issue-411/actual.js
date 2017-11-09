!(function() {
  function e(e) {
    foo(e);
  }
  return function() {
    return e();
  };
})();
