function test1() {
  function baz() {
    function bar() {
      baz();
    }
    bar();
    bar();
  }
}
function test2() {
  var baz = function() {
    function bar() {
      baz();
    }
    bar();
    bar();
  };
}
function test3() {
  function boo() {}
  function baz() {
    function bar() {
      baz();
    }
    bar();
    bar();
    boo();
  }
}
