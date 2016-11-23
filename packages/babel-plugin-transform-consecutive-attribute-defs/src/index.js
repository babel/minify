"use strict";

function getFunctionParent(path, scopeParent) {
  const parent = path.findParent((p) => p.isFunction());
  // don't traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionReferences(path, scopeParent, references = new Set()) {
  for (let func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
    const id = func.node.id;
    const binding = id && func.scope.getBinding(id.name);

    if (!binding) {
      continue;
    }

    binding.referencePaths.forEach((path) => {
      if (!references.has(path)) {
        references.add(path);
        getFunctionReferences(path, scopeParent, references);
      }
    });
  }
  return references;
}

function getIdAndFunctionReferences(name, parent) {
  const binding = parent.scope.getBinding(name);

  return binding.referencePaths.reduce((s, r) => {
    s.add(r);
    getFunctionReferences(r, parent, s);
    return s;
  }, new Set());
}

function getLeftRightNodes(statements) {
  return statements.map((s) => collectAssignmentExpressions(s))
                   .reduce((s, n) => s.concat(n), [])
                   .map((s) => [s.node.left.property, s.node.right]);
}

function getExpressionStatements(body, start, end, validator) {
  const statements = [];
  for (let i = start; i < end && validator(body[i]); i++) {
    statements.push(body[i]);
  }
  return statements;
}

function collectAssignmentExpressions(path) {
  // returns null if found inconsistency, else returns Array<assignexprs>
  if (path.isExpressionStatement()) {
    const exprs = collectAssignmentExpressions(path.get("expression"));
    return (exprs !== null) ? exprs : null;
  }

  if (path.isSequenceExpression()) {
    const exprs = path.get("expressions")
                      .map((p) => collectAssignmentExpressions(p));
    if (exprs.some((e) => e === null)) {
      return null;
    } else {
      return exprs.reduce((s, n) => s.concat(n), []);
    }
  }

  if (path.isAssignmentExpression()) {
    return [path];
  }

  return null;
}

function makeValidator(objName, references) {
  return (statement) => {

    const exprs = collectAssignmentExpressions(statement);
    if (exprs === null) {
      return false;
    }

    for (let expr of exprs) {
      const left = expr.get("left"), right = expr.get("right");
      if (!left.isMemberExpression()) {
        return false;
      }

      const obj = left.get("object"), prop = left.get("property");
      if (!obj.isIdentifier() || obj.node.name !== objName) {
        return false;
      }

      for (let r of references) {
        if (r.isDescendant(right)) {
          return false;
        }
        if (!prop.isIdentifier() && r.isDescendant(prop)) {
          return false;
        }
      }
    }

    return true;
  };
}

module.exports = function({ types: t }) {
  return {
    name: "transform-consecutive-attribute-defs",
    visitor: {
      VariableDeclaration(path) {
        const declarations = path.get("declarations");
        if (declarations.length !== 1) {
          return;
        }

        const declaration = declarations[0];
        const id = declaration.get("id"), init = declaration.get("init");
        if (!id.isIdentifier() || !init.isObjectExpression()) {
          return;
        }

        const parent = path.parentPath;
        if (!parent.isBlockParent() || !parent.isScopable()) {
          return;
        }

        const body = parent.get("body");
        const startIndex = body.indexOf(path);
        if (startIndex === -1) {
          return;
        }

        const references = getIdAndFunctionReferences(id.node.name, parent);
        const validator = makeValidator(id.node.name, references);
        if (validator === null) {
          return;
        }

        const statements = getExpressionStatements(
          body,
          startIndex + 1,
          body.length,
          validator
        );

        const leftRightNodes = getLeftRightNodes(statements);

        leftRightNodes.forEach(([left, right]) => {
          init.node.properties.push(t.objectProperty(left, right));
        });

        statements.forEach((s) => s.remove());
      },
    },
  };
};
