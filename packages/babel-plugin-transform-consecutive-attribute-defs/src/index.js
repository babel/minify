"use strict";

function getLeftRightNodes(statements) {
  return statements.map((s) => [
    s.node.expression.left.property,
    s.node.expression.right,
  ]);
}

function getExpressionStatements(body, start, end, matcher) {
  const statements = [];
  for (let i = start; i < end && matcher(body[i]); i++) {
    statements.push(body[i]);
  }
  return statements;
}

function getMatcher(objName) {
  return (statement) => {
    if (!statement.isExpressionStatement()) {
      return false;
    }

    const expr = statement.get("expression");
    if (!expr.isAssignmentExpression()) {
      return false;
    }

    const left = expr.get("left"), right = expr.get("right");
    if (!left.isMemberExpression()) {
      return false;
    }

    const obj = left.get("object"), prop = left.get("property");
    if (!obj.isIdentifier() ||
        obj.node.name !== objName ||
        !prop.isIdentifier()) {
      return false;
    }

    // simple dependency check
    let seen = false;
    right.traverse({
      Identifier(path) {
        if (path.node.name === objName) {
          seen = true;
        }
      },
    });

    return !seen;
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
        if (!parent.isBlockParent()) {
          return;
        }

        const body = parent.get("body");
        const startIndex = body.indexOf(path);
        if (startIndex === -1) {
          return;
        }

        const matcher = getMatcher(id.node.name);

        const statements = getExpressionStatements(
          body,
          startIndex + 1,
          body.length,
          matcher
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
