// issue#326
function a() {
  let foo, bar, baz;
  ({ foo, bar, baz } = {});
  return { foo, bar, baz };
}
// issue#369
function decodeMessage(message) {
  let namespace;
  let name;
  let value = null;

  [, namespace, name, value] = message.split(",") || [];
  console.log(name);
}
