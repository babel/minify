function foo(param) {
  if (param === null) return;
  let thingA = param.a;
  let thingB = param.b;
  if (!thingA && !thingB) return;
  let thingC = param.c;
}