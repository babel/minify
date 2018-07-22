({
  ['foo']: 'oof',
  bar: 'rab'
}).foo;
({
  ['foo']: 'oof',
  bar: 'rab'
}).baz;
({
  foo: 'bar',
  [computed]: 'foo'
}).foo;
({
  [computed]: 'foo',
  foo: 'bar'
}).foo;
({
  [0]: 'foo',
  ['foo']: 'bar'
})[0];
({
  0: 'foo',
  [computed]: 'val'
})[0];
({
  [computed]: 'val',
  [0]: 'foo'
})[0];
({
  [computed]: 'val',
  foo: 'bar'
})[0];
