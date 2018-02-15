function f1() { return a == b ? true : x; }
function f2() { return a == b ? false : x; }
function f3() { return a < b ? !0 : x; }
function f4() { return a < b ? !1 : x; }
function f5() { return c ? !0 : x; }
function f6() { return c ? false : x; }
function f7() { return !c ? true : x; }
function f8() { return !c ? !1 : x; }
function g1() { return a == b ? x : true; }
function g2() { return a == b ? x : false; }
function g3() { return a < b ? x : !0; }
function g4() { return a < b ? x : !1; }
function g5() { return c ? x : true; }
function g6() { return c ? x : !1; }
function g7() { return !c ? x : !0; }
function g8() { return !c ? x : false; }