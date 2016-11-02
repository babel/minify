module.exports = function minifyProperties({ types: t }) {
  const count = new Map;
  const paths = new Map;

  function increment(name) {
    if (count.has(name)) {
      count.set(name, count.get(name) + 1);
    } else {
      count.set(name, 1);
    }
  }

  function addPath(path) {
    const {name} = path.node;
    if (paths.has(name)) {
      paths.get(name).push(path);
    } else {
      paths.set(name, [path]);
    }
  }

  const collectVisitor = {
    MemberExpression(path) {
      const property = path.get("property");
      if (property.isIdentifier() && path.node.computed === false) {
        increment(property.node.name);
        addPath(property);
      }
    },
    "ObjectProperty|ObjectMethod|ClassMethod"(path) {
      const key = path.get("key");
      if (key.isIdentifier() && path.node.computed === false) {
        increment(key.node.name);
        addPath(key);
      }
    }
  };

  /**
   * when we make a property to a computed property, we create a
   * new variable in the scope and we have to account for that. Here
   * we assume that a new var creation takes 7 characters more
   * - "var ab=" - we allocate 2 characters per variable because the
   * current mangler is not able to reuse variables in different scopes.
   *
   * We also account for quotes(2) and the semicolon(1)
   *
   * And we account for the usage
   * - 3 characters for MemberExpression properties - [ab] minus "."
   * - 4 characters for ObjectProperty, ObjectMethod, ClassMethod - [ab]
   */
  function filterNames() {
    const changes = new Map;
    for (let [name, times] of count) {
      let oldCost = name.length * times;
      let newCost = 7 /*declaration*/ + name.length + 2 /*quotes*/ + 1 /*semicolon*/;

      if (!paths.has(name)) {
        throw new Error("Forgot to addPath(path)?");
      }

      const pathArray = paths.get(name);

      pathArray.forEach(path => {
        const parent = path.parentPath;
        if (parent.isMemberExpression()) {
          newCost += 3;
        } else if (parent.isObjectProperty() || parent.isObjectMethod() || parent.isClassMethod()) {
          newCost += 4;
        } else {
          throw new Error("Unhandled type:" + parent.type);
        }
      });

      if (newCost < oldCost) {
        changes.set(name, pathArray);
      }
    }
    return changes;
  }

  function updateItems(toChange, program) {
    for (let [name, paths] of toChange) {
      const varName = program.scope.generateUidIdentifier();

      program.get("body")[0].insertBefore([
        t.variableDeclaration(
          "const",
          [
            t.variableDeclarator(
              varName,
              t.stringLiteral(name)
            )
          ]
        )
      ]);

      paths.forEach(path => {
        path.parentPath.node.computed = true;
        path.node.name = varName.name;
      });
    }
  }

  return {
    name: "minify-properties",
    visitor: {
      Program(path) {
        path.traverse(collectVisitor);
        const toChange = filterNames();
        updateItems(toChange, path);
      }
    }
  }
};
