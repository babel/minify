// https://phabricator.babeljs.io/T6957
function foo() {
  var a;
  meh: for (;;) {
    break meh;
  }
  return a;
}

function f(b) {
  try {
    a: {
      console.log(b);
    }
  } catch (a) {}
}