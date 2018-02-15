function foo(a) {
  if (lol) return;
  doThings();
  doOtherThings();
}
function bar(a) {
  if (lol) {
    return;
  }
  try {
    doThings();
  } catch (e) {
    doOtherThings();
  }
}
function baz() {
  while (wow) if (lol) return;
  boo();
}