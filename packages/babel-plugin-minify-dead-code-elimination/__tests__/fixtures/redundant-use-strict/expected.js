function foo() {
  "use strict";

  function bar() {
    bar();
  }
  bar.call();
}