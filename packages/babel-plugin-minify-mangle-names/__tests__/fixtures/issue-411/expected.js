!function () {
  function a(a) {
    foo(a);
  }

  return function () {
    return a();
  };
}();