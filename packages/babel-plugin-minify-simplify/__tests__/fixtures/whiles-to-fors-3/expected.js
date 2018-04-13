function foo() {
  for (var a = 1; true;) bar(a);

  return a;
}