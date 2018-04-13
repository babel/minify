["Rome"];
[false];
[null];
[{}];
[[a, b]];
[[]];
Array(t);
Array(a.b);
Array((() => 5)()); // numbers

[];
[,];
[,,,,,,];
Array(7); // Array(n>6)

[,,,,,,];
Array(7); // multiple args

["a", "b"];
["0", "1", {}];
[10, Symbol(), foo()];