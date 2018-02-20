function f(a) {
  var b = function (a) {
    var b = void 0;

    if (b) {
      return {
        v: void 0
      };
    }

    g(() => b);
  };

  for (var d = 0; d; d++) {
    var c = b(d);
    if (typeof c === "object") return c.v;
  }
}