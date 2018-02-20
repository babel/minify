const foo = 1;
export { foo };
export const bar = 2;
export function baz(bar, foo) {
  bar();
  foo();
}
export default function(bar, baz) {
  bar();
  baz();
}
