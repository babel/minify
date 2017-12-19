function foo() {
  if(window.self != window.top) {
    if(__DEV__) {
      console.log('lol', name);
    }
    return;
  }
  lol();
  try { lol() } catch (e) {}
}