// #issue55, #issue57
(function() {
  (function() {
    for (let x in y) y[x];
    f(() => {
      g();
    });
  })();
  function g() {}
})();
