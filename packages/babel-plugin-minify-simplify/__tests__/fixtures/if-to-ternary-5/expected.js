function foo() {
  return b ? void foo() : bar;
}