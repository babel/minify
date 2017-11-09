class A {}
class B extends A {}
(function () {
  class a {
    constructor() {
      new A();
      new B();
      a;
    }
  }
})();