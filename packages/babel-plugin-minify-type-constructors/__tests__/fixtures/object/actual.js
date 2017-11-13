var x = Object();

var x = new Object();

// TODO: add Object(Array())
[Object(null), Object(undefined), new Object(void 0)];

// TODO: add Object(Array())
[Object({}), Object({ a: b }), Object({ a: b, c: d })];

[Object([]), Object([1]), Object([1, 2]), new Object([null])];

function a() {}
[Object(function() {}), new Object(a), Object(Array)];

[
  Object("undefined"),
  Object(nulled),
  Object(0),
  Object(false),
  Object(stuff())
];

[
  new Object("function"),
  new Object(Symbol),
  new Object(true),
  new Object(1),
  new Object(call({ me: true }))
];
