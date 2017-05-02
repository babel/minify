"use strict";

function isSafeToInline(i, statements, scope, t) {
  if (!t.isReturnStatement(statements[i])) {
    return false;
  }
  const returnStatement = statements[i];
  if (!t.isIdentifier(returnStatement.argument)) {
    return false;
  }
  if (i === 0) {
    return false;
  }
  const varDeclaration = statements[i - 1];
  if (!(t.isVariableDeclaration(varDeclaration) &&
      varDeclaration.declarations.length === 1 &&
      t.isIdentifier(varDeclaration.declarations[0].id))) {
    return false;
  }
  const id = varDeclaration.declarations[0].id;
  const binding = scope.getOwnBinding(id.name);
  if (binding.references !== 1) {
    return false;
  }
  if (returnStatement.argument.name !== id.name) {
    return false;
  }
  return true;
}

function inline(i, block, statements) {
  const varDeclaration = statements[i - 1];
  const exp = varDeclaration.declarations[0].init;
  const statementsPath = block.get("body");
  statementsPath[i].get("argument").replaceWith(exp);
  statementsPath[i - 1].remove();
}

module.exports = function({ types: t }) {
  return {
    name: "transform-inline-temp-return",
    visitor: {
      BlockStatement(path) {
        const statements = path.node.body;
        for (let i = 0; i < statements.length; i++) {
          if (isSafeToInline(i, statements, path.scope, t)) {
            inline(i, path, statements, t);
          }
        }
      },
    },
  };
};
