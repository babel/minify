jest.dontMock('../Base54');

const Base54 = require('../Base54');

describe('base54', () => {
  it('should generate names based on existing code', () => {
    const base54 = new Base54();
    base54.consider('abc');
    base54.sort();
    expect([
      base54.name(0),
      base54.name(1),
      base54.name(2),
    ]).toEqual([
      'a',
      'c',
      'b',
    ]);
  });
});
