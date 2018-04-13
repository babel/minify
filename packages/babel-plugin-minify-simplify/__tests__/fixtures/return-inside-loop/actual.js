function foo() {
  while(1) {
    if (a === null) {
      b();
      return;
    }
    a();
    b();
  }
}