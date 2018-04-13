function foo(p) {
  return 1;
}

function bar(q) {
  return q + 1;
}

class A {
  foo(p) {
    return p;
  }

  bar(q) {
    return 1;
  }

}

foo();
bar();
new A();