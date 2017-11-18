class A {}
class B extends A {}
(function() {
  class C {
    constructor() {
      new A();
      new B();
      C;
    }
  }
})();
