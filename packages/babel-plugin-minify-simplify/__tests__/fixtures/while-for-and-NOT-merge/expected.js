function foo() {
  let a,
      { b } = x;

  for (; true;) bar(a, b);

  return [a, b];
}