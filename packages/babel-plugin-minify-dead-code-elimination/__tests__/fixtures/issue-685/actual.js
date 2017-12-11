function loop() {
  var end = 0;
  var start = end;
  while (end < 10) {
    console.log(start, end);
    var end = end + 1;
  }
}
loop();

function bar() {
  var x = 1;
  var y = x + 2;
  var x = 3;
  return x + y;
}
