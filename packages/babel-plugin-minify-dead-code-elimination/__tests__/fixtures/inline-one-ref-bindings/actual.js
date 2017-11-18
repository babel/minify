function foo() {
  var x = 1;
  console.log(x);
}

// NOTE: This isn’t considered pure. (it should be)
function bar() {
  var y = 1,
    x = { y: y };
  foo.exports = x;
}

// handle var hoisting
function baz() {
  bar = x;
  var x = 1;
}
