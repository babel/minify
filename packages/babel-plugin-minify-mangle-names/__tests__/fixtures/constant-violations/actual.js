!function() {
  var foo = 1;
  foo++;
  var foo = 2;
  foo++;
};

(function() {
  var x = y;
  x = z;
  x;
})();
