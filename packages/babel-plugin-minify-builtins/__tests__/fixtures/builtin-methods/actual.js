function c() {
  let a = 10;
  const d = Number.isNaN(a);
  Math.max(a, b) + Math.max(b, a);
  return d && Number.isFinite(a);
}
