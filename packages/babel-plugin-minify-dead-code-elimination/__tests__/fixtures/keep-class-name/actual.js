(function() {
  class A {}
  exports.A = A;
  var B = class B {};
  exports.B = B;
  class AA {}
  new AA();
})();
