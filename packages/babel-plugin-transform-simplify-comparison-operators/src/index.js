"use strict";

module.exports = function({ types: t }) {
  // custom implementation of getTypeAnnotation that fixes
  // the type information that is lost during sequence expression transformation
  // https://github.com/babel/minify/issues/323
  function customTypeAnnotation(path) {
    if (path.typeAnnotation) {
      return path.typeAnnotation;
    }

    // We are not handling the case of literals and other base types
    // since they are already handled via getTypeAnnotation
    const { node } = path;
    const binding = path.parentPath.scope.getBinding(node.name);

    const types = [];
    if (binding && binding.constantViolations) {
      if (binding.identifier.typeAnnotation) {
        return binding.identifier.typeAnnotation;
      }
      if (binding.constantViolations) {
        const violations = binding.constantViolations;
        for (let violation of violations) {
          types.push(violation.getTypeAnnotation());
        }
      }
    }

    if (types.length > 0) {
      return t.createUnionTypeAnnotation(types);
    }
    return types;
  }

  // Based on the type inference in Babel
  function baseTypeStrictlyMatches(left, right) {
    let leftTypes, rightTypes;

    if (t.isIdentifier(left)) {
      leftTypes = customTypeAnnotation(left);
    } else if (t.isIdentifier(right)) {
      rightTypes = customTypeAnnotation(right);
    }

    // Early exit
    if (t.isAnyTypeAnnotation(leftTypes) || t.isAnyTypeAnnotation(rightTypes)) {
      return false;
    }

    leftTypes = [].concat(leftTypes, left.getTypeAnnotation());
    rightTypes = [].concat(rightTypes, right.getTypeAnnotation());

    leftTypes = t.createUnionTypeAnnotation(leftTypes);
    rightTypes = t.createUnionTypeAnnotation(rightTypes);

    if (
      !t.isAnyTypeAnnotation(leftTypes) &&
      t.isFlowBaseAnnotation(leftTypes)
    ) {
      return leftTypes.type === rightTypes.type;
    }
  }

  return {
    name: "transform-simplify-comparison-operators",
    visitor: {
      // simplify comparison operations if we're 100% certain
      // that each value will always be of the same type
      BinaryExpression(path) {
        const { node } = path;
        const op = node.operator;
        if (op !== "===" && op !== "!==") {
          return;
        }

        const left = path.get("left");
        const right = path.get("right");

        const strictMatch = baseTypeStrictlyMatches(left, right);
        if (strictMatch) {
          node.operator = node.operator.slice(0, -1);
        }
      }
    }
  };
};
