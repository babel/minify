if (foo.indexOf(bar) === -1) {
  const thisIs = aStatement;
}
if (foo.indexOf(bar) !== -1) {
  const thisIs = aStatement;
}

if (foo.indexOf(bar) == -1) {
  const thisIs = aStatement;
}
if (foo.indexOf(bar) != -1) {
  const thisIs = aStatement;
}

if (fooBar === -1) {
  const thisIs = aStatement;
}
if (fooBar !== -1) {
  const thisIs = aStatement;
}

if (fooBar == -1) {
  const thisIs = aStatement;
}
if (fooBar != -1) {
  const thisIs = aStatement;
}

if (foo.indexOf(bar) == 0) {
  const thisIs = aStatement;
}
if (foo.indexOf(bar) != 0) {
  const thisIs = aStatement;
}
if (foo.indexOf(bar) === 0) {
  const thisIs = aStatement;
}
if (foo.indexOf(bar) !== 0) {
  const thisIs = aStatement;
}

// --------------------------------------

foo.indexOf(bar) === -1 && an.expression()
foo.indexOf(bar) !== -1 && an.expression()

foo.indexOf(bar) == -1 && an.expression()
foo.indexOf(bar) != -1 && an.expression()

fooBar === -1 && an.expression()
fooBar !== -1 && an.expression()

fooBar == -1 && an.expression()
fooBar != -1 && an.expression()

foo.indexOf(bar) == 0 && an.expression()
foo.indexOf(bar) != 0 && an.expression()
foo.indexOf(bar) === 0 && an.expression()
foo.indexOf(bar) !== 0 && an.expression()
