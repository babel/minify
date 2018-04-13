function foo() {
  try {
    x();
  } catch (e) {
    1;
  }

  return y(), 1;
}