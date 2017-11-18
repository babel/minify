// issue#326
function a() {
  let a, b, c;
  ({ foo: a, bar: b, baz: c } = {});
  return { foo: a, bar: b, baz: c };
}
// issue#369
function decodeMessage(a) {
  let b;
  let c;
  let d = null;

  [, b, c, d] = a.split(",") || [];
  console.log(c);
}