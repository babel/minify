'oof';
void 0;
({
  foo: 'bar',
  [computed]: 'foo'
}).foo;
'bar';
'foo';
({
  0: 'foo',
  [computed]: 'val'
})[0];
'foo';
({
  [computed]: 'val',
  foo: 'bar'
})[0];