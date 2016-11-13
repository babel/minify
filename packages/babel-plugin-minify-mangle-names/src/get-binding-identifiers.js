/**
 * Original Source: https://github.com/babel/babel/blob/master/packages/babel-types/src/retrievers.js
 *
 * The original source is able to return only a Node. But we need Path to work around
 * this bug when used with BlockScoping Plugin or ES2015 preset
 * - The same Node {type: Identifier, name: "x"} object results in being used
 *   in multiple places - binding, binding reference,
 *   and another binding with same name in a different scope
 *
 * - This might be moved to babel in future
 *
 * Note:
 * This uses the KEYS from the original implementation from Babel
 *
 */
module.exports = function (t) {
  const KEYS = t.getBindingIdentifiers.keys;

  return function getBindingIdentifiers(path, duplicates = false, outerOnly = false) {
    let search = [].concat(path);
    let ids = Object.create(null);

    while (search.length) {
      let id = search.shift();
      if (!id) continue;
      if (!id.node) continue;

      let keys = KEYS[id.node.type];

      if (id.isIdentifier()) {
        if (duplicates) {
          let _ids = ids[id.node.name] = ids[id.node.name] || [];
          _ids.push(id);
        } else {
          ids[id.node.name] = id;
        }
        continue;
      }

      if (id.isExportDeclaration()) {
        const declaration = id.get("declaration");
        if (declaration.isDeclaration()) {
          search.push(declaration);
        }
        continue;
      }

      if (outerOnly) {
        if (id.isFunctionDeclaration()) {
          search.push(id.get("id"));
          continue;
        }
        if (id.isFunctionExpression()) {
          continue;
        }
      }

      if (keys) {
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          const child = id.get(key);
          if (child.node) {
            search = search.concat(child);
          }
        }
      }
    }

    return ids;
  };
};
