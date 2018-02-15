function foo(object, property, value) {
  if (object && property) {
    object[property] = value;
    return true;
  }
  return false;
}