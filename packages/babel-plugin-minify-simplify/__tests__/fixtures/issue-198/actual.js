function foo() {
  let a,
      { b } = x;
  while (true) {
    bar(a, b);
  }
  return [a, b];
}