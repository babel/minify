function foo(a) {
  lol || (doThings(), doOtherThings());
}

function bar(a) {
  if (!lol) try {
    doThings();
  } catch (e) {
    doOtherThings();
  }
}

function baz() {
  for (; wow;) if (lol) return;

  boo();
}