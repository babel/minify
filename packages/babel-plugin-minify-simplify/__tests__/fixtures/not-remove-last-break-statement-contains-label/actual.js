loop: while (foo) {
  switch (bar) {
    case 47:
      break;
  }
  switch (baz) {
    default:
      break loop;
  }
}