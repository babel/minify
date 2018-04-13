function foo() {
  for (var i in x) console.log("foo");

  for (var j of y) console.log("foo");
}

async function bar() {
  for (var x of y) console.log("bar");
}