"use strict";

module.exports = function({ types: t }) {
  return {
    name: "transform-remove-console",
    visitor: {
      CallExpression(path, state) {
        const callee = path.get("callee");

        if (!callee.isMemberExpression()) return;

        if (isIncludedConsole(callee, state)) {
          // console.log()
          if (path.parentPath.isExpressionStatement()) {
            path.remove();
          } else {
            path.replaceWith(createVoid0());
          }
        } else if (isIncludedConsoleBind(callee, state)) {
          // console.log.bind()
          path.replaceWith(createNoop());
        }
      },
      MemberExpression: {
        exit(path, state) {
          if (
            isIncludedConsole(path, state) &&
            !path.parentPath.isMemberExpression()
          ) {
            if (
              path.parentPath.isAssignmentExpression() &&
              path.parentKey === "left"
            ) {
              path.parentPath.get("right").replaceWith(createNoop());
            } else {
              path.replaceWith(createNoop());
            }
          }
        }
      }
    }
  };

  function isGlobalConsoleId(id) {
    const name = "console";
    return (
      id.isIdentifier({ name }) &&
      !id.scope.getBinding(name) &&
      id.scope.hasGlobal(name)
    );
  }

  function isExcluded(property, state) {
    let exclude = false;
    if (state.opts.exclude) {
      state.opts.exclude.forEach(excluded => {
        if (property.isIdentifier({ name: excluded })) {
          exclude = true;
        }
      });
    }
    return exclude;
  }

  function isIncludedConsole(memberExpr, state) {
    const object = memberExpr.get("object");
    const property = memberExpr.get("property");

    if (isExcluded(property, state)) return false;

    if (isGlobalConsoleId(object)) return true;

    return (
      isGlobalConsoleId(object.get("object")) &&
      (property.isIdentifier({ name: "call" }) ||
        property.isIdentifier({ name: "apply" }))
    );
  }

  function isIncludedConsoleBind(memberExpr, state) {
    const object = memberExpr.get("object");

    if (!object.isMemberExpression()) return false;
    if (isExcluded(object.get("property"), state)) return false;

    return (
      isGlobalConsoleId(object.get("object")) &&
      memberExpr.get("property").isIdentifier({ name: "bind" })
    );
  }

  function createNoop() {
    return t.functionExpression(null, [], t.blockStatement([]));
  }

  function createVoid0() {
    return t.unaryExpression("void", t.numericLiteral(0));
  }
};
