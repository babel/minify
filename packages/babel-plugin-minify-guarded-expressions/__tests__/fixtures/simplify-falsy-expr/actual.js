alert(0 && new Foo());
if (0 && something()) for (;;);
alert(false && new Foo());
alert(undefined && new Foo());
alert(null && new Foo());
alert("" && new Foo());
alert(new Foo() || false);
