"use strict";

const DELIMITTER = ".";

module.exports = function parseOpts(argv) {
  return dotsToObject(argv);
};

/**
 * Converts and Object of the form - {key<dot-notation>: value} to deep object
 * following rules of babili preset options
 *
 * A preset option can be `true` | `object` which enables the particular plugin
 * `false` disables the plugin
 *
 * @param input - An Object with dot-notation keys
 */
function dotsToObject(input) {
  const dots = Object.keys(input).map(key => [
    ...key.split(DELIMITTER),
    input[key]
  ]);

  // sort to ensure dot notation occurs after parent key
  dots.sort((a, b) => {
    if (a.length === b.length) {
      return a[0] > b[0];
    }
    return a.length > b.length;
  });

  const obj = {};

  for (const parts of dots) {
    add(obj, ...parts);
  }

  // make object
  function add(o, first, ...rest) {
    if (rest.length < 1) {
      // something went wrong
      throw new Error("Option Parse Error");
    } else if (rest.length === 1) {
      // there is only a key and a value
      // for example: mangle: true
      o[first] = rest[0];
    } else {
      // create the current path and recurse if the plugin is enabled
      if (!hop(o, first) || o[first] === true) {
        // if the plugin is enabled
        o[first] = {};
      }
      if (o[first] !== false) {
        // if the plugin is NOT disabled then recurse
        add(o[first], ...rest);
      }
    }
  }

  return obj;
}

function hop(o, key) {
  return Object.prototype.hasOwnProperty.call(o, key);
}
