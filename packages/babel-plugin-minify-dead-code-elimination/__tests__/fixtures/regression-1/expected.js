function boo() {
  var bar = foo || [];

  if (!bar || baz.length === 0) {
    return "wow";
  }
}

function bar() {
  var x = foo || "boo";
  bar = x === "wow" ? " " + z : "";
}