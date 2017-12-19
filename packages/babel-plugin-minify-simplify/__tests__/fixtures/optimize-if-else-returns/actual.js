function foo() {
  if (a) {
    if (x) return;
    else return x;
  }
  const b = 1;
  return "doesn't matter if this is reached or not";
}