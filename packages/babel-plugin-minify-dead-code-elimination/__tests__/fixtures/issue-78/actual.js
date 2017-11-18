(function() {
  var B = class A {
    constructor(x) {
      console.log(x);
    }
  };
  self.addEventListener(function(event) {
    new B(event);
  });
})();
