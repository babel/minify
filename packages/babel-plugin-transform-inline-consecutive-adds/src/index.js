"use strict";

const COLLAPSERS = [
  require("./object-collapser"),
  require("./array-collapser"),
  require("./array-property-collapser"),
  require("./set-collapser")
].map(Collapser => {
  return new Collapser();
});

function getFunctionParent(path, scopeParent) {
  const parent = path.findParent(p => p.isFunction());
  // don"t traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionReferences(path, scopeParent, references = new Set()) {
  for (
    let func = getFunctionParent(path, scopeParent);
    func;
    func = getFunctionParent(func, scopeParent)
  ) {
    const id = func.node.id;
    const binding = id && func.scope.getBinding(id.name);

    if (!binding) {
      continue;
    }

    binding.referencePaths.forEach(path => {
      if (!references.has(path)) {
        references.add(path);
        getFunctionReferences(path, scopeParent, references);
      }
    });
  }
  return references;
}

function getIdAndFunctionReferences(name, parent) {
  // Returns false if there's an error. Otherwise returns a list of references.
  const binding = parent.scope.getBinding(name);
  if (!binding) {
    return false;
  }

  const references = binding.referencePaths.reduce((references, ref) => {
    references.add(ref);
    getFunctionReferences(ref, parent, references);
    return references;
  }, new Set());

  return Array.from(references);
}

function validateTopLevel(path) {
  // Ensures the structure is of the form (roughly):
  // {
  //   ...
  //   var foo = expr;
  //   ...
  // }
  // returns null if not of this form
  // otherwise returns [foo as string, ?rval, index of the variable declaration]

  const declarations = path.get("declarations");
  if (declarations.length !== 1) {
    return;
  }

  const declaration = declarations[0];
  const id = declaration.get("id"), init = declaration.get("init");
  if (!id.isIdentifier()) {
    return;
  }

  const parent = path.parentPath;
  if (!parent.isBlockParent() || !parent.isScopable()) {
    return;
  }

  const body = parent.get("body");
  if (!Array.isArray(body)) {
    return;
  }
  const startIndex = body.indexOf(path);
  if (startIndex === -1) {
    return;
  }

  return [id.node.name, init, startIndex];
}

function collectExpressions(path, isExprTypeValid) {
  // input: ExprStatement => 'a | SequenceExpression
  // SequenceExpression => 'a list
  // Validates 'a is of the right type
  // returns null if found inconsistency, else returns Array<"a>
  if (path.isExpressionStatement()) {
    const exprs = collectExpressions(path.get("expression"), isExprTypeValid);
    return exprs !== null ? exprs : null;
  }

  if (path.isSequenceExpression()) {
    const exprs = path
      .get("expressions")
      .map(p => collectExpressions(p, isExprTypeValid));
    if (exprs.some(e => e === null)) {
      return null;
    } else {
      return exprs.reduce((s, n) => s.concat(n), []); // === Array.flatten
    }
  }

  if (isExprTypeValid(path)) {
    return [path];
  }

  return null;
}

function getContiguousStatementsAndExpressions(
  body,
  start,
  end,
  isExprTypeValid,
  checkExpr
) {
  const statements = [];
  let allExprs = [];
  for (let i = start; i < end; i++) {
    const exprs = collectExpressions(body[i], isExprTypeValid);
    if (exprs === null || !exprs.every(e => checkExpr(e))) {
      break;
    }
    statements.push(body[i]);
    allExprs = allExprs.concat(exprs);
  }
  return [statements, allExprs];
}

function getReferenceChecker(references) {
  // returns a function s.t. given an expr, returns true iff expr is an ancestor of a reference
  return expr => references.some(r => r.isDescendant(expr));
}

function tryUseCollapser(t, collapser, varDecl, topLevel, checkReference) {
  // Returns true iff successfully used the collapser. Otherwise returns undefined.
  const [name, init, startIndex] = topLevel;
  const body = varDecl.parentPath.get("body");
  if (!collapser.isInitTypeValid(init)) {
    return;
  }

  const [statements, exprs] = getContiguousStatementsAndExpressions(
    body,
    startIndex + 1,
    body.length,
    collapser.isExpressionTypeValid,
    collapser.getExpressionChecker(name, checkReference)
  );

  if (statements.length === 0) {
    return;
  }

  const assignments = exprs.map(e => collapser.extractAssignment(e));
  const oldInit = init.node;
  const newInit = t.cloneDeep(oldInit);
  if (
    !assignments.every(assignment =>
      collapser.addSuccessfully(t, assignment, newInit)
    )
  ) {
    return;
  }

  // some collapses may increase the size
  if (
    !collapser.isSizeSmaller({
      newInit,
      oldInit,
      varDecl,
      assignments,
      statements
    })
  ) {
    return;
  }

  init.replaceWith(newInit);
  statements.forEach(s => s.remove());
  return true;
}

module.exports = function({ types: t }) {
  return {
    name: "transform-inline-consecutive-adds",
    visitor: {
      VariableDeclaration(varDecl) {
        const topLevel = validateTopLevel(varDecl);
        if (!topLevel) {
          return;
        }

        const [name] = topLevel;
        const references = getIdAndFunctionReferences(name, varDecl.parentPath);
        if (references === false) {
          return;
        }
        const checkReference = getReferenceChecker(references);

        if (
          COLLAPSERS.some(c =>
            tryUseCollapser(t, c, varDecl, topLevel, checkReference)
          )
        ) {
          return;
        }
      }
    }
  };
};
