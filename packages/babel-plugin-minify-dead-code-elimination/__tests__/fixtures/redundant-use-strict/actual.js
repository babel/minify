function foo() {
  "use strict";
  function bar() {
    "use strict";
    bar();
  }
  bar.call();
}
