({
  toString: () => 'bar',
  [computed]: 'foo'
}).toString;
({
  [computed]: 'foo',
  toString: () => 'bar'
}).toString;
({
  [computed]: 'foo'
}).toString;
({
  toString: () => 'bar'
}).toString;
({}).toString;
({}).notBuiltIn;
