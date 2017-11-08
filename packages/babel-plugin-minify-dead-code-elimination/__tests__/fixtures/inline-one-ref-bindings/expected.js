function foo() {
  console.log(1);
}

// NOTE: This isn’t considered pure. (it should be)
function bar() {
  foo.exports = { y: 1 };
}

// handle var hoisting
function baz() {
  bar = void 0;
}