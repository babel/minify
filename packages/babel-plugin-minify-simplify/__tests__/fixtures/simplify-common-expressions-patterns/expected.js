function f1() {
  return !(a != b) || x;
}
function f2() {
  return a != b && x;
}
function f3() {
  return !!(a < b) || x;
}
function f4() {
  return !(a < b) && x;
}
function f5() {
  return !!c || x;
}
function f6() {
  return !c && x;
}
function f7() {
  return !c || x;
}
function f8() {
  return !!c && x;
}
function g1() {
  return a != b || x;
}
function g2() {
  return !(a != b) && x;
}
function g3() {
  return !(a < b) || x;
}
function g4() {
  return !!(a < b) && x;
}
function g5() {
  return !c || x;
}
function g6() {
  return !!c && x;
}
function g7() {
  return !!c || x;
}
function g8() {
  return !c && x;
}