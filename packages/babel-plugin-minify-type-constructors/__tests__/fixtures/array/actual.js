Array("Rome");
Array(false);
Array(null);
new Array({});
new Array([a, b]);
Array([]);
Array(t);
new Array(a.b);
new Array((() => 5)());

// numbers
Array(0);
Array(1);
Array(2 + 4);
Array(7);

// Array(n>6)
new Array(6);
new Array(7);

// multiple args
Array("a", "b");
new Array("0", "1", {});
Array(10, Symbol(), foo());
