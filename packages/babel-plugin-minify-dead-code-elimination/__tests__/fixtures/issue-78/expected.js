(function () {
  var B = class {
    constructor(x) {
      console.log(x);
    }

  };
  self.addEventListener(function (event) {
    new B(event);
  });
})();