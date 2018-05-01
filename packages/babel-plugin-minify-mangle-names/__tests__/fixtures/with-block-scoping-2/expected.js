// #issue55, #issue57
(function () {
  (function () {
    for (var b in y) {
      y[b];
    }

    f(function () {
      a();
    });
  })();

  function a() {}
})();