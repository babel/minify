function wow() {
  var Math = foo;

  var nativeMin = Math.min;

  var xMin = Math.min;
  var yMin = Math.min;

  return {
    baseInRange: Math.min(foo),
    min: nativeMin(bar),
    x: xMin(x),
    y: yMin(y),
    xMin,
    yMin,
    nativeMin
  };
}
