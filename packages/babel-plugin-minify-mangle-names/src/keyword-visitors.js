/**
 * For charset considerations
 *
 * @param cb callback to be called with keyword strings
 */
module.exports = cb => ({
  VariableDeclaration({ node }) {
    // let, var, const
    cb(node.kind);
  },
  ImportDeclaration({ node }) {
    cb("import");
    if (node.specifiers.length > 0) cb("from");
  },
  ImportSpecifier({ node }) {
    // import {a as b} from "a";
    if (node.local.name !== node.imported.name) cb("as");
  },
  ExportNamedDeclaration() {
    cb("export");
  },
  ExportDefaultDeclaration() {
    cb("export default");
  },
  ExportSpecifier({ node }) {
    if (node.local.name !== node.imported.name) cb("as");
  },
  "FunctionDeclaration|FunctionExpression"({ node }) {
    cb("function");
    if (node.async) cb("async");
  },
  Class({ node }) {
    cb("class");
    if (node.superClass) cb("extends");
  },
  "ClassMethod|ObjectMethod"({ node }) {
    // get and set
    if (node.kind) cb(node.kind);
  },
  UnaryExpression({ node }) {
    // typeof, void, delete
    cb(node.operator);
  },
  NewExpression() {
    cb("new");
  },
  ThisExpression() {
    cb("this");
  },
  Super() {
    cb("super");
  },
  YieldExpression() {
    cb("yield");
  },
  AwaitExpression() {
    cb("await");
  },
  TryStatement({ node }) {
    cb("try");
    if (node.handler) cb("catch");
    if (node.finalizer) cb("finally");
  },
  ThrowStatement() {
    cb("throw");
  },
  ForInStatement() {
    cb("for in");
  },
  ForOfStatement() {
    cb("for of");
  },
  While(path) {
    cb("while");
    if (path.isDoWhileStatement()) cb("do");
  },
  BreakStatement() {
    cb("break");
  },
  ContinueStatement() {
    cb("continue");
  },
  ReturnStatement() {
    cb("return");
  },
  BinaryExpression({ node }) {
    if (node.operator === "instanceof") cb("instanceof");
  },
  IfStatement({ node }) {
    cb("if");
    if (node.alternate) cb("else");
  },
  SwitchStatement() {
    cb("switch");
  },
  SwitchCase({ node }) {
    if (node.test) cb("case");
    else cb("default");
  }
});
