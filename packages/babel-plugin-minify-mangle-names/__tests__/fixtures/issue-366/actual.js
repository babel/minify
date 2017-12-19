function myEval(code, _var_) {
  eval(code);
}
myEval("console.log(_var_)", "myValue");
