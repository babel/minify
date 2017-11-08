(function() {
  function A() {}
  exports.A = A;
  var B = function B() {};
  exports.B = B;
  onClick(function C() {});
})();
