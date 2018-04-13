function bar() {
  return foo === 'foo' ? 1 : foo === foo.bar ? 2 : foo === wow ? (wow(), 3) : 0;
}