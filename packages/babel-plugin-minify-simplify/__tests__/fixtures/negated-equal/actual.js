if (!(foo === bar)) {
  const thisIs = aStatement;
}
if (!(foo !== bar)) {
  const thisIs = aStatement;
}

if (!(foo == bar)) {
  const thisIs = aStatement;
}
if (!(foo != bar)) {
  const thisIs = aStatement;
}

if (!(myFoo({ bar: { baz: { quux() {} } } }) === my.bar(() => {}))) {
  const thisIs = aStatement;
}
if (!(myFoo({ bar: { baz: { quux() {} } } }) !== my.bar(() => {}))) {
  const thisIs = aStatement;
}

if (!(myFoo({ bar: { baz: { quux() {} } } }) == my.bar(() => {}))) {
  const thisIs = aStatement;
}
if (!(myFoo({ bar: { baz: { quux() {} } } }) != my.bar(() => {}))) {
  const thisIs = aStatement;
}

// --------------------------------------

!(foo === bar) && an.expression()
!(foo !== bar) && an.expression()

!(foo == bar) && an.expression()
!(foo != bar) && an.expression()

!(myFoo({ bar: { baz: { quux() {} } } }) === my.bar(() => {})) && an.expression()
!(myFoo({ bar: { baz: { quux() {} } } }) !== my.bar(() => {})) && an.expression()

!(myFoo({ bar: { baz: { quux() {} } } }) == my.bar(() => {})) && an.expression()
!(myFoo({ bar: { baz: { quux() {} } } }) != my.bar(() => {})) && an.expression()
