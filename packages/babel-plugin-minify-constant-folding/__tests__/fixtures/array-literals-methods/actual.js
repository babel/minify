[1, 2, 3].push([4, 5, 6]);
[1, 2, 3]["push"]([4, 5, 6]);

[1, 2, 3].join();
["a", "b", "c"].join();
["a", "b", "c"].join("@");
[null, 1].join("/");
[/xyz/im, true].join("abc");
[`a${xyz}`].join("1");
[`a`, `c`].join("b");

[1, 2, 3].length;
[1, 2, 3][1];
[1, 2, 3]["1"];
[1, 2, 3][4];

[].shift();
[1, 2, 3].shift();

[1, 2, 3].slice();
[1, 2, 3].slice(1);
[1, 2, 3].slice(0, 2);
[1, 2, 3].slice(0, -1);

[1, 2, 3].pop();
[a, b, c].pop();
[].pop();

[a, b, c].reverse();
[1, 2, 3].reverse();

[1, 2, 3].splice(1);
[1, 2, 3, 4].splice(1, 2);

// bad calls
[1, 2, 3][concat]([4, 5, 6]);
[a, "b", "c"].join();
["a", "b", "c"].join(a);
[1, 2, 3].splice("a");
