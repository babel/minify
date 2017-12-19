function foo(object, property, value) {
  return !!(object && property) && (object[property] = value, true);
}