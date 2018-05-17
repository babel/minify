// FIXME: for some reason, the inner `if` statement gets indented 4 spaces.
function foo() {
  if (a) {
      if (b()) return false;
  } else if (c()) return true;
}
