function a(b, c, d) {
  eval(";");
  return b;
}
function b(c, d, e) {
  (1, eval)(";");
  return c;
}

function foo(bar, baz) {
  function foox(a, b, c) {
    x.then((data, unused) => {
      let unused1;
      eval(data);
      foox1();
      {
        var unused2;
      }
    });

    function foox1(unused) {
      console.log("foox1");
    }
  }
  function fooy(unused1, unused2) {
    console.log("fooy");
  }
}

// DO NOT optimize
function quux() {
  bar();

  var x = 5;
  return x;

  function bar() {
    eval(";");
    return 5;
  }

  function baz() {
    let x = 10;
    return x;
  }
}
