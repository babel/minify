jest.autoMockOff();

const thePlugin = require("../../../utils/test-transform")(
  require("../src/index")
);

describe("constant-folding-plugin", () => {
  thePlugin(
    "should evaluate some expressions",
    `
    "a" + "b"
    2 * 3;
    1/3;
    4 | 3;
    a(), b();
    var x = 1;
    foo(x);
    "b" + a + "c" + "d" + g + z + "f" + "h" + "z"
  `,
    `
    "ab";
    6;
    1 / 3;
    7;
    a(), b();
    var x = 1;
    foo(x);
    "b" + a + "cd" + g + z + "fhz";
  `
  );

  thePlugin(
    "should skip -0",
    `
    -0;
    +-0;
    +0;
  `,
    `
    -0;
    -0;
    0;
  `
  );

  thePlugin(
    "should handle runtime errors",
    `
    try {
      x({
        toString: 0
      } + '');
    } catch (e) {}
  `
  );

  thePlugin.skip(
    "should handle script escape",
    `
    "</" + "script"
  `,
    `
    "<\\\\/script";
  `
  );

  thePlugin.skip(
    "should handle style escape",
    `
    "</" + "style"
  `,
    `
    "<\\\\/style";
  `
  );

  thePlugin.skip(
    "should handle html comment escape",
    `
    "<!" + "--"
  `,
    `
    "\\\\x3C!--";
  `
  );

  thePlugin(
    "should fix #440",
    `
    var x = "'cool'" + "test";
  `,
    `
    var x = "'cool'test";
  `
  );

  thePlugin(
    "should handle Array methods on array literals",
    `
    [1, 2, 3].push([4, 5, 6]);
    [1, 2, 3]["push"]([4, 5, 6]);

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
  `,
    `
    4;
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
  thePlugin(
    "should ignore bad calls to array expression methods",
    `
    [1, 2, 3][concat]([4, 5, 6]);
    [a, "b", "c"].join();
    ["a", "b", "c"].join(a);
    [1, 2, 3].splice("a");
  `
  );
  thePlugin(
    "should ignore bad calls to string expression methods",
    `
    "abc".something;
    "abc"["something"];
  `
  );
  thePlugin(
    "should handle String methods on string literals",
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
  `,
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

  thePlugin(
    "shouldn’t crash on toString() calls or accesses",
    `
    "foo".toString();
    ["foo", "bar"].toString();
    ({}).toString();
    "foo".toString;
    ["foo", "bar"].toString;
    ({}).toString;
  `
  );
});
