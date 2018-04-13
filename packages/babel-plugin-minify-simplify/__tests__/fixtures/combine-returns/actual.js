function foo() {
  if (a) {
    if (a.b) {
      if(a.b.c) {
        if(a.b.c()){
          return;
        }
      }
    }
  }
  for (; true;) wat();
}