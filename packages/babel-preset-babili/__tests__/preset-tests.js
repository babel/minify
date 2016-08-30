jest.autoMockOff();

const transformer = require("../../../utils/test").transformer;
const transform = transformer(void 0, {
  presets: [require("../src")]
});

describe("preset", () => {
  // https://github.com/babel/babili/issues/122
  it ("should fix issue#122", () => {
    const source = `
      function foo() {
        var a, b, c;
        if (a) {
          if (b) {
            if (c) {}
          }
        } else {
          if (b) {
          } else {
            if (c) {}
          }
        }
      }
    `;

    expect(transform(source)).toMatchSnapshot();
  });
});
