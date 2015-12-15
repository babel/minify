'use strict';

const { types } = require('babel-core');

function equiv(a, b) {
  if (typeof a !== 'object' || typeof a !== 'object' || a == null || b == null) {
    return a === b;
  }

  if (a.type !== b.type) {
    return false;
  }

  const fields = Object.keys(types.NODE_FIELDS[a.type]);

  for (let field of fields) {
    if (typeof a[field] !== typeof b[field]) {
      return false;
    }

    if (Array.isArray(a[field])) {
      if (!Array.isArray(b[field])) {
        return false;
      }
      if (a[field].length !== b[field].length) {
        return false;
      }

      for (let i = 0; i < a[field].length; i++) {
        if (!equiv(a[field][i], b[field][i])) {
          return false;
        }
      }
      continue;
    }

    if (!equiv(a[field], b[field])) {
      return false;
    }
  }

  return true;
}

module.exports = equiv;
