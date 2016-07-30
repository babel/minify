module.exports = class PatternMatch {
  constructor(patterns) {
    this.decisionTree = this.makeDecisionTree(patterns);
  }
  handle(input, isMatch) {
    let result = this.match(input, isMatch);

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
    const NO_MATCH = Symbol('NO_MATCH');

    for (let i = 0; i < input.length; i++) {
      let keys = [...current.keys()];
      let matchedKey = NO_MATCH;

      // because map doesn't support custom key equal function
      for (let j = 0; j < keys.length; j++) {
        if (isMatch(keys[j], input[i])) {
          matchedKey = keys[j];
          result.keys.push(matchedKey);
          break;
        }
      }

      if (matchedKey !== NO_MATCH) {
        current = current.get(matchedKey);

        if (i === input.length - 1) {
          result.match = true;
          result.value = current;
          break;
        }
      }
    }
    return result;
  }
  makeDecisionTree(patterns) {
    // order of keys in a Map is the order of insertion
    let root = new Map;

    for (let pattern of patterns) {
      make(root, pattern);
    }

    return root;

    function make(parent, pattern) {
      if (pattern.length < 2) {
        throw new Error('at least 2 elements required in a pattern');
      }

      if (pattern.length === 2) {
        // here we don't handle duplicates
        // this pattern would have already been matched
        if (!parent.has(pattern[0])) {
          parent.set(pattern[0], pattern[1]);
        }

        return parent;
      }

      const [current, ...rest] = pattern;

      if (parent.has(current)) {
        make(parent.get(current), rest);
      } else {
        parent.set(current, make(new Map, rest));
      }
      return parent;
    }
  }
}
