var v = 43;
var _ss = 3;

function s() {
  s.func = func;
  s._s = void 0;
  s._ss = _ss;
  return 1;
  var v;

  function func() {
    v = (v | 0) + 1;
    console.log('v is ' + v);
  }
}

s();
s.func();