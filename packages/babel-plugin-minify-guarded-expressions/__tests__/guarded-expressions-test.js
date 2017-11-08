jest.autoMockOff();

const thePlugin = require("test-transform")(require("../src/index"));

describe("guarded-expressions-plugin", () => {
  thePlugin(
    "should flip logical expressions",
    `
    !x && foo();
  `,
    `
    x || foo();
  `
  );

  thePlugin(
    "should simplify falsy logical expressions",
    `
    alert(0 && new Foo());
    if (0 && something()) for(;;);
    alert(false && new Foo());
    alert(undefined && new Foo());
    alert(null && new Foo());
    alert("" && new Foo());
    alert(new Foo() || false);
  `,
    `
    alert(0);
    if (0) for (;;);
    alert(false);
    alert(undefined);
    alert(null);
    alert("");
    alert(new Foo() || false);
  `
  );

  thePlugin(
    "should simplify truthy expressions",
    `
    alert(1 && new Bar());
    alert(true && new Bar());
    alert("hello" && new Bar());
    alert(!false && new Bar());
  `,
    `
    alert(new Bar());
    alert(new Bar());
    alert(new Bar());
    alert(new Bar());
  `
  );

  thePlugin(
    "should not remove reachable impure statements",
    `
    a && void alert('Side effect');
    alert(func() || true);
  `
  );
});
