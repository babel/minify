function foo() {
  return window.self == window.top ? void lol() : void (__DEV__ && console.log('lol', name));
}