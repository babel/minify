function foo() {
  if (a) {
    if (b()) return false;
  } else if (c()) return true;
}