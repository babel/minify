function foo(param) {
  if (param !== null) {
    let thingA = param.a;
    let thingB = param.b;

    if (thingA || thingB) {
      let thingC = param.c;
    }
  }
}