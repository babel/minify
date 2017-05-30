jest.autoMockOff();

const babel = require("babel-core");
const unpad = require("../../../utils/unpad");

function transform(code) {
  return babel.transform(code, {
    plugins: [require("../src/index")]
  }).code;
}

describe("constant-folding-plugin", () => {
  it("should evaluate some expressions", () => {
    const source = unpad(`
      "a" + "b"
      2 * 3;
      1/3;
      4 | 3;
      a(), b();
      var x = 1;
      foo(x);
      "b" + a + "c" + "d" + g + z + "f" + "h" + "z"
    `);

    const expected = unpad(`
      "ab";
      6;
      1 / 3;
      7;
      a(), b();
      var x = 1;
      foo(x);
      "b" + a + "cd" + g + z + "fhz";
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should skip -0", () => {
    const source = unpad(`
      -0;
      +-0;
      +0;
    `);

    const expected = unpad(`
      -0;
      -0;
      0;
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle runtime errors", () => {
    const source = unpad(`
      try {
        x({
          toString: 0
        } + '');
      } catch (e) {}
    `);
    expect(transform(source)).toBe(source);
  });

  xit("should handle script escape", () => {
    const source = unpad(`
      "</" + "script"
    `);

    const expected = unpad(`
      "<\\\\/script";
    `);
    expect(transform(source)).toBe(expected);
  });

  xit("should handle style escape", () => {
    const source = unpad(`
      "</" + "style"
    `);

    const expected = unpad(`
      "<\\\\/style";
    `);
    expect(transform(source)).toBe(expected);
  });

  xit("should handle html comment escape", () => {
    const source = unpad(`
      "<!" + "--"
    `);

    const expected = unpad(`
      "\\\\x3C!--";
    `);
    expect(transform(source)).toBe(expected);
  });

  it("should fix #440", () => {
    const source = unpad(`
      var x = "'cool'" + "test";
      `);
    const expected = unpad(`
      var x = "'cool'test";
      `);
    expect(transform(source)).toBe(expected);
  });

  it("should handle Array methods on array literals", () => {
    const source = unpad(
      `
      [1, 2, 3].concat([4, 5, 6]);
      [a, b, c].concat([d, e], f, g, [h]);
      [1, 2, 3]["concat"]([4, 5, 6]);
      [1, 2, 3].push([4, 5, 6]);

      [1, 2, 3].join();
      ["a", "b", "c"].join();
      ["a", "b", "c"].join("@");

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
    `
    );
    const expected = unpad(
      `
      [1, 2, 3, 4, 5, 6];
      [a, b, c, d, e, f, g, h];
      [1, 2, 3, 4, 5, 6];
      4;

      "1,2,3";
      "a,b,c";
      "a@b@c";

      3;
      2;
      2;
      void 0;

      void 0;
      2;

      [1, 2, 3];
      [2, 3];
      [1, 2];
      [1, 2, 3].slice(0, -1);

      3;
      c;
      void 0;

      [c, b, a];
      [3, 2, 1];

      [2, 3];
      [2, 3];
    `
    );
    expect(transform(source)).toBe(expected);
  });
  it("should ignore bad calls to array expression methods", () => {
    const source = unpad(
      `
      [1, 2, 3][concat]([4, 5, 6]);
      [a, "b", "c"].join();
      ["a", "b", "c"].join(a);
      [1, 2, 3].splice("a");
    `
    );
    expect(transform(source)).toBe(source);
  });
  it("should ignore bad calls to string expression methods", () => {
    const source = unpad(
      `
      "abc".something;
      "abc"["something"];
    `
    );
    expect(transform(source)).toBe(source);
  });
  it("should handle String methods on string literals", () => {
    const source = unpad(
      `
      "a,b,c".split(",");
      "a,b,c".split("");
      "a,b,c".split();
      "abc"[0];
      "abc"["0"];
      "abc"[4];
      "abc".charAt();
      "abc".charAt(1);
      "abc".charCodeAt();
      "abc".charCodeAt(1);
      "abc".length;

      "\u{1f44d}".charCodeAt();
      "\u{1f44d}".charCodeAt(1);
      "\u{1f44d}".codePointAt();
      "\u{1f44d}".codePointAt(1);
    `
    );

    const expected = unpad(
      `
      ["a", "b", "c"];
      ["a", ",", "b", ",", "c"];
      ["a,b,c"];
      "a";
      "a";
      void 0;
      "a";
      "b";
      97;
      98;
      3;

      ${0xd83d};
      ${0xdc4d};
      ${0x1f44d};
      ${0xdc4d};
    `
    );
    expect(transform(source)).toBe(expected);
  });
});
