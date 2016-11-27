"use strict";

const PatternMatch = require("./pattern-match");

module.exports = ({ types: t }) => {
  const flipExpressions = require("babel-helper-flip-expressions")(t);
  const toMultipleSequenceExpressions = require("babel-helper-to-multiple-sequence-expressions")(t);

  const VOID_0 = t.unaryExpression("void", t.numericLiteral(0), true);
  const condExprSeen = Symbol("condExprSeen");
  const seqExprSeen = Symbol("seqExprSeen");
  const shouldRevisit = Symbol("shouldRevisit");

  // Types as symbols for comparisions
  const types = {};
  t.TYPES.forEach((type) => {
    types[type] = Symbol.for(type);
  });
  const isNodeOfType = (node, typeSymbol) => {
    if (typeof typeSymbol !== "symbol") return false;
    return t["is" + Symbol.keyFor(typeSymbol)](node);
  };

  // small abstractions
  const not = (node) => t.unaryExpression("!", node);
  const notnot = (node) => not(not(node));
  const or = (a, b) => t.logicalExpression("||", a, b);
  const and = (a, b) => t.logicalExpression("&&", a, b);

  const operators = new Set([
    "+", "-", "*", "%",
    "<<", ">>", ">>>",
    "&", "|", "^", "/",
    "**"
  ]);

  const updateOperators = new Set([
    "+", "-"
  ]);

  function areArraysEqual(arr1, arr2) {
    return arr1.every((value, index) => {
      return String(value) === String(arr2[index]);
    });
  }

  function getName(node) {
    if (node.type === "ThisExpression") {
      return "this";
    }
    if (node.type === "Super") {
      return "super";
    }
    if (node.type === "NullLiteral") {
      return "null";
    }
    // augment identifiers so that they don't match
    // string/number literals
    // but still match against each other
    return node.name
      ? node.name + "_"
      : node.value /* Literal */;
  }

  function getPropNames(path) {
    if (!path.isMemberExpression()) {
      return;
    }

    let obj = path.get("object");

    const prop = path.get("property");
    const propNames = [getName(prop.node)];

    while (obj.type === "MemberExpression") {
      const node = obj.get("property").node;
      if (node) {
        propNames.push(getName(node));
      }
      obj = obj.get("object");
    }
    propNames.push(getName(obj.node));

    return propNames;
  }
  const OP_AND = (input) => input === "&&";
  const OP_OR = (input) => input === "||";

  return {
    name: "minify-simplify",
    visitor: {
      Statement: {
        exit(path) {
          if (path.node[shouldRevisit]) {
            delete path.node[shouldRevisit];
            path.visit();
          }
        },
      },

      // CallExpression(path) {
        // const { node } = path;

        /* (function() {})() -> !function() {}()
        There is a bug in babel in printing this. Disabling for now.
        if (t.isFunctionExpression(node.callee) &&
            (t.isExpressionStatement(parent) ||
             (t.isSequenceExpression(parent) && parent.expressions[0] === node))
        ) {
          path.replaceWith(
            t.callExpression(
              t.unaryExpression("!", node.callee, true),
              node.arguments
            )
          );
          return;
        }*/
      // },

      UnaryExpression: {
        enter: [

          // Demorgans.
          function(path) {
            const { node } = path;

            if (node.operator !== "!" || flipExpressions.hasSeen(node)) {
              return;
            }

            const expr = node.argument;

            // We need to make sure that the return type will always be boolean.
            if (!(t.isLogicalExpression(expr) || t.isConditionalExpression(expr) || t.isBinaryExpression(expr))) {
              return;
            }
            if (t.isBinaryExpression(expr) && t.COMPARISON_BINARY_OPERATORS.indexOf(expr.operator) === -1) {
              return;
            }

            if (flipExpressions.shouldFlip(expr, 1)) {
              const newNode = flipExpressions.flip(expr);
              path.replaceWith(newNode);
            }
          },

          // !(a, b, c) -> a, b, !c
          function(path) {
            const { node } = path;

            if (node.operator !== "!") {
              return;
            }

            if (!t.isSequenceExpression(node.argument)) {
              return;
            }

            const seq = node.argument.expressions;
            const expr = seq[seq.length - 1];
            seq[seq.length - 1] = t.unaryExpression("!", expr, true);
            path.replaceWith(node.argument);
          },

          // !(a ? b : c) -> a ? !b : !c
          function(path) {
            const { node } = path;

            if (node.operator !== "!") {
              return;
            }

            if (!t.isConditional(node.argument)) {
              return;
            }

            const cond = node.argument;
            cond.alternate = t.unaryExpression("!", cond.alternate, true);
            cond.consequent = t.unaryExpression("!", cond.consequent, true);
            path.replaceWith(node.argument);
          },
        ],
      },

      LogicalExpression: {
        exit(path) {
          // cache of path.evaluate()
          const evaluateMemo = new Map;

          const TRUTHY = (input) => {
            // !NaN and !undefined are truthy
            // separate check here as they are considered impure by babel
            if (input.isUnaryExpression() && input.get("argument").isIdentifier()) {
              if (input.node.argument.name === "NaN" || input.node.argument.name === "undefined") {
                return true;
              }
            }
            const evalResult = input.evaluate();
            evaluateMemo.set(input, evalResult);
            return evalResult.confident && input.isPure() && evalResult.value;
          };

          const FALSY = (input) => {
            // NaN and undefined are falsy
            // separate check here as they are considered impure by babel
            if (input.isIdentifier()) {
              if (input.node.name === "NaN" || input.node.name === "undefined") {
                return true;
              }
            }
            const evalResult = input.evaluate();
            evaluateMemo.set(input, evalResult);
            return evalResult.confident && input.isPure() && !evalResult.value;
          };

          const {
            Expression: EX
          } = types;

          // Convention:
          // [left, operator, right, handler(leftNode, rightNode)]
          const matcher = new PatternMatch([
            [TRUTHY, OP_AND, EX, (l, r) => r],
            [FALSY, OP_AND, EX, (l) => l],
            [TRUTHY, OP_OR, EX, (l) => l],
            [FALSY, OP_OR, EX, (l, r) => r]
          ]);

          const left = path.get("left");
          const right = path.get("right");
          const operator = path.node.operator;

          const result = matcher.match(
            [left, operator, right],
            isPatternMatchesPath
          );

          if (result.match) {
            // here we are sure that left.evaluate is always confident becuase
            // it satisfied one of TRUTHY/FALSY paths
            let value;
            if (evaluateMemo.has(left)) {
              value = evaluateMemo.get(left).value;
            } else {
              value = left.evaluate().value;
            }
            path.replaceWith(result.value(t.valueToNode(value), right.node));
          }
        }
      },

      AssignmentExpression(path) {

        const rightExpr = path.get("right");
        const leftExpr = path.get("left");

        const canBeUpdateExpression = (
          rightExpr.get("right").isNumericLiteral() &&
          rightExpr.get("right").node.value === 1 &&
          updateOperators.has(rightExpr.node.operator));

        if (leftExpr.isMemberExpression()) {

          const leftPropNames = getPropNames(leftExpr);
          const rightPropNames = getPropNames(rightExpr.get("left"));

          if (!leftPropNames ||
              leftPropNames.indexOf(undefined) > -1 ||
              !rightPropNames ||
              rightPropNames.indexOf(undefined) > -1 ||
              !operators.has(rightExpr.node.operator) ||
              !areArraysEqual(leftPropNames, rightPropNames)) {
            return;
          }
        }
        else {
          if (!rightExpr.isBinaryExpression() ||
              !operators.has(rightExpr.node.operator) ||
              leftExpr.node.name !== rightExpr.node.left.name) {
            return;
          }
        }

        let newExpression;

        // special case x=x+1 --> ++x
        if (canBeUpdateExpression) {
          newExpression = t.updateExpression(
            rightExpr.node.operator + rightExpr.node.operator,
            t.clone(leftExpr.node),
            true /* prefix */);
        }
        else {
          newExpression = t.assignmentExpression(
            rightExpr.node.operator + "=",
            t.clone(leftExpr.node),
            t.clone(rightExpr.node.right));
        }

        path.replaceWith(newExpression);
      },

      ConditionalExpression: {
        enter: [
          // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
          // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
          function flipIfOrConditional(path) {
            const { node } = path;
            if (!path.get("test").isLogicalExpression()) {
              flipNegation(node);
              return;
            }

            if (flipExpressions.shouldFlip(node.test)) {
              node.test = flipExpressions.flip(node.test);
              [node.alternate, node.consequent] = [node.consequent, node.alternate];
            }
          },

          function simplifyPatterns(path) {
            const test = path.get("test");
            const consequent = path.get("consequent");
            const alternate = path.get("alternate");

            const {
              Expression: EX,
              LogicalExpression: LE
            } = types;

            // Convention:
            // ===============
            // for each pattern [test, consequent, alternate, handler(expr, cons, alt)]
            const matcher = new PatternMatch([
              [LE, true, false, (e) => e],
              [EX, true, false, (e) => notnot(e)],

              [EX, false, true, (e) => not(e)],

              [LE, true, EX, (e, c, a) => or(e, a)],
              [EX, true, EX, (e, c, a) => or(notnot(e), a)],

              [EX, false, EX, (e, c, a) => and(not(e), a)],

              [EX, EX, true, (e, c) => or(not(e), c)],

              [LE, EX, false, (e, c) => and(e, c)],
              [EX, EX, false, (e, c) => and(notnot(e), c)]
            ]);

            let result = matcher.match(
              [test, consequent, alternate],
              isPatternMatchesPath
            );

            if (result.match) {
              path.replaceWith(result.value(test.node, consequent.node, alternate.node));
            }
          }
        ],

        exit: [
          // a ? x = foo : b ? x = bar : x = baz;
          // x = a ? foo : b ? bar : baz;
          function(topPath) {
            if (!topPath.parentPath.isExpressionStatement() &&
                !topPath.parentPath.isSequenceExpression()
            ) {
              return;
            }

            let mutations = [];
            let firstLeft = null;
            let operator = null;
            function visit(path) {
              if (path.isConditionalExpression()) {
                let bail = visit(path.get("consequent"));
                if (bail) {
                  return true;
                }
                bail = visit(path.get("alternate"));
                return bail;
              }

              if (operator == null) {
                operator = path.node.operator;
              } else if (path.node.operator !== operator) {
                return true;
              }

              if (!path.isAssignmentExpression() ||
                  !(path.get("left").isIdentifier() || path.get("left").isMemberExpression())
              ) {
                return true;
              }

              const left = path.get("left").node;
              if (firstLeft == null) {
                firstLeft = left;
              } else if (!t.isNodesEquivalent(left, firstLeft)) {
                return true;
              }

              mutations.push(
                () => path.replaceWith(path.get("right").node)
              );
            }

            let bail = visit(topPath);
            if (bail) {
              return;
            }

            mutations.forEach((f) => f());
            topPath.replaceWith(
              t.assignmentExpression(
                operator,
                firstLeft,
                topPath.node
              )
            );
          },

          // bar ? void 0 : void 0
          // (bar, void 0)
          // TODO: turn this into general equiv check
          function (path) {
            const { node } = path;
            if (isVoid0(node.consequent) && isVoid0(node.alternate)) {
              path.replaceWith(t.sequenceExpression([path.node.test, VOID_0]));
            }
          },

          // bar ? void 0 : foo ? void 0 : <etc>
          // bar || foo : void 0
          // TODO: turn this into general equiv check
          function (path) {
            const { node } = path;

            if (node[condExprSeen] || !isVoid0(node.consequent)) {
              return;
            }

            node[condExprSeen] = true;

            const tests = [node.test];
            const mutations = [];
            let alt;
            for (let next = path.get("alternate"); next.isConditionalExpression(); next = next.get("alternate")) {
              next.node[condExprSeen] = true;
              alt = next.node.alternate;

              if (isVoid0(next.node.consequent)) {
                tests.push(next.node.test);
                mutations.push(() => next.remove());
              } else {
                alt = next.node;
                break;
              }
            }

            if (tests.length === 1) {
              return;
            }

            const test = tests.reduce((expr, curTest) => t.logicalExpression(
              "||",
              expr,
              curTest
            ));

            path.replaceWith(t.conditionalExpression(test, VOID_0, alt));
          },
        ],
      },

      // concat
      VariableDeclaration: {
        enter: [
          // Put vars with no init at the top.
          function (path) {
            const { node } = path;

            if (node.declarations.length < 2) {
              return;
            }

            let inits = [];
            let empty = [];
            for (let decl of node.declarations) {
              if (!decl.init) {
                empty.push(decl);
              } else {
                inits.push(decl);
              }
            }

            // This is based on exprimintation but there is a significant
            // imrpovement when we place empty vars at the top in smaller
            // files. Whereas it hurts in larger files.
            if (this.fitsInSlidingWindow) {
              node.declarations = empty.concat(inits);
            } else {
              node.declarations = inits.concat(empty);
            }
          },
        ],
      },

      Function: {
        exit(path) {
          earlyReturnTransform(path);

          if (!path.node[shouldRevisit]) {
            return;
          }

          delete path.node[shouldRevisit];
          path.visit();
        },
      },

      For: {
        enter: earlyContinueTransform,
        exit: earlyContinueTransform,
      },

      ForStatement: {

        // Merge previous expressions in the init part of the for.
        enter(path) {
          const { node } = path;
          if (!path.inList || (node.init && !t.isExpression(node.init))) {
            return;
          }

          const prev = path.getSibling(path.key - 1);
          let consumed = false;
          if (prev.isVariableDeclaration()) {
            let referencedOutsideLoop = false;

            // we don't care if vars are referenced outside the loop as they are fn scope
            if (prev.node.kind === "let" || prev.node.kind === "const") {
              const ids = Object.keys(prev.getBindingIdentifiers());

              idloop: for (let i = 0; i < ids.length; i++) {
                const refs = prev.scope.bindings[ids[i]].referencePaths;
                for (let j = 0; j < refs.length; j++) {
                  if (!isAncestor(path, refs[j])) {
                    referencedOutsideLoop = true;
                    break idloop;
                  }
                }
              }
            }

            if (!node.init && !referencedOutsideLoop) {
              node.init = prev.node;
              consumed = true;
            }
          } else if (prev.isExpressionStatement()) {
            const expr = prev.node.expression;
            if (node.init) {
              if (t.isSequenceExpression(expr)) {
                expr.expressions.push(node.init);
                node.init = expr;
              } else {
                node.init = t.sequenceExpression([expr, node.init]);
              }
            } else {
              node.init = expr;
            }
            consumed = true;
          }
          if (consumed) {
            prev.remove();
          }
        },

        exit(path) {
          const { node } = path;
          if (!node.test) {
            return;
          }

          if (!path.get("body").isBlockStatement()) {
            const bodyNode = path.get("body").node;
            if (!t.isIfStatement(bodyNode)) {
              return;
            }

            if (t.isBreakStatement(bodyNode.consequent, { label: null })) {
              node.test = t.logicalExpression("&&", node.test, t.unaryExpression("!", bodyNode.test, true));
              node.body = bodyNode.alternate || t.emptyStatement();
              return;
            }

            if (t.isBreakStatement(bodyNode.alternate, { label: null })) {
              node.test = t.logicalExpression("&&", node.test, bodyNode.test);
              node.body = bodyNode.consequent || t.emptyStatement();
              return;
            }

            return;
          }

          const statements = node.body.body;
          const exprs = [];
          let ifStatement = null;
          let breakAt = null;
          let i = 0;
          for (let statement; statement = statements[i]; i++) {
            if (t.isIfStatement(statement)) {
              if (t.isBreakStatement(statement.consequent, { label: null })) {
                ifStatement = statement;
                breakAt = "consequent";
              } else if (t.isBreakStatement(statement.alternate, { label: null })) {
                ifStatement = statement;
                breakAt = "alternate";
              }
              break;
            }

            // A statement appears before the break statement then bail.
            if (!t.isExpressionStatement(statement)) {
              return;
            }

            exprs.push(statement.expression);
          }

          if (!ifStatement) {
            return;
          }

          let rest = [];

          if (breakAt = "consequent") {
            if (t.isBlockStatement(ifStatement.alternate)) {
              rest.push(...ifStatement.alternate.body);
            } else if (ifStatement.alternate) {
              rest.push(ifStatement.alternate);
            }
          } else {
            if (t.isBlockStatement(ifStatement.consequent)) {
              rest.push(...ifStatement.consequent.body);
            } else if (ifStatement.consequent) {
              rest.push(ifStatement.consequent);
            }
          }

          rest.push(...statements.slice(i + 1));

          const test = breakAt === "consequent" ? t.unaryExpression("!", ifStatement.test, true) : ifStatement.test;
          let expr;
          if (exprs.length === 1) {
            expr = t.sequenceExpression([exprs[0], test]);
          } else if (exprs.length) {
            exprs.push(test);
            expr = t.sequenceExpression(exprs);
          } else {
            expr = test;
          }

          node.test = t.logicalExpression("&&", node.test, expr);
          if (rest.length === 1) {
            node.body = rest[0];
          } else if (rest.length) {
            node.body = t.blockStatement(rest);
          } else {
            node.body = t.emptyStatement();
          }
        },
      },

      Program(path) {
        // An approximation of the resultant gzipped code after minification
        this.fitsInSlidingWindow = (path.getSource().length / 10) < 33000;

        const { node } = path;
        const statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length) {
          return;
        }
        node.body = statements;
      },

      BlockStatement: {
        enter(path) {
          const { node, parent } = path;

          const top = [];
          const bottom = [];

          for (let i = 0; i < node.body.length; i++) {
            const bodyNode = node.body[i];
            if (t.isFunctionDeclaration(bodyNode)) {
              top.push(bodyNode);
            } else {
              bottom.push(bodyNode);
            }
          }

          const statements = top.concat(toMultipleSequenceExpressions(bottom));

          if (!statements.length) {
            return;
          }

          if (statements.length > 1 || needsBlock(node, parent) || node.directives) {
            node.body = statements;
            return;
          }

          if (statements.length) {
            path.replaceWith(statements[0]);
            return;
          }
        },

        exit(path) {
          const { node, parent } = path;

          if (needsBlock(node, parent)) {
            return;
          }

          if (node.body.length === 1) {
            path.get("body")[0].inList = false;
            path.replaceWith(node.body[0]);
            return;
          }

          if (node.body.length === 0) {
            path.replaceWith(t.emptyStatement());
            return;
          }

          // Check if oppurtinties to merge statements are available.
          const statements = node.body;
          if (!statements.length) {
            return;
          }

          for (let statement of statements) {
            if (!t.isExpressionStatement(statement)) {
              return;
            }
          }

          path.visit();
        },
      },

      ThrowStatement: createPrevExpressionEater("throw"),

      // Try to merge previous statements into a sequence
      ReturnStatement: {
        enter: [
          createPrevExpressionEater("return"),

          // Remove return if last statement with no argument.
          // Replace return with `void` argument with argument.
          function(path) {
            const { node } = path;

            if (!path.parentPath.parentPath.isFunction() ||
                path.getSibling(path.key + 1).node
            ) {
              return;
            }

            if (!node.argument)  {
              path.remove();
              return;
            }

            if (t.isUnaryExpression(node.argument, { operator: "void" })) {
              path.replaceWith(node.argument.argument);
            }
          },
        ],
      },

      // turn blocked ifs into single statements
      IfStatement: {
        exit: [
          // Merge nested if statements if possible
          function ({ node }) {
            if (!t.isIfStatement(node.consequent)) {
              return;
            }

            if (node.alternate || node.consequent.alternate) {
              return;
            }

            node.test = t.logicalExpression("&&", node.test, node.consequent.test);
            node.consequent = node.consequent.consequent;
          },

          function(path) {
            const { node } = path;

            // No alternate, make into a guarded expression
            if (node.consequent && !node.alternate &&
                node.consequent.type === "ExpressionStatement"
            ) {
              let op = "&&";
              if (t.isUnaryExpression(node.test, { operator: "!" })) {
                node.test = node.test.argument;
                op = "||";
              }

              path.replaceWith(
                t.expressionStatement(
                  t.logicalExpression(op, node.test, node.consequent.expression)
                )
              );
              return;
            }

            // Easy, both are expressions, turn into ternary
            if (t.isExpressionStatement(node.consequent) &&
                t.isExpressionStatement(node.alternate)
            ) {
              path.replaceWith(
                t.conditionalExpression(
                  node.test, node.consequent.expression, node.alternate.expression
                )
              );
              return;
            }

            // Easy: consequent and alternate are return -- conditional.
            if (t.isReturnStatement(node.consequent)
              && t.isReturnStatement(node.alternate)
            ) {
              if (!node.consequent.argument && !node.alternate.argument) {
                path.replaceWith(t.expressionStatement(node.test));
                return;
              }

              path.replaceWith(
                t.returnStatement(
                  t.conditionalExpression(
                    node.test,
                    node.consequent.argument || VOID_0,
                    node.alternate.argument || VOID_0
                  )
                )
              );
              return;
            }

            // There is nothing after this block. And one or both
            // of the consequent and alternate are either expression statment
            // or return statements.
            if (!path.getSibling(path.key + 1).node && path.parentPath &&
                path.parentPath.parentPath && path.parentPath.parentPath.isFunction()
            ) {
              // Only the consequent is a return, void the alternate.
              if (t.isReturnStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
                if (!node.consequent.argument) {
                  path.replaceWith(t.expressionStatement(
                    t.logicalExpression(
                      "||",
                      node.test,
                      node.alternate.expression
                    )
                  ));
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument || VOID_0,
                      t.unaryExpression("void", node.alternate.expression, true)
                    )
                  )
                );
                return;
              }

              // Only the alternate is a return, void the consequent.
              if (t.isReturnStatement(node.alternate) && t.isExpressionStatement(node.consequent)) {
                if (!node.alternate.argument) {
                  path.replaceWith(t.expressionStatement(
                    t.logicalExpression(
                      "&&",
                      node.test,
                      node.consequent.expression
                    )
                  ));
                  return;
                }

                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      t.unaryExpression("void", node.consequent.expression, true),
                      node.alternate.argument || VOID_0
                    )
                  )
                );
                return;
              }

              if (t.isReturnStatement(node.consequent) && !node.alternate) {
                if (!node.consequent.argument) {
                  path.replaceWith(t.expressionStatement(node.test));
                  return;
                }

                // This would only be worth it if the previous statement was an if
                // because then we may merge to create a conditional.
                if (path.getSibling(path.key - 1).isIfStatement()) {
                  path.replaceWith(
                    t.returnStatement(
                      t.conditionalExpression(
                        node.test,
                        node.consequent.argument || VOID_0,
                        VOID_0
                      )
                    )
                  );
                  return;
                }

              }

              if (t.isReturnStatement(node.alternate) && !node.consequent) {
                if (!node.alternate.argument) {
                  path.replaceWith(t.expressionStatement(node.test));
                  return;
                }

                // Same as above.
                if (path.getSibling(path.key - 1).isIfStatement()) {
                  path.replaceWith(
                    t.returnStatement(
                      t.conditionalExpression(
                        node.test,
                        node.alternate.argument || VOID_0,
                        VOID_0
                      )
                    )
                  );
                  return;
                }
              }
            }

            let next = path.getSibling(path.key + 1);

            // If the next satatement(s) is an if statement and we can simplify that
            // to potentailly be an expression (or a return) then this will make it
            // easier merge.
            if (next.isIfStatement()) {
              next.pushContext(path.context);
              next.visit();
              next.popContext();
              next = path.getSibling(path.key + 1);
            }

            // Some other visitor might have deleted our node. OUR NODE ;_;
            if (!path.node) {
              return;
            }

            // No alternate but the next statement is a return
            // also turn into a return conditional
            if (t.isReturnStatement(node.consequent) &&
              !node.alternate && next.isReturnStatement()
            ) {
              const nextArg = next.node.argument || VOID_0;
              next.remove();
              path.replaceWith(
                t.returnStatement(
                  t.conditionalExpression(
                    node.test, node.consequent.argument || VOID_0, nextArg
                  )
                )
              );
              return;
            }

            // Next is the last expression, turn into a return while void'ing the exprs
            if (path.parentPath && path.parentPath.parentPath &&
                path.parentPath.parentPath.isFunction() && !path.getSibling(path.key + 2).node &&
                t.isReturnStatement(node.consequent) && !node.alternate && next.isExpressionStatement()
            ) {
              const nextExpr = next.node.expression;
              next.remove();
              if (node.consequent.argument) {
                path.replaceWith(
                  t.returnStatement(
                    t.conditionalExpression(
                      node.test,
                      node.consequent.argument,
                      t.unaryExpression("void", nextExpr, true)
                    )
                  )
                );
                return;
              }

              path.replaceWith(
                t.logicalExpression("||", node.test, nextExpr)
              );
              return;
            }

            if (node.consequent && node.alternate &&
              (t.isReturnStatement(node.consequent) || (
                t.isBlockStatement(node.consequent)
                  && t.isReturnStatement(
                    node.consequent.body[node.consequent.body.length - 1]
                  )
              ))
            ) {
              path.insertAfter(
                t.isBlockStatement(node.alternate)
                  ? node.alternate.body
                  : node.alternate
              );
              node.alternate = null;
              return;
            }
          },

          // If the consequent is if and the altenrate is not then
          // switch them out. That way we know we don't have to print
          // a block.x
          function(path) {
            const { node } = path;

            if (!node.alternate) {
              return;
            }

            if (!t.isIfStatement(node.consequent)) {
              return;
            }

            if (t.isIfStatement(node.alternate)) {
              return;
            }

            node.test = t.unaryExpression("!", node.test, true);
            [node.alternate, node.consequent] = [node.consequent, node.alternate];
          },

          // Make if statements with conditional returns in the body into
          // an if statement that guards the rest of the block.
          function(path) {
            const { node } = path;

            if (!path.inList || !path.get("consequent").isBlockStatement() ||
                node.alternate
            ) {
              return;
            }

            let ret;
            let test;
            const exprs = [];
            const statements = node.consequent.body;

            for (let i = 0, statement; statement = statements[i]; i++) {
              if (t.isExpressionStatement(statement)) {
                exprs.push(statement.expression);
              } else if (t.isIfStatement(statement)) {
                if (i < statements.length - 1) {
                  // This isn't the last statement. Bail.
                  return;
                }
                if (statement.alternate) {
                  return;
                }
                if (!t.isReturnStatement(statement.consequent)) {
                  return;
                }
                ret = statement.consequent;
                test = statement.test;
              } else {
                return;
              }
            }

            if (!test || !ret) {
              return;
            }

            exprs.push(test);

            const expr = exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);

            let replacement = t.logicalExpression("&&", node.test, expr);

            path.replaceWith(t.ifStatement(
              replacement,
              ret,
              null
            ));
          },

          createPrevExpressionEater("if"),
        ],
      },

      WhileStatement(path) {
        const { node } = path;
        path.replaceWith(t.forStatement(null, node.test, null, node.body));
      },

      ForInStatement:createPrevExpressionEater("for-in"),

      // Flatten sequence expressions.
      SequenceExpression: {
        exit(path) {
          if (path.node[seqExprSeen]) {
            return;
          }

          function flatten(node) {
            node[seqExprSeen] = true;
            let ret = [];
            for (let n of node.expressions) {
              if (t.isSequenceExpression(n)) {
                ret.push(...flatten(n));
              } else {
                ret.push(n);
              }
            }
            return ret;
          }

          path.node.expressions = flatten(path.node);
        },
      },

      SwitchCase(path) {
        const { node } = path;

        if (!node.consequent.length) {
          return;
        }

        node.consequent = toMultipleSequenceExpressions(node.consequent);
      },

      SwitchStatement: {
        exit: [

          // Convert switch statements with all returns in their cases
          // to return conditional.
          function(path) {
            const { node } = path;

            // Need to be careful of side-effects.
            if (!t.isIdentifier(node.discriminant)) {
              return;
            }

            if (!node.cases.length) {
              return;
            }

            const consTestPairs = [];
            let fallThru = [];
            let defaultRet;
            for (let switchCase of node.cases) {
              if (switchCase.consequent.length > 1) {
                return;
              }

              const cons = switchCase.consequent[0];

              if (!switchCase.test) {
                if (!t.isReturnStatement(cons)) {
                  return;
                }
                defaultRet = cons;
                continue;
              }

              if (!switchCase.consequent.length) {
                if (fallThru.length) {
                  fallThru.push(switchCase.test);
                } else {
                  fallThru = [switchCase.test];
                }
                continue;
              }

              // TODO: can we void it?
              if (!t.isReturnStatement(cons)) {
                return;
              }

              let test = t.binaryExpression("===", node.discriminant, switchCase.test);
              if (fallThru.length) {
                test = fallThru.reduceRight(
                  (right, test) => t.logicalExpression(
                    "||",
                    t.binaryExpression("===", node.discriminant, test),
                    right
                  ),
                  test
                );
                fallThru = [];
              }

              consTestPairs.push([test, cons.argument || VOID_0]);
            }

            // Bail if we have any remaining fallthrough
            if (fallThru.length) {
              return;
            }

            // We need the default to be there to make sure there is an oppurtinity
            // not to return.
            if (!defaultRet) {
              if (path.inList) {
                const nextPath = path.getSibling(path.key + 1);
                if (nextPath.isReturnStatement()) {
                  defaultRet = nextPath.node;
                  nextPath.remove();
                } else if (!nextPath.node && path.parentPath.parentPath.isFunction()) {
                  // If this is the last statement in a function we just fake a void return.
                  defaultRet = t.returnStatement(VOID_0);
                } else {
                  return;
                }
              } else {
                return;
              }
            }

            const cond = consTestPairs.reduceRight(
              (alt, [test, cons]) => t.conditionalExpression(test, cons, alt),
              defaultRet.argument || VOID_0
            );

            path.replaceWith(t.returnStatement(cond));

            // Maybe now we can merge with some previous switch statement.
            if (path.inList) {
              const prev = path.getSibling(path.key - 1);
              if (prev.isSwitchStatement()) {
                prev.visit();
              }
            }
          },

          // Convert switches into conditionals.
          function(path) {
            const { node } = path;

            // Need to be careful of side-effects.
            if (!t.isIdentifier(node.discriminant)) {
              return;
            }

            if (!node.cases.length) {
              return;
            }

            const exprTestPairs = [];
            let fallThru = [];
            let defaultExpr;
            for (let switchCase of node.cases) {
              if (!switchCase.test) {
                if (switchCase.consequent.length !== 1) {
                  return;
                }
                if (!t.isExpressionStatement(switchCase.consequent[0])) {
                  return;
                }
                defaultExpr = switchCase.consequent[0].expression;
                continue;
              }

              if (!switchCase.consequent.length) {
                if (fallThru.length) {
                  fallThru.push(switchCase.test);
                } else {
                  fallThru = [switchCase.test];
                }
                continue;
              }

              const [cons, breakStatement] = switchCase.consequent;
              if (switchCase === node.cases[node.cases.length - 1]) {
                if (breakStatement && !t.isBreakStatement(breakStatement)) {
                  return;
                }
              } else if (!t.isBreakStatement(breakStatement)) {
                return;
              }

              if (!t.isExpressionStatement(cons) || switchCase.consequent.length > 2) {
                return;
              }

              let test = t.binaryExpression("===", node.discriminant, switchCase.test);
              if (fallThru.length) {
                test = fallThru.reduceRight(
                  (right, test) => t.logicalExpression(
                    "||",
                    t.binaryExpression("===", node.discriminant, test),
                    right
                  ),
                  test
                );
                fallThru = [];
              }

              exprTestPairs.push([test, cons.expression]);
            }

            if (fallThru.length) {
              return;
            }

            const cond = exprTestPairs.reduceRight(
              (alt, [test, cons]) => t.conditionalExpression(test, cons, alt),
              defaultExpr || VOID_0
            );

            path.replaceWith(cond);
          },

          function(path) {
            const { node } = path;

            if (!node.cases.length) {
              return;
            }

            const lastCase = path.get("cases")[node.cases.length - 1];
            if (!lastCase.node.consequent.length) {
              return;
            }

            const potentialBreak = lastCase.get("consequent")[lastCase.node.consequent.length - 1];
            if (t.isBreakStatement(potentialBreak) && potentialBreak.node.label === null) {
              potentialBreak.remove();
            }
          },

          createPrevExpressionEater("switch"),
        ],
      },
    },
  };

  function flipNegation(node) {
    if (!node.consequent || !node.alternate) {
      return;
    }

    let test = node.test;
    let flip = false;

    if (t.isBinaryExpression(test)) {
      if (test.operator === "!==") {
        test.operator = "===";
        flip = true;
      }

      if (test.operator === "!=") {
        test.operator = "==";
        flip = true;
      }
    }

    if (t.isUnaryExpression(test, { operator: "!" })) {
      node.test = test.argument;
      flip = true;
    }

    if (flip) {
      let consequent = node.consequent;
      node.consequent = node.alternate;
      node.alternate = consequent;
    }
  }

  function needsBlock(node, parent) {
    return (t.isFunction(parent) && node === parent.body) ||
           t.isTryStatement(parent) || t.isCatchClause(parent) ||
           t.isSwitchStatement(parent) ||
           (isSingleBlockScopeDeclaration(node) && t.isIfStatement(parent));
  }

  function isSingleBlockScopeDeclaration(block) {
    return t.isBlockStatement(block) &&
      block.body.length === 1 &&
      (
        t.isVariableDeclaration(block.body[0], { kind: "let" }) ||
        t.isVariableDeclaration(block.body[0], { kind: "const" }) ||
        t.isFunctionDeclaration(block.body[0])
      );
  }

  function isVoid0(expr) {
    return expr === VOID_0 || (
      t.isUnaryExpression(expr, { operator: "void" })  &&
      t.isNumericLiteral(expr.argument, { value: 0 })
    );
  }

  function earlyReturnTransform(path) {
    const { node } = path;

    if (!t.isBlockStatement(node.body)) {
      return;
    }

    for (let i = node.body.body.length; i >= 0; i--) {
      const statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate &&
          t.isReturnStatement(statement.consequent) && !statement.consequent.argument
      ) {
        genericEarlyExitTransform(path.get("body").get("body")[i]);
      }
    }
  }

  function earlyContinueTransform(path) {
    const { node } = path;

    if (!t.isBlockStatement(node.body)) {
      return;
    }

    for (let i = node.body.body.length; i >= 0; i--) {
      const statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate &&
          t.isContinueStatement(statement.consequent) && !statement.consequent.label
      ) {
        genericEarlyExitTransform(path.get("body").get("body")[i]);
      }
    }

    // We may have reduced the body to a single statement.
    if (node.body.body.length === 1) {
      path.get("body").replaceWith(node.body.body[0]);
    }
  }

  function genericEarlyExitTransform(path) {
    const { node } = path;

    const statements = path.container.slice(path.key + 1)
      .filter((stmt) => !t.isFunctionDeclaration(stmt));

    if (!statements.length) {
      path.replaceWith(t.expressionStatement(node.test));
      return;
    }

    const test = node.test;
    if (t.isBinaryExpression(test) && test.operator === "!==") {
      test.operator = "===";
    } else if (t.isBinaryExpression(test) && test.operator === "!=") {
      test.operator = "==";
    } else if (t.isUnaryExpression(test, { operator: "!" })) {
      node.test = test.argument;
    } else {
      node.test = t.unaryExpression("!", node.test, true);
    }

    let l = statements.length;
    while (l-- > 0) {
      if (!t.isFunctionDeclaration(statements[l])) {
        path.getSibling(path.key + 1).remove();
      }
    }

    node.consequent = t.blockStatement(statements);

    // this should take care of removing the block
    path.visit();
  }

  function createPrevExpressionEater(keyword) {
    let key;
    switch (keyword) {
    case "switch": key = "discriminant"; break;
    case "throw":
    case "return": key = "argument"; break;
    case "if": key = "test"; break;
    case "for-in": key = "right"; break;
    }

    return function(path) {
      if (!path.inList) {
        return;
      }

      const { node } = path;
      const prev = path.getSibling(path.key - 1);
      if (!prev.isExpressionStatement()) {
        return;
      }

      let seq = prev.node.expression;
      if (node[key]) {
        if (t.isSequenceExpression(seq)) {
          seq.expressions.push(node[key]);
        } else {
          seq = t.sequenceExpression([seq, node[key]]);
        }
      } else {
        if (t.isSequenceExpression(seq)) {
          const lastExpr = seq.expressions[seq.expressions.length - 1];
          seq.expressions[seq.expressions.length - 1] = t.unaryExpression("void", lastExpr, true);
        } else {
          seq = t.unaryExpression("void", seq, true);
        }
      }

      if (seq) {
        node[key] = seq;
        prev.remove();

        // Since we were able to merge some stuff it's possible that this has opened
        // oppurtinties for other transforms to happen.
        // TODO: Look into changing the traversal order from bottom to up to avoid
        // having to revisit things.
        if (path.parentPath.parent) {
          path.parentPath.parent[shouldRevisit] = true;
        }
      }
    };
  }

  function isPatternMatchesPath(patternValue, inputPath) {
    if (Array.isArray(patternValue)) {
      for (let i = 0; i < patternValue.length; i++) {
        if (isPatternMatchesPath(patternValue[i], inputPath)) {
          return true;
        }
      }
      return false;
    }
    if (typeof patternValue === "function") {
      return patternValue(inputPath);
    }
    if (isNodeOfType(inputPath.node, patternValue)) return true;
    let evalResult = inputPath.evaluate();
    if (!evalResult.confident || !inputPath.isPure()) return false;
    return evalResult.value === patternValue;
  }

  // path1 -> path2
  // is path1 an ancestor of path2
  function isAncestor(path1, path2) {
    return !!path2.findParent((parent) => parent === path1);
  }
};
