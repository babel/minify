function loop() {
  var end = 0;
  var start = end;
  while (end < 10) {
    console.log(start, end);
    var end = end + 1;
  }
}
loop();
