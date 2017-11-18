function foo() {
  return [...iter].length;
}
function bar() {
  return [...iter][0];
}

[...bar].reverse();
[...foo].join("a");
