function foo(bar) {
  switch (bar) {
    case 'a':
    case 'b':
      return 1;
    case 'd':
    default:
      return 4;
    case 'c':
      return 3;
  }
}