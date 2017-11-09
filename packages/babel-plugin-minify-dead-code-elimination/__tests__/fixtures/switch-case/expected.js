// basic
foo();

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
foo();

bar();

baz();

// handle defaults
foo();

foo();

// break statements within blocks
foo();
var i;

for (var i in x) {
  break;
}

while (true) {
  break;
}

foo();

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
  case 2:
    {
      break z;
    }
}

// DO NOT bail out when break label is inside the switch’s scope
bar1: while (true) {
  break bar1;
}

// nested switch statements
foo();

bar();

// break correctly when there is a repeated break statement
foo();

// break correctly for the correct break statement
foo();

// bail out for `break` statements inside a non-pure conditional
switch (0) {
  case 0:
    foo();
    if (a) break;
  case 1:
    bar();
}

// DO NOT bail out for `break` statements inside a non-pure conditional inside a loop
foo();
while (1) {
  if (x) break;
}

bar();