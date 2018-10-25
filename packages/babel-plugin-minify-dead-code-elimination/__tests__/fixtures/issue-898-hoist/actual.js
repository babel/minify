var v = 43;
var _ss = 3;

function s() {
  s.func = func;
  s._s = _s;
  s._ss = _ss;
  if (true) {
    return 1;
    var _s = 1;
  }
  console.log('no-hi');
  var unusedToBeRemoved = 2;
  var v = (console.log('no-hi2'), 42);
  function func() {
    v = (v | 0) + 1;
    console.log('v is ' + v);
  }
  console.log('test2');
}
s();
s.func();