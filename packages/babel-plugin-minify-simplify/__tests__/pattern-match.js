jest.autoMockOff();

const PatternMatch = require("../src/pattern-match");

describe("simplify-plugin - pattern-match", () => {
  it("should match simple patterns", () => {
    const patterns = [
      ["a", "b", "c"],
      ["foo", "bar"],
      ["bar", "bar", true],
      [1, true, "foo"],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ["foo", 1, (a) => a]
    ];
    const matcher = new PatternMatch(patterns);

    patterns.forEach((pattern) => {
      const input = pattern.slice(0, pattern.length - 1);
      const result = matcher.match(input);
      expect(result.match).toBe(true);
      expect(result.value).toBe(pattern[pattern.length - 1]);
    });
  });

  it("should match simple patterns 2", () => {
    const patterns = [
      [true, false],
      [true, true],
      ["foo", "bar"],
      [1, 2, 3],
      ["a", 1, true]
    ];
    const matcher = new PatternMatch(patterns.map((pattern) => {
      return [...pattern, (pattern1) => {
        expect(pattern1).toEqual(pattern);
      }];
    }));
    patterns.forEach((pattern) => {
      const result = matcher.match(pattern);
      expect(result.match).toBe(true);
      result.value(pattern);
    });
  });

  it("should throw when a pattern contains less than 2 entries", () => {
    expect(() => {
      new PatternMatch([
        ["foo", "bar"],
        ["baz"]
      ]);
    }).toThrowError("at least 2 elements required in a pattern");
  });

  it("should accept a custom matcher", () => {
    const BOOL = (a) => typeof a === "boolean";
    const NUMBER = (a) => typeof a === "number";
    const STRING = (a) => typeof a === "string";
    const MATCHER = (a) => a instanceof PatternMatch;

    const matcher = new PatternMatch([
      [ BOOL, NUMBER, "foo" ],
      [ NUMBER, ["foo", "bar", BOOL], "foobarbaz" ],
      [ BOOL, STRING, NUMBER, "baz" ],
      [ STRING, MATCHER, "foobar" ]
    ]);

    const inputs = [
      [true, 1],
      [false, 10.4],
      [100, "foo"],
      [0.5, "bar"],
      [1, false],
      [false, "foo", 10],
      ["bar", matcher]
    ];

    const expected = [
      "foo",
      "foo",
      "foobarbaz",
      "foobarbaz",
      "foobarbaz",
      "baz",
      "foobar"
    ];

    inputs.forEach((input, index) => {
      const result = matcher.match(input, customMatchFunction);
      expect(result.match).toBe(true);
      expect(result.value).toBe(expected[index]);
    });

    function customMatchFunction(pattern, input) {
      if (typeof pattern === "function") {
        return pattern(input);
      }
      if (Array.isArray(pattern)) {
        for (let i = 0; i < pattern.length; i++) {
          if (customMatchFunction(pattern[i], input)) {
            return true;
          }
        }
        return false;
      }
      return pattern === input;
    }
  });

  it("should match in order - first match should win", () => {
    const matcher = new PatternMatch([
      [1, true, "foo"],
      [1, true, "bar"]
    ]);
    const result = matcher.match([1, true]);
    expect(result.match).toBe(true);
    expect(result.value).toBe("foo");
  });

  it("should handle case no match found", () => {
    const matcher = new PatternMatch([
      [1, 2, 3],
      [2, 2, 4, 5],
      [3, 2, 1, 6],
      [1, 2, 4, 3],
      [4, 3, 2, 1]
    ]);
    const result = matcher.match([1, 2, 5]);
    expect(result.match).toBe(false);
    expect(result.value).toBe(void 0);
  });

  it("should match the first found pattern even if it's less specific", () => {
    const matcher = new PatternMatch([
      ["foo", "bar", "baz"],
      ["foo", "bar", "baz", true]
    ]);
    const result = matcher.match(["foo", "bar"]);
    expect(result.match).toBe(true);
    expect(result.value).toBe("baz");
  });

  it("should match the first found pattern even if it's less specific 2", () => {
    const matcher = new PatternMatch([
      [1, 2, 3],
      [1, 2, 3, 4],
      [1, 3],
      [1, 3, 5]
    ]);

    expect(matcher.match([1])).toEqual({
      match: true,
      value: 3,
      keys: [1]
    });

    expect(matcher.match([1, 2])).toEqual({
      match: true,
      value: 3,
      keys: [1, 2]
    });

    expect(matcher.match([1, 3])).toEqual({
      match: true,
      value: 5,
      keys: [1, 3]
    });
  });
});
