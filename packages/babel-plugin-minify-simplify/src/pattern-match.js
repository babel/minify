const LEAF_NODE = Symbol("LEAF_NODE");

module.exports = class PatternMatch {
  constructor(patterns) {
    this.decisionTree = this.makeDecisionTree(patterns);
  }
  handle(input, isMatch) {
    const result = this.match(input, isMatch);

    if (!result.match) {
      throw new Error("No Match Found for " + input.toString());
    }

    if (typeof result.value !== "function") {
      throw new Error("Expecting a function. Instead got - " + result.value.toString());
    }

    result.value.call(null, input, result.keys);
  }
  match(input, isMatch = (a, b) => a === b) {
    let current = this.decisionTree;
    const result = {
      match: false,
      value: void 0,
      keys: []
    };

    // to handle falsy keys
    const NO_MATCH = Symbol("NO_MATCH");

    for (let i = 0; i < input.length; i++) {
      let matchedKey = NO_MATCH;

      // because map doesn't support custom key equal function
      for (const key of current.keys()) {
        if (isMatch(key, input[i])) {
          matchedKey = key;
          result.keys.push(matchedKey);
          break;
        }
      }

      if (matchedKey !== NO_MATCH) {
        current = current.get(matchedKey);

        if (i === input.length - 1) {
          if (current.has(LEAF_NODE)) {
            result.match = true;
            result.value = current.get(LEAF_NODE);
          }
          break;
        }
      } else {
        break;
      }
    }
    return result;
  }
  makeDecisionTree(patterns) {
    // order of keys in a Map is the order of insertion
    const root = new Map();

    for (const pattern of patterns) {
      make(root, pattern);
    }

    return root;

    function make(parent, pattern) {
      if (pattern.length < 2) {
        throw new Error("at least 2 elements required in a pattern");
      }

      if (pattern.length === 2) {
        if (parent.has(pattern[0])) {
          const pattern0 = parent.get(pattern[0]);
          if (!pattern0.has(LEAF_NODE)) {
            pattern0.set(LEAF_NODE, pattern[1]);
          }
          // here we don't handle duplicates
          // this pattern would have already been matched
        } else {
          parent.set(pattern[0], new Map([[LEAF_NODE, pattern[1]]]));
        }

        return parent;
      }

      const [current, ...rest] = pattern;

      if (parent.has(current)) {
        make(parent.get(current), rest);
      } else {
        parent.set(current, make(new Map(), rest));
      }
      return parent;
    }
  }
};
