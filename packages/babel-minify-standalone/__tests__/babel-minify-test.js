const BabelMinify = require('../babel-minify');

// Basic smoke tests for babel-minify-standalone
describe('babel-minify-standalone', () => {
  it('works', () => {
    const output = BabelMinify.transform(
`
class Mangler {
  constructor(program) {
    this.program = program;
  }
}
new Mangler();`).code;
    expect(output).toBe('class Mangler{constructor(a){this.program=a}}new Mangler;');
  });
});
