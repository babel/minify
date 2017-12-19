function foo() {
  if (window.self != window.top) return void (__DEV__ && console.log('lol', name));
  lol();

  try {
    lol();
  } catch (e) {}
}