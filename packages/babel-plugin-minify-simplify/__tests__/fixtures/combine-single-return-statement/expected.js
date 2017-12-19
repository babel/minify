function foo() {
  return foo ? (bar(foo), foo) : baz ? (bar(baz), baz) : wat ? (bar(wat), wat) : void 0;
}