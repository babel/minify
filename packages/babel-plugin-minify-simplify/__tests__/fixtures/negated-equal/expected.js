if (foo !== 2) {
  const thisIs = aStatement;
}

if (foo === 2) {
  const thisIs = aStatement;
}

if (foo ^ 2) {
  const thisIs = aStatement;
}

if (foo == 2) {
  const thisIs = aStatement;
}

if (myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) !== 2) {
  const thisIs = aStatement;
}
if (myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) === 2) {
  const thisIs = aStatement;
}

if (myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) ^ 2) {
  const thisIs = aStatement;
}
if (myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) == 2) {
  const thisIs = aStatement;
}

// --------------------------------------

foo !== 2 && an.expression(), foo === 2 && an.expression(), foo ^ 2 && an.expression(), foo == 2 && an.expression(), myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) !== 2 && an.expression(), myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) === 2 && an.expression(), myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) ^ 2 && an.expression(), myFoo({
  bar: {
    baz: {
      quux() {}

    }
  }
}) == 2 && an.expression();
