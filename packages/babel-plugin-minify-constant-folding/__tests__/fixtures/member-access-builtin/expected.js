({
  toString: () => 'bar',
  [computed]: 'foo'
}).toString;

() => 'bar';

({
  [computed]: 'foo'
}).toString;

() => 'bar';

({}).toString;
void 0;