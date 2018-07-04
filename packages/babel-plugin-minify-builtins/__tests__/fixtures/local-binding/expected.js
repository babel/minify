function wow() {
  var _Mathmin = (0, eval)("this").Math.min;
  var Math = foo;
  var nativeMin = _Mathmin;
  var xMin = _Mathmin;
  var yMin = _Mathmin;
  return {
    baseInRange: _Mathmin(foo),
    min: nativeMin(bar),
    x: xMin(x),
    y: yMin(y),
    xMin,
    yMin,
    nativeMin
  };
}