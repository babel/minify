function foo() {
  try {
    x();
  } catch (e) {
    1;
  }

  y();
  return 1;
}