function bar() {
  switch (foo) {
    case 'foo':
      bar(), foo();
      break;

    case 'bar':
      return wow(), wo;
  }
}