const foo = 1;
export { foo };
export const bar = 2;
export function baz(a, b) {
  a();
  b();
}
export default function (a, b) {
  a();
  b();
}