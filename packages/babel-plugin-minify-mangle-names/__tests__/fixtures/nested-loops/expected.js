(function () {
  for (let a in foo) {
    for (let b in foo[a]) {
      alert(foo[a][b]);
    }
  }
})();