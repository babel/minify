"use strict";

module.exports = function bfsTraverseCreator({ types: t, traverse }) {
  function getFields(path) {
    return t.VISITOR_KEYS[path.type];
  }

  return function bfsTraverse(path, _visitor) {
    if (!path.node) {
      throw new Error("Not a valid path");
    }
    const visitor = traverse.explode(_visitor);

    const queue = [path];
    let current;

    while (queue.length > 0) {
      current = queue.shift();

      // call
      if (
        visitor &&
        visitor[current.type] &&
        Array.isArray(visitor[current.type].enter)
      ) {
        const fns = visitor[current.type].enter;
        for (const fn of fns) {
          if (typeof fn === "function") fn(current);
        }
      }

      const fields = getFields(current);

      for (const field of fields) {
        const child = current.get(field);

        if (Array.isArray(child)) {
          // visit container left to right
          for (const c of child) {
            if (c.node) queue.push(c);
          }
        } else {
          if (child.node) queue.push(child);
        }
      }
    }
  };
};
