(function () {
  a = x ? true : false;
  c = 1 ? (this.get(x), a = b, true) : (foo.bar, false);
})();