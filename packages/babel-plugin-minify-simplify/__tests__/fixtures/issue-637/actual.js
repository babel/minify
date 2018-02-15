function test(a) {
  const clash = () => {};
  if (a) {
    return clash();
  } else {
    const clash = () => {};
    return clash();
  }
}