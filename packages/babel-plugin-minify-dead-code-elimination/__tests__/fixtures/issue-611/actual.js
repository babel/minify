function foo() {
  function count() {
    let count = 1;
    bar(count);
    return count;
  }
  return count;
}
