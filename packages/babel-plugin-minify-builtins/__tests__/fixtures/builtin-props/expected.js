function a() {
  var _MathPI = Math.PI;
  var _NumberNAN = Number.NAN;

  _NumberNAN + _NumberNAN;
  return _MathPI + _MathPI + Number.EPSILON + _NumberNAN;
}