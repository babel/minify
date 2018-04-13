function bar() {
  return foo === 'foo' ? 1 : foo === foo.bar || foo === wow ? (wow(), 3) : foo === boo ? 4 : foo === baz || foo === wat ? 5 : 0;
}