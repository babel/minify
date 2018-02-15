function bar() {
  switch (foo) {
    case 'foo':
      bar();
      foo();
      break;
    case 'bar':
      wow();
      return wo;
      break;
  }
}