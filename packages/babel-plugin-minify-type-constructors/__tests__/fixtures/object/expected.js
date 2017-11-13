var x = {};

var x = {};

// TODO: add Object(Array())
[{}, {}, {}];

// TODO: add Object(Array())
[{}, { a: b }, { a: b, c: d }];

[[], [1], [1, 2], [null]];

function a() {}
[function () {}, a, Object(Array)];

[Object("undefined"), Object(nulled), Object(0), Object(false), Object(stuff())];

[Object("function"), Object(Symbol), Object(true), Object(1), Object(call({ me: true }))];