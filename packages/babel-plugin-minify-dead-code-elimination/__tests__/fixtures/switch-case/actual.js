// basic
switch (0) {
  case 0:
    foo();
    break;
  case 1:
    bar();
    break;
}

// one case is not evaluatable
switch (a) {
  case 1:
    break;
}
switch (100) {
  default:
    foo();
  case a:
    foo();
    break;
}

// impure expressions in cases
function bazz() {
  let i = 0;
  let bar = () => console.log("foo");
  switch (1) {
    case ++i:
      foo();
      break;
    case bar():
      baz();
  }
}

// no break
switch (1) {
  case 1:
    foo();
  case 2:
    bar();
  case 3:
    baz();
    break;
  case 4:
    foobarbaz();
}

// handle defaults
switch (10) {
  default:
    foo();
    break;
  case 1:
    bar();
    break;
  case 2:
    baz();
}
switch (5) {
  case 1:
    baz();
    break;
  case 2:
    bar();
    break;
  default:
    foo();
}

// break statements within blocks
switch (1) {
  case 1:
    foo();
    if (true) break;
  case 2:
    bar();
}
switch (1) {
  case 1:
    for (var i in x) {
      break;
    }
  case 2:
    while (true) {
      break;
    }
  case 3:
    foo();
}

// bail out when break label is above the switch’s scope
x: switch (1) {
  case 1:
    break x;
}
y: switch (0) {
  case 0:
    while (true) {
      break y;
    }
}
z: switch (2) {
  case 2: {
    break z;
  }
}

// DO NOT bail out when break label is inside the switch’s scope
switch (1) {
  case 1:
    bar1: while (true) {
      break bar1;
    }
}

// nested switch statements
switch (1) {
  case 1:
    foo();
    switch (2) {
      case 2:
        bar();
        break;
    }
    break;
  case 2:
    baz();
}

// break correctly when there is a repeated break statement
switch (0) {
  case 0:
    foo();
    break;
    bar();
    break;
}

// break correctly for the correct break statement
switch (0) {
  case 0:
    foo();
    {
      if (true) break;
      bar();
      if (a) break;
    }
  case 1:
    baz();
}

// bail out for `break` statements inside a non-pure conditional
switch (0) {
  case 0:
    foo();
    if (a) break;
  case 1:
    bar();
}

// DO NOT bail out for `break` statements inside a non-pure conditional inside a loop
switch (0) {
  case 0:
    foo();
    while (1) {
      if (x) break;
    }
  case 1:
    bar();
}
