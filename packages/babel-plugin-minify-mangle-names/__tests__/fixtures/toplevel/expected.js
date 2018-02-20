function a() {
  if (b === "production") {
    c.call();
  }
}

const b = "production";

var c = function e() {
  new d({
    [b]: "foo",
    a: a(c)
  });
};

class d {}

a();