function foo() {
  if (a) return x ? void 0 : x;
  const b = 1;
  return "doesn't matter if this is reached or not";
}