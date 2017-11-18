(function() {
  for (let x in foo) {
    for (let y in foo[x]) {
      alert(foo[x][y]);
    }
  }
})();
