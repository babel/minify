const a = console.log;
a();
const b = console.log.bind(console);
b("asdf");
var x = console.log ? console.log('log') : foo();
function foo() {
  if (console.error) {
    console.error("Errored");
  }
}
console.log.call(console, "foo");
console.log.apply(null, {});