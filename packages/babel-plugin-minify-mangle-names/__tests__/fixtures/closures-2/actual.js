function foo() {
  function bar(baz) {
    return function() {
      bam();
    };
  }
  function bam() {}
}
