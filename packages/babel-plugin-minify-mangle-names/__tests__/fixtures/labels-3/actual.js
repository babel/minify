// https://phabricator.babeljs.io/T6957
function foo() {
  var meh;
  meh: for (;;) {
    break meh;
  }
  return meh;
}

function f(a) {
  try {
    a: {
      console.log(a);
    }
  } catch ($a) {}
}
